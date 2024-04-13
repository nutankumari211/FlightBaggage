import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/baggage', 
});
export const addBags = async (bagIds) => {
    try {
      const response = await api.post('/add', { bagIds: bagIds.join('\n') });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
export const getBagStatistics = async () => {
  return await api.get('/stats');
};
