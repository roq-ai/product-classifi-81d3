import axios from 'axios';
import queryString from 'query-string';
import { ClassificationInterface, ClassificationGetQueryInterface } from 'interfaces/classification';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getClassifications = async (
  query?: ClassificationGetQueryInterface,
): Promise<PaginatedInterface<ClassificationInterface>> => {
  const response = await axios.get('/api/classifications', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createClassification = async (classification: ClassificationInterface) => {
  const response = await axios.post('/api/classifications', classification);
  return response.data;
};

export const updateClassificationById = async (id: string, classification: ClassificationInterface) => {
  const response = await axios.put(`/api/classifications/${id}`, classification);
  return response.data;
};

export const getClassificationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/classifications/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteClassificationById = async (id: string) => {
  const response = await axios.delete(`/api/classifications/${id}`);
  return response.data;
};
