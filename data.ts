import type {
    CameraType,
    LensType,
    FilmStock
} from "./types";

export const cameraTypes: CameraType[] = [
    {
        id: 'olympus-om-10',
        dataSource: 'system',
        make: 'Olympus',
        model: 'OM-10',
        type: 'SLR',
        filmFormat: '35mm',
        mount: 'OM',
        disposable: false,
        halfFrame: false,
        releaseDate: '1979',
        minShutterSpeed: 1,
        maxShutterSpeed: 1 / 1000,
    }
];

export const lensTypes: LensType[] = [
    {
        id: 'olympus-om-50mm-f1.8',
        dataSource: 'system',
        make: 'Olympus',
        model: 'OM 50mm f/1.8',
        type: 'prime',
        releaseDate: '1978',
        minFocalLength: 50,
        maxFocalLength: 50,
        maxAperture: 1.8,
        minAperture: 16,
        mount: 'OM',
    }
];

export const filmStocks: FilmStock[] = [
    {
        id: 'kodak-portra-400',
        dataSource: 'system',
        name: 'Kodak Portra 400',
        type: 'color',
        iso: 400,
    }
];