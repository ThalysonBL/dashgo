/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, ReactNode, useContext, useEffect } from 'react'
import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react'
import { useRouter } from "next/router"

interface SidebarDrawerProviderProps {
  children: ReactNode;
}
type SidebarDrawerContextData = UseDisclosureReturn; //tipos de dados que o SidebarDraweContextData retorna

const SidebarDrawerContext = createContext( {} as SidebarDrawerContextData);


export function SidebarDrawerProvider( {children}: SidebarDrawerProviderProps){
  const disclosure = useDisclosure()
  const router = useRouter()

  useEffect(() => {
    disclosure.onClose() //toda troca a side bar será fechado
  }, [router.asPath])
  return(
    <SidebarDrawerContext.Provider value={disclosure} //passamos todas as props de useDisclosure no provider
    
    >
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext) //usamos o useContext passando o SidebarDrawerContext
//envolve toda a nossa aplicação no arquivo _app