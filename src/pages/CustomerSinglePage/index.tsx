import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";

import { PageHeaderContainer } from "../../GlobalStyle";

export const CustomerSinglePage = () => {
    const { id } = useParams();

    interface CustomerInterface {
        id: number;
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        cpf: string;
        gender: string;
        createdAt: string;
        updatedAt: string;
    }

    const initCustomer = {
        id: 0,
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        cpf: "",
        gender: "",
        createdAt: "",
        updatedAt: "",
    };

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
        api.post(
            "/customers",
            {
                firstName: customer.firstName,
                lastName: customer.lastName,
                phone: customer.phone,
                email: customer.email,
                cpf: customer.cpf,
                gender: customer.gender,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }
        )
            .then((response) => {
                // let dataJson = response.data;
                // setCustomer(dataJson);

                // console.log("dataJson => ", dataJson);
                alert("Salvo com sucesso.");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        GetCustomerInfo();
    }, []);

    return (
        <>
            <PageHeaderContainer>
                <h1>Editar cliente - {customer ? customer.firstName + " " + customer.lastName : ""}</h1>
                <button
                    onClick={() => {
                        setEditAllowed(!editAllowed);
                    }}
                >
                    {!editAllowed ? "Liberar edição" : "Bloquear edição"}
                </button>
            </PageHeaderContainer>

            <form>
                <input type="text" name="firstName" placeholder="Nome" value={customer.firstName} disabled={editAllowed ? false : true} />
                <input type="text" name="lastName" placeholder="Sobrenome" value={customer.lastName} disabled={editAllowed ? false : true} />
                <input type="text" name="phone" placeholder="Telefone" value={customer.phone} disabled={editAllowed ? false : true} />
                <input type="text" name="email" placeholder="E-mail" value={customer.email} disabled={editAllowed ? false : true} />
                <input type="text" name="cpf" placeholder="CPF (Opcional)" value={customer.cpf} disabled={editAllowed ? false : true} />
                <select name="gender" value={customer.gender} disabled={editAllowed ? false : true}>
                    <option value="feminino">Feminino</option>
                    <option value="masculino">Masculino</option>
                </select>{" "}
                <button onClick={SaveCustomerInfo} disabled={editAllowed ? false : true}>
                    Salvar edição
                </button>
            </form>
        </>
    );
};
