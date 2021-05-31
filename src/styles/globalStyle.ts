import {createGlobalStyle} from "styled-components";
import RobotoWoff from "../../src/fonts/roboto.woff";
import RobotoWoff2 from "../fonts/roboto.woff2";
import RobotoRegularWoff from "../../src/fonts/robotoRegular.woff";
import RobotoRegularWoff2 from "../fonts/robotoRegular.woff2";

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Robotao';
        src: url(${RobotoWoff2}) format('woff2'),
            url(${RobotoWoff}) format('woff');
    }

    @font-face {
        font-family: 'Roboto Regular';
        src: url(${RobotoRegularWoff2}) format('woff2'),
            url(${RobotoRegularWoff}) format('woff');
    }

    body{
        background: #f7f7f7 0% 0% no-repeat padding-box;
        font-family: 'Robotao',;
}
    button, input, p, label{
        font-family: 'Robotao', 'Roboto Regular';
    }

`;

export default GlobalStyle;
