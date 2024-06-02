import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

import { MdOutlineLogout } from "react-icons/md";

import { Header } from "./styled";

export function NavBar() {
    const logout = useAuthStore((state) => state.logout);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
    return (
        <>
            {isLoggedIn ? (
                <Header>
                    <div className="container">
                        <h1>RS Estética</h1>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">
                                        <strong>Home</strong>
                                    </Link>
                                </li>
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
                    </div>
                </Header>
            ) : (
                <Header>
                    <div className="container justify-center">
                        <h1 className="text-center">RS Estética</h1>
                    </div>
                </Header>
            )}
        </>
    );
}
