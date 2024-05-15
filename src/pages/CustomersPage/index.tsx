import { useState, useEffect } from "react";
import ReactModal from "react-modal";

import api from "../../services/api";

import { PageHeaderContainer, Table, Form, ModalCloseButton } from "./style";

const CustomersPage = () => {
    let [customers, setCustomers] = useState([]);
    let [openModal, setOpenModal] = useState(false);

    async function getCustomers() {
        api.get("customers", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((response) => {
                let dataJson = response.data;
                setCustomers(dataJson.reverse());
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function addCustomer(event) {
        event.preventDefault();
        let firstName = event.target.firstName.value;
        let lastName = event.target.lastName.value;
        let phone = event.target.phone.value;
        let email = event.target.email.value;
        let cpf = event.target.cpf.value;
        let gender = event.target.gender.value;

        api.post(
            "customers",
            {
                firstName,
                lastName,
                phone,
                email,
                cpf,
                gender,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            }
        )
            .then((response) => {
                let resJson = response.data;
                console.log("resJson => ", resJson);
                setCustomers([resJson, ...customers]);

                setOpenModal(false);
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
            <PageHeaderContainer>
                <h1>Meus Clientes</h1>
                <button onClick={() => setOpenModal(true)}>
                    Adicionar cliente
                </button>
            </PageHeaderContainer>

            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Celular</th>
                        <th>E-mail</th>
                        <th>Gênero</th>
                        <th>Cadastro</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td style={{ textAlign: "center" }}>
                                {customer.id}
                            </td>
                            <td>
                                {customer.firstName} {customer.lastName}
                            </td>
                            <td>
                                {customer.phone
                                    ? customer.phone
                                    : "Não informado"}
                            </td>
                            <td>
                                {customer.email
                                    ? customer.email
                                    : "Não informado"}
                            </td>
                            <td style={{ textTransform: "capitalize" }}>
                                {customer.gender}
                            </td>
                            <td>
                                {new Intl.DateTimeFormat("pt-BR").format(
                                    new Date(customer.createdAt)
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <ReactModal
                isOpen={openModal}
                onRequestClose={() => setOpenModal(true)}
                // className="modal-content"
                overlayClassName="modal-overlay"
                // ariaHideApp={false}
            >
                <ModalCloseButton
                    onClick={() => {
                        setOpenModal(false);
                    }}
                >
                    X
                </ModalCloseButton>
                <Form onSubmit={addCustomer}>
                    <input type="text" name="firstName" placeholder="Nome" />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Sobrenome"
                    />
                    <input type="text" name="phone" placeholder="Telefone" />
                    <input type="text" name="email" placeholder="E-mail" />
                    <input
                        type="text"
                        name="cpf"
                        placeholder="CPF (Opcional)"
                    />
                    <select name="gender">
                        <option value="feminino">Feminino</option>
                        <option value="masculino">Masculino</option>
                    </select>
                    <button>Cadastrar</button>
                </Form>
            </ReactModal>
        </>
    );
};

export { CustomersPage };
