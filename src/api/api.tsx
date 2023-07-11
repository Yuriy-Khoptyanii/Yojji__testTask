import axios from 'axios';

const API_KEY = `QOh1JgclF3loE8oGdBmbFGHQf267mZ6n5wzWJ00T`;

const API_URL = 'https://api.nasa.gov/neo/rest/v1';

const api = axios.create({
  baseURL: API_URL,
});

export const getDataNeo = async () => {
  try {
    const response = await api.get('/feed', {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.near_earth_objects;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
