import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import api from "../../services/api";

import { PageHeaderContainer } from "../../GlobalStyle";
import { CustomerHistory } from "../../components/CustomerHistory";

interface CustomerInterface {
    id: number;
    name: string;
    phone: string;
    email: string;
    cpf: string;
    gender: string;
    createdAt: string;
    updatedAt: string;
}

const initCustomer = {
    id: 0,
    name: "",
    phone: "",
    email: "",
    cpf: "",
    gender: "",
    createdAt: "",
    updatedAt: "",
};

export const CustomerSinglePage = () => {
    const { id } = useParams();

    const [customer, setCustomer] = useState<CustomerInterface>(initCustomer);
    const [editAllowed, setEditAllowed] = useState(false);

    async function GetCustomerInfo() {
        api.get(`/customer?id=${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((response) => {
                let dataJson = response.data;
                setCustomer(dataJson);

                console.log("dataJson => ", dataJson);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function SaveCustomerInfo() {
        api.patch(
            "/customers",
            {
                id: customer.id,
                data: {
                    name: customer.name,
                    phone: customer.phone,
                    email: customer.email,
                    cpf: customer.cpf,
                    gender: customer.gender,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }
        )
            .then((response) => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    },
                });

                Toast.fire({
                    icon: "success",
                    title: "Dados alterados com sucesso!",
                });
            })
            .catch((error) => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    },
                });

                Toast.fire({
                    icon: "error",
                    title: "Não foi possível completar a solicitação.",
                });
            });
    }

    useEffect(() => {
        GetCustomerInfo();
    }, []);

    return (
        <>
            <PageHeaderContainer>
                <h1>Editar cliente - {customer ? customer.name : ""}</h1>
                <button
                    onClick={() => {
                        setEditAllowed(!editAllowed);
                    }}
                >
                    {!editAllowed ? "Liberar edição" : "Bloquear edição"}
                </button>
            </PageHeaderContainer>

            <form
                onSubmit={(Event) => {
                    Event.preventDefault();
                }}
                style={{ marginBottom: "4rem" }}
            >
                <input
                    type="text"
                    name="name"
                    onChange={(e) => {
                        setCustomer({ ...customer, name: e.target.value });
                    }}
                    placeholder="Nome"
                    value={customer.name}
                    disabled={editAllowed ? false : true}
                />
                <input
                    type="text"
                    name="phone"
                    onChange={(e) => {
                        setCustomer({ ...customer, phone: e.target.value });
                    }}
                    placeholder="Telefone"
                    value={customer.phone}
                    disabled={editAllowed ? false : true}
                />
                <input
                    type="text"
                    name="email"
                    onChange={(e) => {
                        setCustomer({ ...customer, email: e.target.value });
                    }}
                    placeholder="E-mail"
                    value={customer.email}
                    disabled={editAllowed ? false : true}
                />
                <input
                    type="text"
                    name="cpf"
                    onChange={(e) => {
                        setCustomer({ ...customer, cpf: e.target.value });
                    }}
                    placeholder="CPF (Opcional)"
                    value={customer.cpf}
                    disabled={editAllowed ? false : true}
                />
                <select
                    name="gender"
                    onChange={(e) => {
                        setCustomer({ ...customer, gender: e.target.value });
                    }}
                    value={customer.gender}
                    disabled={editAllowed ? false : true}
                >
                    <option value="feminino">Feminino</option>
                    <option value="masculino">Masculino</option>
                </select>{" "}
                <button onClick={SaveCustomerInfo} disabled={editAllowed ? false : true}>
                    Salvar edição
                </button>
            </form>

            <CustomerHistory />
        </>
    );
};
