import { createGlobalStyle } from "styled-components";

const VARIABLES = {
    lightTheme: {
        mainColor: "#C667AD",
        titleColor: "#212b36",
        subTitleColor: "#919eab",
        textColor: "#495057",
        bodyBgLightTheme: "#f1f4f6",
        bodyBgDarkTheme: "#f1f4f6",
        hoverColor: "#9F4388",
        boxShadow:
            "0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03), 0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03), 0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05), 0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03)",
    },

    borderRadius: `5px`,

    // Responsive
    screenXl: "1200px",
    screenLg: "992px",
    screenMd: "768px",
    screenSm: "576px",
};

const GlobalStyles = createGlobalStyle`
  /* html {
    --color-text: black;
    --color-background: white;
    --color-primary: rebeccapurple;
  } */

    /* Reboot */
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    * {
        margin: 0;
    }

    html,
    body {
        height: 100%;
    }

    body {
        background: ${VARIABLES.lightTheme.bodyBgLightTheme};
        font-family: "Poppins", sans-serif;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
    }

    /* Container */
    .container {
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;

        @media (min-width: ${VARIABLES.screenSm}) {
            max-width: 540px;
        }

        @media (min-width: ${VARIABLES.screenMd}) {
            max-width: 720px;
        }

        @media (min-width: ${VARIABLES.screenLg}) {
            max-width: 960px;
        }

        @media (min-width: ${VARIABLES.screenXl}) {
            max-width: 1170px;
        }
    }

    .container-fluid {
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
    }

    main {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }

    .ReactModal__Content{
        max-width: 600px;
        max-height: max-content;
        margin: auto;
    }
`;

export { VARIABLES, GlobalStyles };
