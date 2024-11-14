import axios, { AxiosInstance, AxiosResponse } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://localhost:7147/api', 
  timeout: 10000, 
  withCredentials: true, 
});

export interface Item {
  id?: number;
  name: string;
  email: string;
  telefone: string;
  data_cadastro?: Date;
}

export const getData = async (): Promise<Item[]> => {
  try {
    const response: AxiosResponse<Item[]> = await api.get('/Cliente');
    return response.data; 
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
};

export const createClient = async (data: { name: string }): Promise<Item> => {
  try {
    const response: AxiosResponse<Item> = await api.post('/Cliente', data);
   
    return response.data; 
  } catch (error) {
    console.error('Erro ao criar item:', error);
    throw error;
  }
};

export const updateClient = async (
  id: number,
  data: Item
): Promise<Item> => {
  try {
    const response: AxiosResponse<Item> = await api.put(`/Cliente/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Resposta da API:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    throw error;
  }
};

export const deleteClient = async (id: number): Promise<void> => {
  try {
    await api.delete(`/Cliente/${id}`);
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    throw error;
  }
};

export const getClientById = async (id: number): Promise<Item> => {
  try {
    const response: AxiosResponse<Item> = await api.get(`/Cliente/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    throw error;
  }
};
