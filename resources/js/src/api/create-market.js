import axios from 'axios';

const instance = axios.create({
    baseURL: 'homestead.test',
})

instance.interceptors.request.use(
    async (config) => {
      //Add CSRF code here
    },
    (err) => {
        //Handle response errors here
        return Promise.reject(err);
    }
);

export default instance;