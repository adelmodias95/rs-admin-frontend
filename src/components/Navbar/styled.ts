import styled from "styled-components";

import { VARIABLES } from "../../GlobalStyle";

const Header = styled.header`
    padding: 1rem 0;
    box-shadow: ${VARIABLES.lightTheme.boxShadow};
    background-color: white;
    z-index: 99;

    h1 {
        display: block;
        font-size: 1.5rem;
        font-weight: 700;
        color: ${VARIABLES.lightTheme.mainColor};
        white-space: nowrap;
        margin: 0;

        &.text-center {
            text-align: center;
            font-size: 2.5rem;
        }
    }

    ul {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            & + li {
                margin-left: 1rem;
            }

            a {
                color: ${VARIABLES.lightTheme.titleColor};
                text-decoration: none;

                strong {
                    font-weight: 500;
                }
            }
        }
    }

    svg {
        font-size: 25px;
        cursor: pointer;
    }
`;

export { Header };
