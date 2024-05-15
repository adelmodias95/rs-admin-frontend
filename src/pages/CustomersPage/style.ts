import styled from "styled-components";

import { VARIABLES } from "../../GlobalStyle";

export const PageHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    margin-bottom: 2.5rem;

    button {
        background: ${VARIABLES.lightTheme.mainColor};
        color: white;
        border: none;
        padding: 10px 1rem;
        cursor: pointer;
        transition: 0.5s all;
        width: 100%;
        max-width: max-content;

        &:hover {
            background: ${VARIABLES.lightTheme.hoverColor};
        }
    }
`;

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

export const ModalCloseButton = styled.button`
    display: block;
    margin-left: auto;
    margin-bottom: 2rem;

    width: 100%;
    max-width: max-content;
    background: ${VARIABLES.lightTheme.mainColor};
    color: white;
    border: none;
    border-radius: ${VARIABLES.borderRadius};
    padding: 10px 1rem;
    cursor: pointer;
    transition: 0.5s all;

    &:hover {
        background: ${VARIABLES.lightTheme.hoverColor};
    }
`;

export const Form = styled.form`
    input,
    select {
        display: block;
        width: 100%;
        margin-bottom: 1rem;
        padding: 10px 1rem;
        border-radius: ${VARIABLES.borderRadius};
        border: 1px solid ${VARIABLES.lightTheme.subTitleColor};
    }

    button {
        display: block;
        width: 100%;
        background: ${VARIABLES.lightTheme.mainColor};
        color: white;
        border: none;
        padding: 10px 1rem;
        cursor: pointer;
        transition: 0.5s all;

        &:hover {
            background: ${VARIABLES.lightTheme.hoverColor};
        }
    }
`;