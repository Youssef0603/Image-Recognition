import Repository from '../Repository';
const source = '/notifications';
export default {
  list(params: any) {
    return Repository.get(`${source}/list`, {
      params: params,
    });
  },

  storeFcmToken(data: any) {
    if (data.unauthorized) {
      return Repository.post(`${source}/fcm/store-token/unauthenticated`, data);
    }
    return Repository.post(`${source}/fcm/store-token`, data);
  },
};
