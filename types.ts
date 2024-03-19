export interface CameraType {
    id: string;
    dataSource: 'user' | 'system';
    make: string;
    model: string;
    type: 'SLR';
    filmFormat: '35mm';
    mount: string;
    disposable: boolean;
    halfFrame: boolean;
    releaseDate: string;
    minShutterSpeed: number;
    maxShutterSpeed: number;
    image?: string;
};

export interface Camera {
    id: string;
    nickname?: string;
    cameraType: string;
}

export interface LensType {
    id: string;
    dataSource: 'user' | 'system';
    make: string;
    model: string;
    type: 'prime' | 'zoom';
    releaseDate: string;
    minFocalLength?: number;
    maxFocalLength?: number;
    maxAperture?: number;
    minAperture?: number;
    mount?: string;
    image?: string;
}

export interface Lens {
    id: string;
    nickname?: string;
    lensType: string;
}

export interface FilmStock {
    id: string;
    dataSource: 'user' | 'system';
    name: string;
    description?: string;
    type: 'color' | 'bw';
    iso: number;
    image?: string;
}

export interface FilmRoll {
    id: string;
    filmType: string;
    selectedCamera: string;
    selectedLens: string;
    name?: string;
    length: number;
    started: string;
    finished?: string;
}

export interface Picture {
    id: string;
    cameraId: string;
    camera: CameraType;
    lensId: string;
    lens: LensType;
    rollId: string;
    date: string;
    shutterSpeed: number;
    aperture: number;
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
    roll: string;
    paused: boolean;
    started: string;
    finished?: string;
}