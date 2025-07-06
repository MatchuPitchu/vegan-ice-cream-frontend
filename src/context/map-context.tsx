import { useState, createContext, useContext, type Dispatch, type SetStateAction, type ReactNode } from 'react';

interface MapContextInterface {
  map: any;
  setMap: Dispatch<SetStateAction<any>>;
}

export const MapContext = createContext({} as MapContextInterface);

// custom hook to check whether you are inside a provider AND it returns context data object
export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) throw new Error('useMapContext must be used within MapContextProvider');
  return context;
};

type MapProviderProps = {
  children: ReactNode;
};

export const MapProvider = ({ children }: MapProviderProps) => {
  const [map, setMap] = useState<any>(null);

  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
