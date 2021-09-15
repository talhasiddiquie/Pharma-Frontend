import React from 'react';
import Navigations from './config/routes/Navigations'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";



function WithTheme() {
    const blackAndWhiteTheme = useSelector((state) => state.theme.blackAndWhiteTheme)
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: blackAndWhiteTheme ? "#000" : "#00aeef",
            },
            secondary: {
                main: blackAndWhiteTheme ? "#fff" : '#00203FFF',
            },
        },
    });

    const options = {
        timeout: 5000,
        position: positions.BOTTOM_RIGHT
    };

    return (
        <ThemeProvider theme={theme}>
            <Provider template={AlertTemplate} {...options}>
                <Navigations />
            </Provider>
        </ThemeProvider >
    );
}

export default WithTheme;
