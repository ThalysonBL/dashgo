import React from "react";
import { useSidebarDrawer} from '../../contexts/SidebarDrawerContext';
import {
  Box,
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";

import { SidebarNav } from "./SideBarNav";

export function Sidebar() {
  const {isOpen, onClose} = useSidebarDrawer()

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })
  if (isDrawerSidebar) {
    return (
      <Drawer //é um elemento
        isOpen={isOpen}
        placement="left" //lado que estará o elemento
        onClose={onClose} //ao fechar executará a função retoranndo nada
      >
        <DrawerOverlay //componente que deixará a tela mais escura
        >
          <DrawerContent //onde ficará o conteúdo
            bg="gray.800"
            p="4"
          >
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegação</DrawerHeader>
            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
            
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }
  return (
    <Box as="aside" w="64" mr="8">
      <SidebarNav />
    </Box>
  );
}
