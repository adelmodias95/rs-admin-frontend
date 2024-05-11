import { useState, useEffect } from "react";

import api from "../../services/api";

import { Table } from "./style";

const CustomersPage = () => {
    let [customers, setCustomers] = useState([]);

    async function getCustomers() {
        api.get("users", {
            headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        })
            .then((response) => {
                let dataJson = response.data;
                setCustomers(dataJson);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getCustomers();
    }, []);

    return (
        <>
            <h1>Meus Clientes</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Celular</th>
                        <th>E-mail</th>
                        <th>Cadastro</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.phone ? customer.phone : "11 96065-3000"}</td>
                            <td>{customer.email}</td>
                            <td>{customer.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export { CustomersPage };
