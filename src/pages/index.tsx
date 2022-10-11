import { Flex, Button, Stack } from "@chakra-ui/react";
//stack utilizado para dar espaçamento entre todos os itens utilizando a propriedade spacing
import * as yup from "yup"; //importei todos os métodos para a variavel yup
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, formState } from "react-hook-form";
import { Input } from "../components/Form/Input";
import { parseCookies } from "nookies";

type SignInFormData = {
  email: string;
  password: string;
};
//todo schema de yup é um objeto
const signInFormSchema = yup.object().shape({
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  password: yup.string().required("Senha obrigatória"),
});

export default function SignIn() {
  const { register, handleSubmit, formState, errrors } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    //SubmitHandler é recebido e dentro recebe o event
    await new Promise((resolve) => setTimeOut(resolve, 2000)); //
    console.log(values);
  };
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p={["6", "8"]}
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)} //handleSubmit é o pai e terá todos os dados guardados.
      >
        <Stack spacing="4">
          <Input
            name="email"
            type="email"
            label="E-mail"
            {...register}
            error={formState.errors.email}
          />

          <Input
            name="password"
            type="password"
            label="Senha"
            {...register}
            error={formState.errors.password}
          />

          <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            isLoading={formState.isSubmitting} //devemos tornar a função assíncrona
          >
            Entrar
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
}
