export const generateShutterSpeeds = (
  maxSpeedInSeconds: number,
  minSpeedInSeconds: number
): string[] => {
  // Validate the input to ensure maxSpeed is greater than minSpeed
  if (maxSpeedInSeconds < minSpeedInSeconds) {
    throw new Error("Max speed should be greater than min speed.");
  }

  // Common shutter speeds in seconds
  const shutterSpeeds = [
    4,
    2,
    1,
    1 / 2,
    1 / 4,
    1 / 8,
    1 / 15,
    1 / 30,
    1 / 60,
    1 / 125,
    1 / 250,
    1 / 500,
    1 / 1000,
    1 / 2000,
    1 / 4000,
    1 / 8000,
  ];

  // Filter the shutter speeds between the max and min values
  const validShutterSpeeds = shutterSpeeds.filter(
    (speed) => speed <= maxSpeedInSeconds && speed >= minSpeedInSeconds
  );

  // Convert the speeds to strings for a nicer output
  const formattedSpeeds = validShutterSpeeds.map((speed) => {
    if (speed >= 1) {
      return speed.toString();
    } else {
      return `1/${1 / speed}`;
    }
  });

  return formattedSpeeds;
};

export const generateApertures = (
  maxAperture: number,
  minAperture: number
): string[] => {
  // Validate the input to ensure maxAperture is less than minAperture
  // In aperture terms, a smaller number means a larger aperture, so we flip the comparison
  if (maxAperture > minAperture) {
    throw new Error("Max aperture should be smaller than min aperture.");
  }

  // Common aperture values
  const apertures = [1.0, 1.4, 2.0, 2.8, 4.0, 5.6, 8.0, 11, 16, 22, 32, 45, 64];

  // Filter the apertures between the max and min values
  const validApertures = apertures.filter(
    (aperture) => aperture >= maxAperture && aperture <= minAperture
  );

  return validApertures.map((aperture) => `f/${aperture}`);
};
