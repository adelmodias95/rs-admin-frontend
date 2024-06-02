import styled from "styled-components";
import { VARIABLES } from "../../GlobalStyle";

// export const Title = styled.h1`

// `;

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
