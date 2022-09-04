import Link, { LinkProps } from 'next/link';
import { cloneElement, ReactElement } from 'react';
import { useRouter } from 'next/router';

interface ActiveLinkProps extends LinkProps  {
  children: ReactElement // só pode ser elemento do React
  shouldMatchExactHref?: boolean; //encontrar na barra de pesquisa a palavra exata do href (endereço exato)
}

export function ActiveLink(
    {children, shouldMatchExactHref = false, ...rest}: ActiveLinkProps) {
  const {asPath} = useRouter(); //retorna a rota ativa asPath
  let isActive = false;

  if(shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }
  if(!shouldMatchExactHref && 
    (asPath.startsWith(String(rest.href)) ||  //startsWith signifca começar ou se tiver
    //se na barra de pesquisa começar com o link ficará ativo
    asPath.startsWith(String(rest.as))// se na barra de pesquisa começar com o link ficará ativo
    
  )) {
    isActive = true;

  }

  return(
    <Link {...rest}>
      {cloneElement(children, { //Clonamos o elemento que tem dentro do link e podemos modificar
        color:  isActive ? 'pink.400' : 'gray.50'
      }) 
      }

    </Link>
  ) 
}