import { config } from '@tamagui/config/v3';
import { createTamagui, createFont } from 'tamagui';

const bodyFont = createFont({
    ...config.fonts.body,
    family: 'System',
});

const monoFont = createFont({
    ...config.fonts.mono,
    family: 'Courier New',
});

const headingFont = createFont({
    ...config.fonts.heading,
    family: 'System',
});

export const tamaguiConfig = createTamagui({
    ...config,
    fonts: {
        body: bodyFont,
        heading: headingFont,
        mono: monoFont,
    },
})

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}