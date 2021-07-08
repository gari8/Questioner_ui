import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
    sm: '30em',
    md: '60em',
    lg: '72em',
    xl: '80em',
})

export const theme = extendTheme({
    colors: {
        lightGreen: {
            50: '#fbfbfb',
            100: '#f4fbfb',
            200: '#d8fbfb',
            300: '#bdfbfb',
            400: '#a1fbfb',
            500: '#86fbfb',
            600: '#68f9e1',
            700: '#4adfc8',
            800: '#22c5af',
            900: '#00ac97',
        },
    },
    breakpoints,
})
