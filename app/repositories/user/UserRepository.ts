import Repository from '../Repository';
const source = '/user';
export default {
  getProfile(params: any) {
    return Repository.get(`${source}/profile`, {
      params: params,
    });
  },
};
