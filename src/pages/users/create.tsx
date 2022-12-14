import {
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
  Button,
} from "@chakra-ui/react";

import Link  from "next/link";
import { useMutation } from 'react-query'; //lida com transferrencia de dados na rota diminuindo quantas quantidade de POST


import * as yup from 'yup';//importei todos os métodos para a variavel yup
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm, SubmitHandler, formState} from 'react-hook-form';

import { Header } from "../../components/Header/";
import { Sidebar } from "../../components/Sidebar";
import { Input } from './../../components/Form/Input';
import { queryClient } from '../../services/queryClient';
import { useRouter } from 'next/router'

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;


}
//todo schema de yup é um objeto
const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password') //o campo deve ser nulo ou igual password
  ], 'As Senhas precisam ser iguais')


})

export default function CreateUser() {
  const router = useRouter();
  const createUser = useMutation(async (user: createUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user, //dados antigos ddos usuários
        created_at:new Date(),
      }
    })
    return response.data.user;
  }, {
    onSuccess: () => {//se der sucesso o cadatro vamos zerar o cache
      queryClient.invalidteQueries('users')
    }
  });


  const { register,handleSubmit, formState, errors} = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
 await createUser.mutateAsync(values);
 router.push('/users')
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box as="form" flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input name="name" label="Nome completo" 
                {...register}
                error={formState.errors.name}
              />
              <Input name="email" type="email" label="E-mail" 
                {...register}
                error={formState.errors.email}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input name="password" type="password" label="Senha"
                {...register}
                error={formState.errors.password}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirmação da senha"
                {...register}
                error={formState.errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button type="submit" colorScheme="pink"
              isLoading={formState.isSubmitting}
              >Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
