import Geolocation from '@react-native-community/geolocation';
import haversine from 'haversine';
import NotificationService from './NotificationService';

const targetLocation = {
  latitude: 37.7749, // Example latitude
  longitude: -122.4194, // Example longitude
  radius: 0.5, // 500 meters in kilometers
};

class GeolocationService {
  watchId: number | null = null;

  startMonitoring() {
    this.watchId = Geolocation.watchPosition(
      (position) => {
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        const distance = haversine(userLocation, targetLocation, { unit: 'km' });

        if (distance <= targetLocation.radius) {
          NotificationService.sendGeofenceNotification();
        }
      },
      (error) => console.error('Geolocation error:', error),
      { enableHighAccuracy: true, distanceFilter: 10 }
    );
  }

  stopMonitoring() {
    if (this.watchId !== null) {
      Geolocation.clearWatch(this.watchId);
    }
  }
}

export default new GeolocationService(); 