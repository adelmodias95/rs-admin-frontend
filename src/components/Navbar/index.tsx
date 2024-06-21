import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

import { MdOutlineLogout } from "react-icons/md";

import { Header } from "./styled";

import { Container, Flex } from "@chakra-ui/react";

export function NavBar() {
    const logout = useAuthStore((state) => state.logout);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
    return (
        <>
            {isLoggedIn && (
                <Header>
                    <Container maxW="1140px">
                        <Flex alignItems="center" justifyContent="space-between">
                            <h1>RS Estética</h1>
                            <nav>
                                <ul>
                                    <li>
                                        <Link to="/servicos">
                                            <strong>Serviços</strong>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/clientes">
                                            <strong>Clientes</strong>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                            <ul>
                                <li>
                                    <MdOutlineLogout onClick={() => logout()} />
                                </li>
                            </ul>
                        </Flex>
                    </Container>
                </Header>
            )}
        </>
    );
}
