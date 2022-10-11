import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { useSidebarDrawer } from "../contexts/SidebarDrawerContext";
import { makeServer } from "../services/mirage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from '../services/queryClient';


if (process.env.NODE_ENV === "development") {
  //se estivermos em um ambiente de desemvolvimento executaremos o makeServer()
  makeServer();
}


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client= {queryClient} //deve ter um client (props) definimos na const acima
    >
      <ChakraProvider theme={theme}>
        <useSidebarDrawer>
          <Component {...pageProps} />
        </useSidebarDrawer>
      </ChakraProvider>
      <ReactQueryDevtools //Ajuda a debugar nossa query
      />
    </QueryClientProvider>
  );
}

export default MyApp;
