export const getCurrentLocation = (): Promise<{
  lat: number;
  long: number;
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error("Geolocation is not supported by this browser."));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      (error) => {
        let message = "An unknown error occurred.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message =
              "User denied the request for Geolocation. Please enable location services in your browser settings.";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            message = "The request to get user location timed out.";
            break;
        }
        reject(new Error(message));
      },
    );
  });
};
