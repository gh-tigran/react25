import axios from 'axios';

const api = axios.create({
  baseURL: 'https://disease.sh/v3/covid-19/',
})

class CovidApi {
  static async getCountries() {
    const {data} = await api.get('/countries');
    return data;
  }
}

export default CovidApi;