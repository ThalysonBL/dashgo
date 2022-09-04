import {
  Link,
  Icon,
  Text,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

import {ActiveLink} from "../ActiveLink";
import { ElementType } from "react"; //Faz com que passamos um elemento como componente igual o icon

interface NavLinkProps extends ChakraLinkProps {
  //pegamos todas as propriedades do link
  icon: ElementType;
  children: string; //o children é o texto que vem dentro
  href: string;
}
export function NavLink({ icon, children, href, ...rest }: NavLinkprops) {
  //utilizamos ...rest ('spred') para pegar todas as propriedades do ChakraLinkProps
  return (
    <ActiveLink
      href={href}
      passHref //pega a propriedade href e passa de forma forçada o atributo renderizado dentro do link
    >
      <Link
        display="flex"
        align="center"
        {...rest} // passamos o spred no link para obter todas as props
      >
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </Link>
    </ActiveLink>
  );
}
