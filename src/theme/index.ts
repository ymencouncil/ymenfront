import { black, green, blue, grey, red, white } from './colors'

const theme = {
  borderRadius: 12,
  breakpoints: {
    mobile: 400,
  },
  color: {
    black,
    grey,
    blue,
    primary: {
      light: red[200],
      main: red[1000],
    },
    secondary: {
      main: green[500],
    },
    white,
  },
  siteWidth: 1800,
  spacing: {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    7: 64,
  },
  topBarSize: 72,
}

export default theme
