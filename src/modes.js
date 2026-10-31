import { createContext, useContext } from 'react'

// Lets any screen ask "is this Access Mode on?" without passing props everywhere.
export const ModesContext = createContext([])

export function useMode(id) {
  return useContext(ModesContext).includes(id)
}
