import axios from 'axios';

export default {
  state: {
    ip: '',
    requestCount: '0'
  },
  getters: {
    getUserIp: state => state.ip
  },
  mutations: {},
  actions: {
    COUNTREQUEST: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios
          .post('validate-request', payload)
          .then(({ data, status }) => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    LOGIN: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios
          .post('auth/login', payload)
          .then(({ data, status }) => {
            if (status === 200)
              resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    REGISTER: ({ commit }, { userData, userRequestData, strategy }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('auth/register', {
            userData,
            userRequestData,
            strategy
          })
          .then(({ data, status }) => {
            resolve({ data, status });
          })
          .catch(error => {
            reject(error.response.data);
          });
      });
    }
  }
};
