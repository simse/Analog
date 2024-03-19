import type {
    CameraType
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