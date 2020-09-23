import { createGlobalStyle } from 'styled-components';

import ErasFontSVG from './Eras-Font/eras-webfont.svg';
import ErasFontEOT from './Eras-Font/eras-webfont.eot';
import ErasFontTTF from './Eras-Font/eras-webfont.ttf';
import ErasFontWOFF from './Eras-Font/eras-webfont.woff';
import ErasFontWOFF2 from './Eras-Font/eras-webfont.woff2';
import ErasBookFontSVG from './Eras-Font/eras_book-webfont.svg';
import ErasBookFontEOT from './Eras-Font/eras_book-webfont.eot';
import ErasBookFontTTF from './Eras-Font/eras_book-webfont.ttf';
import ErasBookFontWOFF from './Eras-Font/eras_book-webfont.woff';
import ErasBookFontWOFF2 from './Eras-Font/eras_book-webfont.woff2';
import nasalizationFontTTF from './nasalization-Font/nasalization.ttf';
export default createGlobalStyle`
    @font-face {
        font-family: 'eras-font';
        src: url('${ ErasFontEOT }');
        src: url('${ ErasFontEOT }?#iefix') format('embedded-opentype'),
             url('${ ErasFontWOFF2 }') format('woff2'),
             url('${ ErasFontWOFF }') format('woff'),
             url('${ ErasFontTTF }') format('truetype'),
             url('${ ErasFontSVG }#erasnormal') format('svg');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'eras-book-font';
        src: url('${ ErasBookFontEOT }');
        src: url('${ ErasBookFontEOT }?#iefix') format('embedded-opentype'),
             url('${ ErasBookFontWOFF2 }') format('woff2'),
             url('${ ErasBookFontWOFF }') format('woff'),
             url('${ ErasBookFontTTF }') format('truetype'),
             url('${ ErasBookFontSVG }#itcerasbook') format('svg');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'nasalization';
        src: url('${ nasalizationFontTTF }') format('truetype');
        font-weight: normal;
        font-style: normal;
    }
`;