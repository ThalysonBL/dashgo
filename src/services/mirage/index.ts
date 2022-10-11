import { createServer, Model, Factory, Response, ActiveModelSerializer } from 'miragejs'
import {faker} from '@faker-js/faker'
type User = {
  name: string;
  email: string;
  created_at: string;

}

export function makeServer() {


  const server = createServer({ //servidor
    serializers: {
      application: ActiveModelSerializer,

    },

    models: { //models é o que armazena
      user: Model.extend<Partial<User>>({ //Partial significa que alguns campos não serã tipados

      })
    },

    factories: { //Factories gera dados em massa
      user: Factory.extend({  //user é o model
        name(i) {
          return `User ${i + 1}` //i indice // 
        }, //informe os dados como método
        email() {
          return faker.internet.email().toLowerCase();//gera emails fakes
        },
      created_at() {
        return faker.date.recent(10, new Date) //gera datas recentes de 10 dias

      },
      })

    },

    seeds(server) {//serve para iniciar com dados ficticios ao iniciar

      server.createList('user', 200) //iniciamos a nossa api com o usercom 200 cadastros fakes

    },
    routes() { //rotas
      this.namespace = 'api'; //todas as rotas precisarão colocar api
      this.timing = 750; //todas as chamadas ficará em 750 milissegundos
      this.get('/users', function (schema, request) { // Esse formato cria automaticamente uma estrutura para o model user
        const { page = 1, per_page = 10} = request.queryParams

        const total  = schema.all('user').length

        const pageStart = (Number(page) - 1) * Number(per_page); // (Number(page) - 1) vai começar da página um exibindo o registro zero
        const pageEnd = pageStart + Number(per_page); // registro final

        const users = this.serialize(schema.all('user'))
        .users.slice(pageStart, pageEnd); //na schema vamos mostrar pageStart(inicio) e pageEnd(final)
      
        return new Response( //response é a resposta da rota
          200, //padrão
          {'x-total-count': String(total)},// padrão, retornando total
          {users} //padrão. Retorna os usuários
        )
      }); 
      this.get('/users/:id'); // listar usuário pelo id
      this.post('/users'); //
 
      this.namespace = ''; //assim que fizer a consulta a rota receberá o namespace como vazio.
      this.passthrough() // passthrough faz com que todas as chamadas retornem para o local 'original' (mesmo acontecendo erros na aplicação)

    }
  })
  
  return server;
}