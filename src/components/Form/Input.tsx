import 
{ FormControl, 
  FormLabel, 
  Input as ChakraInput, 
  InputProps as ChakraInputProps
} from '@chakra-ui/react';


interface InputProps extends ChakraInputProps{
  name: string;
  label: string;

}
export function Input({name, label, ...rest}): InputProps {

  return (
    <FormControl //Utilizado para controlar o espaçamento do Stack, serve como div
        >

          { !!label && <FormLabel HtmlFor={name} //utilizado definir qual input será o label
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
            {...rest}
            />
            </FormControl>

  );
}