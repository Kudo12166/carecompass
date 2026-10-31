// Runs on the SERVER only (never in the browser), so the API key stays secret.
import { AnthropicBedrockMantle } from '@anthropic-ai/bedrock-sdk'

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['documentType', 'summary', 'youOwe', 'insurancePaid', 'dueDate', 'looksWrong', 'problems', 'nextSteps', 'contactScript'],
  properties: {
    documentType: { type: 'string', description: 'e.g. "Medical bill", "Explanation of Benefits (not a bill)", "Insurance denial"' },
    summary: { type: 'string', description: '2-3 sentences: what this is, from whom, for what visit.' },
    youOwe: { type: 'string', description: 'Amount the patient must pay, e.g. "$40.00", or "Nothing" / "Unknown".' },
    insurancePaid: { type: 'string', description: 'Amount insurance paid, or "Unknown".' },
    dueDate: { type: 'string', description: 'Payment due date, or "Not listed".' },
    looksWrong: { type: 'boolean', description: 'True if anything looks like a possible error or worth questioning.' },
    problems: { type: 'array', items: { type: 'string' }, description: 'Possible errors or red flags. Empty if none.' },
    nextSteps: { type: 'array', items: { type: 'string' }, description: '2-4 short, concrete steps, in order.' },
    contactScript: { type: 'string', description: 'Exact words the patient can say or send to the billing office.' },
  },
}

function systemPrompt(modes) {
  const level = modes.includes('simple')
    ? 'Write at a 3rd-grade reading level. Very short sentences. Common words only. No jargon at all.'
    : 'Write at a 6th-grade reading level. Explain any medical or insurance word in plain words.'
  const contact = modes.includes('hearing')
    ? 'The patient is Deaf or hard of hearing: write contactScript as a short written message (email/text/portal), not a phone script, and ask for replies in writing.'
    : 'Write contactScript as a short phone script the patient can read out loud.'
  return [
    'You help disabled patients understand medical bills, Explanations of Benefits (EOBs), and insurance letters.',
    level,
    contact,
    'Be calm and reassuring. Use only information in the document; if something is unreadable or missing, say "Unknown" rather than guessing.',
    'Red flags to check: duplicate charges, charges for services not described, an EOB that is not actually a bill, balance billing after insurance, missing insurance, math that does not add up, very old dates.',
    'If the document is an EOB, say clearly that it is not a bill and they should not pay it.',
    'This is general help, not legal or medical advice.',
  ].join('\n')
}

let client
export async function explainBill({ image, text, modes = [] }) {
  client ??= new AnthropicBedrockMantle({
    awsRegion: process.env.AWS_REGION || 'us-east-1',
    apiKey: process.env.BEDROCK_API_KEY,
  })

  const content = []
  if (image) {
    const [, mediaType, data] = image.match(/^data:(image\/\w+);base64,(.+)$/) ?? []
    if (!data) throw new Error('Image must be a base64 data URL')
    content.push({ type: 'image', source: { type: 'base64', media_type: mediaType, data } })
  }
  if (text) content.push({ type: 'text', text: `Document text:\n${text}` })
  content.push({ type: 'text', text: 'Explain this document for me.' })

  const response = await client.messages.create({
    model: 'anthropic.claude-opus-5-5',
    max_tokens: 16000,
    output_config: { effort: 'low', format: { type: 'json_schema', schema: SCHEMA } },
    system: systemPrompt(modes),
    messages: [{ role: 'user', content }],
  })

  if (response.stop_reason === 'refusal') throw new Error('The AI could not help with this document.')
  const block = response.content.find((b) => b.type === 'text')
  return JSON.parse(block.text)
}
