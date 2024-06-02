import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

import api from "../../services/api";

import { Table, ModalCloseButton } from "./style";
import { PageHeaderContainer } from "../../GlobalStyle";

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
        let name = event.target.name.value;
        let phone = event.target.phone.value;
        let email = event.target.email.value;
        let cpf = event.target.cpf.value;
        let gender = event.target.gender.value;
        let userId = customers[0].userId;

        api.post(
            "customers",
            {
                name,
                phone,
                email,
                cpf,
                gender,
                userId,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }
        )
            .then((response) => {
                let resJson = response.data;

                setCustomers([resJson, ...customers]);
                setOpenModal(false);

                Swal.fire({
                    title: "Cadastrado com sucesso!",
                    text: "O novo cliente foi cadastrado no banco de dados.",
                    icon: "success",
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function deleteCustomer(event) {
        event.preventDefault();
        let customerId = event.target.dataset.customerId;

        Swal.fire({
            title: "Você tem certeza?",
            text: "Essa ação é irreversível.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#C667AD",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, deletar cadastro!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete("customers", {
                    data: { id: customerId },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                })
                    .then((response) => {
                        let customersArr = [...customers];
                        let newCustomersArr = customersArr.filter((item) => item.id !== Number(customerId));

                        setCustomers(newCustomersArr);

                        Swal.fire({
                            title: "Deletado!",
                            text: "Cadastro deletado com sucesso.",
                            icon: "success",
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    }

    useEffect(() => {
        getCustomers();
    }, []);

    return (
        <>
            <PageHeaderContainer>
                <h1>Meus Clientes</h1>
                <button onClick={() => setOpenModal(true)}>Adicionar cliente</button>
            </PageHeaderContainer>

            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Celular</th>
                        <th>E-mail</th>
                        <th>Cadastro</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td style={{ textAlign: "center" }}>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.phone ? customer.phone : "Não informado"}</td>
                            <td>{customer.email ? customer.email : "Não informado"}</td>
                            <td>{new Intl.DateTimeFormat("pt-BR").format(new Date(customer.createdAt))}</td>
                            <td>
                                <Link to={"/clientes/" + customer.id} title="Visualizar cadastro completo">
                                    <FaEye />{" "}
                                </Link>
                                <a href="" onClick={deleteCustomer} data-customer-id={customer.id} title="Deletar cadastro">
                                    <FaRegTrashAlt />
                                </a>
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
                <form onSubmit={addCustomer}>
                    <input type="text" name="name" placeholder="Nome" />
                    <input type="text" name="phone" placeholder="Telefone" />
                    <input type="text" name="email" placeholder="E-mail" />
                    <input type="text" name="cpf" placeholder="CPF (Opcional)" />
                    <select name="gender">
                        <option value="feminino">Feminino</option>
                        <option value="masculino">Masculino</option>
                    </select>
                    <button>Cadastrar</button>
                </form>
            </ReactModal>
        </>
    );
};

export { CustomersPage };
