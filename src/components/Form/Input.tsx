import 
{ FormControl, 
  FormLabel, 
  Input as ChakraInput, 
  InputProps as ChakraInputProps,
  FormErrorMessage
} from '@chakra-ui/react';

import { FieldError } from 'react-hook-form'

import { forwardRef, ForwardRefRenderFunction } from 'react';

interface InputProps extends ChakraInputProps{
  name: string;
  label?: string;
  error?: FieldError;

}
const InputBase: ForwardRefRenderFunction<HTMLInputElemnet, InputProps> 
  = ({name, label, error = null, ...rest}, ref) => { //ref é o 2º parametro

  return (
    <FormControl isInvalid={!!error} //os dois sinais de negação vai receber se é true ou false
    //Utilizado para controlar o espaçamento do Stack, serve como div
        >

          { !!label && <FormLabel htmlFor={name} //utilizado definir qual input será o label
          >
            {label}</FormLabel>}
          <ChakraInput 
            name={name} 
            id={name}
            focusBorderColor="pink.500" //Foco na borda
            bgColor="gray.900" //cor de fundo
            variant="filled" //tipo de linha do input
            _hover={{ //tipo de ação utilizamos '_' e utilizamos chaves para aplicar código Javascript
              bgColor: 'gray.900'
            }}
            size="lg"
            ref={ref} //só receber a ref.
            {...rest}
            />
            {!!error && (
            <FormErrorMessage>
              {error.message}
            </FormErrorMessage>
            )}
            </FormControl>

  );
}

export const Input = forwardRef(InputBase);

//será pego a ref que é passado no login e encaminhado para o InputBase