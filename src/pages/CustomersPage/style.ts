import styled from "styled-components";

import { VARIABLES } from "../../GlobalStyle";

export const Table = styled.table`
    width: 100%;
    margin: 25px 0;
    border-collapse: collapse;
    border: none;
    border-bottom: 3px solid ${VARIABLES.lightTheme.mainColor};

    tr {
        &:nth-child(even) {
            td {
                background: #e7e8ec;
            }
        }

        &:hover {
            td {
                color: #555;
                background: #e0e1e6;
            }
        }
    }

    th,
    td {
        color: #999;
        border: none;
        padding: 12px 35px;
        border-collapse: collapse;
    }

    th {
        background: ${VARIABLES.lightTheme.mainColor};
        color: #fff;
        text-transform: uppercase;
        font-size: 12px;
        text-align: left;

        &.last {
            border-right: none;
        }
    }
`;
