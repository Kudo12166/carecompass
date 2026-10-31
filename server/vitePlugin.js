// Adds the /api/explain-bill endpoint to the Vite dev server.
import { explainBill } from './explainBill.js'

export default function apiPlugin(env) {
  return {
    name: 'carecompass-api',
    configureServer(server) {
      // Make the .env secrets available to the server code.
      process.env.BEDROCK_API_KEY ??= env.BEDROCK_API_KEY
      process.env.AWS_REGION ??= env.AWS_REGION

      server.middlewares.use(async (req, res, next) => {
        if (req.method !== 'POST' || !req.url.endsWith('/api/explain-bill')) return next()
        res.setHeader('Content-Type', 'application/json')
        try {
          let body = ''
          for await (const chunk of req) body += chunk
          res.end(JSON.stringify(await explainBill(JSON.parse(body))))
        } catch (err) {
          console.error('explain-bill failed:', err)
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'Sorry, we could not read that. Please try again.' }))
        }
      })
    },
  }
}
