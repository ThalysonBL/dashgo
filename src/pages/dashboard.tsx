import {Header} from '../components/Header/'
import dynamic from 'next/dynamic';
import { Sidebar } from '../components/Sidebar';
import { Flex, SimpleGrid , Box, Text, theme} from '@chakra-ui/react';

const Chart = dynamic(() => import('react-apexcharts'), {
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
    show: false, //grades do background
  },
  dataLabels: {
    enabled: false, //remove as labels (traço das fontes) 
  },
  stroke: {
    curve: 'smooth', //as curvas do gráfico será leve
  },
  tooltip: {
    enabled: false, //remove as interações ao passar o mouse
  },
  xasxis: {
    type: 'datetine',
    axisBorder: { //borda inferior da tabela
      color: theme.colors.gray[600]
    },
    axisTicket: {
      color: theme.colors.gray[600] //cor dos pontinhos que fica na linha inferior horizontal

    },
    categories: //cada elemento do array é referente a const series
      [
      '2021-03-18T00:00:00.000Z', //deve ser passado data primeiro, segundo tempo/hora e o Z no final (time Zone)
      '2021-03-19T00:00:00.000Z',
      '2021-03-20T00:00:00.000Z',
      '2021-03-21T00:00:00.000Z',
      '2021-03-22T00:00:00.000Z',
      '2021-03-23T00:00:00.000Z',
      '2021-03-24T00:00:00.000Z',

    ],
  
  },

  fill: { //preenchimento de cor do gráfico
    opacity: 0.3,
    type: 'gradient',
    shadde: 'dark',
    opacityFrom: 0.7,
    opacityTo: 0.3


  }


};
const series = [
  { name: 'series1', data: [32,120,10, 28, 51, 18, 109]}

];

export default function Dashboard() {
  return(
    <Flex direction="column" h="100vh">
        <Header />
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="24px">
          <Sidebar />

          <SimpleGrid //usado para reponsivar
            flex="1"
            gap="4"
            minChildWidth="320px" //Todo filho terá no mínimo 320px de largura 
            align="flex-start"
            pb="4"
          >
            <Box
              p="8"
              bg="gray.800"
              borderRadius={8}
              pb="4"

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
              <Chart 
              options={options} //recebe os valores da const options
              series={series} //recebe os valores/dados da const series
              type="area"//tipo de grafíco
              height={160}
            />
            </Box>

          </SimpleGrid>
        </Flex>
    </Flex>
  )
}