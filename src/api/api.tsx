import axios from 'axios';

const API_KEY = `QOh1JgclF3loE8oGdBmbFGHQf267mZ6n5wzWJ00T`;

const API_URL = 'https://api.nasa.gov/neo/rest/v1';

const api = axios.create({
  baseURL: API_URL,
});

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getDataNeo = async (day: number) => {
  const today = new Date();
  const startDate = formatDate(new Date(today.getFullYear(), today.getMonth(), day));
  const endDate = formatDate(new Date(today.getFullYear(), today.getMonth(), day));

  try {
    const response = await api.get('/feed', {
      params: {
        start_date: startDate,
        end_date: endDate,
        api_key: API_KEY,
      },
    });

    const maxDiameters: number[] = [];
    let hazardous = 0;
    const closest: number[] = [];
    const velocity: number[] = [];

    response.data.near_earth_objects[startDate].map((el) => {
      maxDiameters.push(el.estimated_diameter.kilometers.estimated_diameter_max);
      closest.push(+el.close_approach_data[0].miss_distance.kilometers);
      velocity.push(+el.close_approach_data[0].relative_velocity.miles_per_hour);
      if (el.is_potentially_hazardous_asteroid) {
        hazardous++;
      }
    });

    return {
      maxDiameter: +Math.max(...maxDiameters).toFixed(4),
      hazardous: hazardous,
      closest: +Math.min(...closest).toFixed(4),
      velocity: +Math.max(...velocity).toFixed(4),
    };

    // return response.data.near_earth_objects[startDate];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
