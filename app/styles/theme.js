import { createMuiTheme } from '@material-ui/core';
import { color, themeColor } from './constants';

export const theme = createMuiTheme({
    palette:{
        primary:{
            main:themeColor.primary,
            contrastText:color.white
        },
        secondary:{
            main:themeColor.secondary,
            contrastText:color.white
        }
    },
    breakpoints:{
        values:{
            xs:360,
            sm:600,
            md:900,
            lg:1280,
            xl:1920
        }
    }
})