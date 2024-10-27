import axios from "axios";

const instance = axios.create({
    baseURL:'http://127.0.0.1:5001/e-clone-12d2b/us-central1/api'//API (cloud function) url
});

export default instance;
// 'https://api-x4qoffh3oq-uc.a.run.app'