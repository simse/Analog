import { config } from '@tamagui/config/v3';
import { createTamagui, createFont } from 'tamagui';

const figtree = {
    normal: {
        normal: 'Figtree',
        italic: 'Figtree-Italic',
    },
    bold: {
        normal: 'Figtree-Bold',
        italic: 'Figtree-Bold',
    },
};

const bodyFont = createFont({
    ...config.fonts.body,
    family: 'Figtree',
    face: figtree,
});

const headingFont = createFont({
    ...config.fonts.heading,
    family: 'Figtree',
    face: figtree,
});

export const tamaguiConfig = createTamagui({
    ...config,
    fonts: {
        body: bodyFont,
        heading: headingFont,
    },
})

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}