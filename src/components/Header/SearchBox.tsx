import {Flex, Input, Icon} from '@chakra-ui/react'
import {RiSearchLine} from 'react-icons/ri';
import { useState, useRef } from 'react'


export function SearchBox() {

  //const [search, setSearch ] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null) //useRef é usado para buscar algum termo
  // Usamos HTMLInputElement para definir que é um elemento 
  //console.log(searchInputRef.current.value) //current é VALOR ATUAL
  return(
    <Flex
        as="label"
        flex="1"
        py="4"
        px="8"
        ml="6"
        maxWidth={400}
        alignSelf="center"
        color="gray.200"
        position="relative"
        bg="gray.800"
        borderRadius="full"
      >
        <Input
          color="gray.50"
          variant="unstyled"
          placeholder="Buscar na plataforma"
          _placeholder={{
            color: "gray.400", //estilização aplicará apenas no placeholder
          }}
          px="4"
          mr="4"
         // value={search} //será atualizado pelo setSearch
          //onChange={event => setSearch(event.target.value)} //o que for colocado no input será enviado para value
          ref={searchInputRef} //recebermos a const ref

        />
        <Icon as={RiSearchLine} fontSize="20" />
      </Flex>

  )
}