import {useMutation} from 'react-query';

import {RepositoryFactory} from '../../../repositories/RepositoryFactory';

const auth = RepositoryFactory.get('auth');

const useRegister = () => {
  const {mutate, data, error, isLoading} = useMutation({
    mutationFn: async (data: {email: string; password: string}) => {
      return await auth.register({
        email: data.email,
        password: data.password,
      });
    },
  });

  return {mutate, data, error, isLoading};
};

const useLogin = () => {
  const {mutate, data, error, isLoading} = useMutation({
    mutationFn: async (data: {email: string; password: string}) => {
      return await auth.login({
        email: data.email,
        password: data.password,
      });
    },
  });

  return {mutate, data, error, isLoading};
};

const useLogout = () => {
  const {mutate, data, error, isLoading} = useMutation({
    mutationFn: async () => {
      return await auth.logout();
    },
  });

  return {mutate, data, error, isLoading};
};

export {useRegister, useLogin, useLogout};
