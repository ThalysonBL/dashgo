import { useQuery, UseQueryOptions } from "react-query"; //Utilizado para armazenar informações no cache
import { api } from '../api';

type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
}
type GetUsersResponse = {
  totalCount: number;
  users: User[];
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
//  async () => {
    //isFetching é o segund carregando
    //o primeiro para parametro é o nome do cache

    const {data, headers} = await api.get("users", {
      params: {
        page,
      }
    }); //na api utilizamos axios e definimos uma base url
    const totalCount = Number(headers["x-total-count"]); //número total de registros


    const users = data.users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: new Date(user.created_at).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
      };
    });
    return {users,
    totalCount};
  }
//}

export function useUsers(page: number, options: UseQueryOptions) {
  return  useQuery(
   [ "users", page], () => getUsers(page),
    
    {
      //segundo parametro é uma função
      staleTime: 1000 * 6 * 10, //segura quanto tempo para atualizar a tela
      ...options,
    }
  ) as UseQueryResult<GetUsersResponse, unknown>
  //terceiro parametro
}