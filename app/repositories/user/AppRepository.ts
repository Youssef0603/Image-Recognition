import Repository from '../Repository';
const source = '/app';
export default {
  healthCheck() {
    return Repository.get(`${source}/health-check`);
  },
};
