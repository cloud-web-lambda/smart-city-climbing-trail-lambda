import axios from 'axios';

export const getSunTimes = async (lat: number, lng: number) => {
  const response = await axios.get('https://api.sunrise-sunset.org/json', {
    params: { lat, lng, formatted: 0 },
  });

  return response.data.results;
};
