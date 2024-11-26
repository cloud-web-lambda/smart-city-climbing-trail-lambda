import { googleMapsApiClient } from '@/utils/apiClient';

/**
 * Get coordinates (latitude, longitude) by trail name
 * @param trailName - Name of the trail
 * @returns Latitude and Longitude of the trail
 */
export const getCoordinatesByTrailName = async (trailName: string): Promise<{ lat: number; lng: number }> => {
  try {
    const response = await googleMapsApiClient.get('/place/textsearch/json', {
      params: {
        query: trailName,
        fields: 'geometry',
      },
    });

    if (!response.data.results || response.data.results.length === 0) {
      throw new Error(`No results found for trail name: ${trailName}`);
    }

    const { lat, lng } = response.data.results[0].geometry.location;
    return { lat, lng };
  } catch (error) {
    console.error(`Error fetching coordinates for trail name "${trailName}":`, error);
    throw new Error('Failed to fetch coordinates. Please try again later.');
  }
};
