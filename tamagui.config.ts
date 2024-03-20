import { config } from '@tamagui/config/v3';
import { createTamagui, createFont } from 'tamagui';

const bodyFont = createFont({
    ...config.fonts.body,
    family: 'System',
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
    },
})

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}