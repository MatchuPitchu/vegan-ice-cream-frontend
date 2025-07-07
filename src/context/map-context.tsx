import {
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

type MapContext = {
  map: any
  setMap: Dispatch<SetStateAction<any>>
}

export const MapContext = createContext({} as MapContext)

// custom hook to check whether you are inside a provider AND it returns context data object
export const useMapContext = () => {
  const context = useContext(MapContext)
  if (!context) throw new Error('useMapContext must be used within MapContextProvider')
  return context
}

export const MapProvider = ({ children }: PropsWithChildren) => {
  const [map, setMap] = useState<any>(null)

  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
