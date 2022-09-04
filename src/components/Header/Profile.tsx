import { Flex, Box, Text, Avatar } from '@chakra-ui/react'

interface ProfileProps { //pegamos o showProfileData que foi definido no elemento pai, definimos como boolean
  showProfileData?: boolean;
}

export function Profile({showProfileData = true}: ProfileProps) { //showProfileData terá o estado inicial como true;devemos passar no return alguns detalhes
  return(
    <Flex align="center">
            {showProfileData && ( // se exibir showProfileData exibirá também o seguinte código 
              <Box mr="4">
              <Text>Thalyson</Text>
              <Text color="gray.300" fontSize="small">
                thalyson@gmail.com
              </Text>
            </Box>
            )}
            <Avatar size="md" src="https://github.com/thalysonbl.png" />
          </Flex>

  )
}