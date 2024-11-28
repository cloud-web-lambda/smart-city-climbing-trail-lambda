import axios, { type AxiosError, isAxiosError as isAxiosAppError } from 'axios';
import env from '@/config';

export const dataPortalApiClient = axios.create({
  baseURL: env.DATA_PORTAL_API_URL,
});

dataPortalApiClient.interceptors.request.use((config) => {
  config.params.serviceKey = decodeURIComponent(env.DATA_PORTAL_API_KEY);
  return config;
});

export const dataPortalCsvApiClient = axios.create({
  baseURL: env.DATA_PORTAL_API_CSV_URL,
});

dataPortalCsvApiClient.interceptors.request.use((config) => {
  config.params.serviceKey = decodeURIComponent(env.DATA_PORTAL_API_KEY);
  return config;
});

export const vworldApiClient = axios.create({
  baseURL: env.VWORLD_API_URL,
});

vworldApiClient.interceptors.request.use((config) => {
  config.params.key = env.VWORLD_API_KEY;
  return config;
});

export const googleMapsApiClient = axios.create({
  baseURL: env.GOOGLE_MAPS_API_URL,
});

googleMapsApiClient.interceptors.request.use((config) => {
  config.params.key = env.GOOGLE_MAPS_API_KEY;
  return config;
});

// TODO: REMOVE
export const testApiClient = axios.create({
  baseURL: env.TEST_API_URL,
});

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  return isAxiosAppError<T>(error);
};
