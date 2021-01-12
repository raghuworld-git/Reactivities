import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody)
};

const activityEP = "/activities/";

const Activites = {
    list: (): Promise<IActivity[]> => requests.get(activityEP),
    details: (id: string) => requests.get(`${activityEP}${id}`),
    create: (activity: IActivity) => requests.post(activityEP, activity),
    update: (activity: IActivity) => requests.put(activityEP, activity),
    delete: (id: string) => requests.del(`${activityEP}${id}`)
}

export default {
    Activites
}

