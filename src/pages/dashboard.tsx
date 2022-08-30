import {Header} from '../components/Header'
import { Sidebar } from '../components/Sidebar';
import { Flex, SimpleGrid , Box, Text} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Chart from 'react-apexcharts';

const chart = dynamic(() => import('react-apexcharts'), {
  ssr: false, //O react-apexcharts não será carregado do lado do servidor, será carregado do lado do cliente/browser
})

const options = {
  chart: {
    toolbar: {
      show: false, //desativamos o menu do gráfico
    },
    zoom: {
      enabled: false, //desativou o zoom do gráfico
    },
    foreColor:  theme.colors.gray[500], //cor das letras ao redor do gráfico

  },
  grid: {
    show: false,
  },
  dataLabels: {
    
  }

};
const series = [
  { name: 'series1', data: [32,120,10, 28, 51, 18, 109]}

];

export default function Dashboard() {
  return(
    <Flex direction="column" h="100vh">
        <Header />
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <SimpleGrid //usado para reponsivar
            flex="1"
            gap="4"
            minChildWidth="320px" //Todo filho terá no mínimo 320px de largura 
            align="flex-start"
          >
            <Box
              p="8"
              bg="gray.800"
              borderRadius={8}
            >
              <Text
                fontSize="lg" mb="4"
              >Inscritos da semana</Text>
            <Chart 
              options={options} //recebe os valores da const options
              series={series} //recebe os valores/dados da const series
              type="area"//tipo de grafíco
              height={160}
            />
            </Box>
            <Box
              p="8"
              bg="gray.800"
              borderRadius={8}
            >
              <Text
                fontSize="lg" mb="4"
              >Taxa de abertura</Text>
            </Box>

          </SimpleGrid>
        </Flex>
    </Flex>
  )
}