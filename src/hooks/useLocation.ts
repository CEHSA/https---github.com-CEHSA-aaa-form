import { useState, useEffect } from 'react';

interface Location {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address: string;
  error?: string;
}

export const useLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);

  const getAddressFromCoordinates = async (latitude: number, longitude: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Address not found';
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        coordinates: { latitude: 0, longitude: 0 },
        address: '',
        error: 'Geolocation is not supported by your browser'
      });
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const address = await getAddressFromCoordinates(latitude, longitude);
        
        setLocation({
          coordinates: { latitude, longitude },
          address
        });
        setLoading(false);
      },
      (error) => {
        setLocation({
          coordinates: { latitude: 0, longitude: 0 },
          address: '',
          error: error.message
        });
        setLoading(false);
      }
    );
  }, []);

  return { location, loading };
};
