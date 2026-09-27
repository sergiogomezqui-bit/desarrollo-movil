import { createContext, useContext } from 'react'
import useNetwork from '../hooks/useNetwork.js'

const NetworkContext = createContext(true)

export function NetworkProvider({ children }) {
  const online = useNetwork()
  return <NetworkContext.Provider value={online}>{children}</NetworkContext.Provider>
}

export function useOnline() {
  return useContext(NetworkContext)
}
