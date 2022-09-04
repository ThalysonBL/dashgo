import { Flex, useBreakpointValue, IconButton, Icon } from "@chakra-ui/react";
import {useSidebarDrawer} from '../../contexts/SidebarDrawerContext'

import { RiMenuLine } from 'react-icons/ri'

import { SearchBox } from './SearchBox';
import { NotificationsNav } from './NotificationsNav';
import { Logo } from './Logo';
import { Profile } from './Profile';

export function Header() {

  const { onOpen} = useSidebarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false, //quando estiver em base (mobile) ocultará
    lg: true, // quando estiver em lg ficará visivel
  },)
  
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      { !isWideVersion && (
        <IconButton 
          aria-label="Open navigation" //prop de acessibilidade
          icon={<Icon as={RiMenuLine}/>}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        
        >
          
          </IconButton>

      )}
      <Logo />
      { isWideVersion && <SearchBox />}
      <Flex align="center" ml="auto">
        
        <NotificationsNav />
        <Profile 
          showProfileData={isWideVersion} //propriedade usado para redimensionar hide/show; dentro deste componente estará mais alguns detalhes
        />
      </Flex>
    </Flex>
  );
}
