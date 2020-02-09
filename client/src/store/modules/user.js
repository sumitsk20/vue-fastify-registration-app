import axios from 'axios';

export default {
  state: {
    ip: '',
    captchaToken: '',
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
            console.log(data);
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
            if (status === 201 || status === 201)
              resolve(true);
          })
          .catch(error => {
            reject(error.response.data);
          });
      });
    }
  }
};
