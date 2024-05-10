import {
  LoginRequestInterface,
  RegisterRequestInterface,
} from '../../interfaces/http/request';

import Repository from '../Repository';

const source = '/auth';

const register = async (body: RegisterRequestInterface): Promise<any> => {
  const response = await Repository.post(`${source}/register`, body);
  return response;
};

const login = async (body: LoginRequestInterface): Promise<any> => {
  const response = await Repository.post(`${source}/login`, body);
  return response;
};

const logout = async (data: any): Promise<any> => {
  const response = await Repository.post(`${source}/logout`, data);
  return response;
};

export default {register, login, logout};
