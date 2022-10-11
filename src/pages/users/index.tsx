import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Text,
  useBreakpointValue,
  Spinner,
  HStack,
  Link
} from "@chakra-ui/react";
import { Header } from "../../components/Header/";
import { Sidebar } from "../../components/Sidebar";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Pagination } from "../../components/Pagination";
import { useEffect, useState } from 'react';
import { getUsers, useUsers } from "../../services/hooks/userUsers";
import NextLink from 'next/link';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api'

export default function UserList({ users}) {
  const [currentPage, setPage] = useState(1);


  const { data, isLoading, isFetching, error, refetch } = useUsers(currentPage, {initialData: data});//use users página atual page

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  }); 
  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`) //dentro de [] defino o que quero carregar depois defino a rota

      return response.data;
    }, 
    {
      staleTime: 1000 * 60 *10, //a cada 10 min os resultados ficaram "frescos"
    }
    )
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <Box>
              <HStack spacing="7">
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  onClick={() => refetch()}
                >
                  Atualizar
                </Button>
                <NextLink href="/users/create" passHref>
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="pink"
                    leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                  >
                    Criar novo
                  </Button>
                </NextLink>
              </HStack>
            </Box>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                {data.users.map((user) => {
                    return (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="purple" />
                        </Td>
                        <Td>
                          <Box>
                            <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                            <Text fontWeight="bold">{user.name}</Text>

                            </Link>
                            <Text fontSize="sm" color="gray.300">
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.created_at}</Td>}
                        <Td></Td>
                      </Tr>
                    );
                  })}
                  
                </Tbody>
              </Table>
              <Pagination  
                totalCountOfRegisters={data?.totalCount}
                currentPage={currentPage}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}



export const getServerSideProps: GetServerSideProps = async () => {
  const {users, totalCount} = await  getUsers(1)
  return {
    props: {
      users, 
    }
  }
}