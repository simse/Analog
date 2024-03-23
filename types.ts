export interface CameraType {
  id: string;
  dataSource: "user" | "system";
  make: string;
  model: string;
  type: "SLR";
  filmFormat: "35mm";
  mount: string;
  disposable: boolean;
  halfFrame: boolean;
  releaseDate: string;
  minShutterSpeed: number;
  maxShutterSpeed: number;
  image?: string;
}

export interface Camera {
  id: string;
  nickname?: string;
  displayName: string;
  cameraType: string;
}

export interface LensType {
  id: string;
  dataSource: "user" | "system";
  make: string;
  model: string;
  type: "prime" | "zoom";
  releaseDate: string;
  minFocalLength?: number;
  maxFocalLength?: number;
  maxAperture: number;
  minAperture: number;
  mount?: string;
  image?: string;
}

export interface Lens {
  id: string;
  nickname?: string;
  displayName: string;
  lensType: string;
}

export interface FilmStock {
  id: string;
  dataSource: "user" | "system";
  name: string;
  description?: string;
  type: "color" | "bw";
  iso: number;
  image?: string;
}

export interface FilmRoll {
  id: string;
  filmType: FilmStock;
  selectedCamera: string;
  selectedCameraType: CameraType;
  selectedLens: string;
  selectedLensType: LensType;
  name?: string;
  notes?: string;
  length: number;
  started: string;
  finished?: string;
  pictures: Picture[];
}

export interface Picture {
  id: string;
  cameraId: string;
  camera: CameraType;
  lensId: string;
  lens: LensType;
  date: string;
  shutterSpeed: string;
  aperture: string;
  latitude?: number;
  longitude?: number;
  referenceImage?: string;
  actualImage?: string;
  notes?: string;
}

export interface Session {
  id: string;
  location?: string;
  notes?: string;
  rollId: string;
  paused: boolean;
  started: string;
  finished?: string;
  liveActivityId?: string;
}
