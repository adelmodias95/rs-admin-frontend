import { useAuthStore } from "../stores/authStore";

export function Footer() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn());

    return (
        <>
            {isLoggedIn && (
                <footer className="container-fluid">
                    <small>
                        by{" "}
                        <a href="https://adelmodias.com.br/" rel="noreferrer" target="_blank">
                            Adelmo Dias
                        </a>
                    </small>
                </footer>
            )}
        </>
    );
}
