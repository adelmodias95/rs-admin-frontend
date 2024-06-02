import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

import api from "../../services/api";

import { Table, ModalCloseButton } from "./style";
import { PageHeaderContainer } from "../../GlobalStyle";

const ServicesPage = () => {
    let [customers, setCustomers] = useState([]);
    let [openModal, setOpenModal] = useState(false);

    let [totalHoursArr, setTotalHoursArr] = useState([]);
    let [totalMinutesArr, setTotalMinutesArr] = useState([]);

    function fillhoursArr() {
        for (let index = 1; index < 11; index++) {
            setTotalHoursArr((totalHoursArr) => [...totalHoursArr, index]);
        }
    }

    function fillMinutesArr() {
        for (let index = 1; index < 61; index++) {
            setTotalMinutesArr((totalMinutesArr) => [...totalMinutesArr, index]);
        }
    }

    async function getCustomers() {
        api.get("services", {
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

        api.post(
            "services",
            {
                title: event.target.title.value,
                price: Number(event.target.price.value),
                timeHours: Number(event.target.timeHours.value),
                timeMinutes: Number(event.target.timeMinutes.value),
                observation: event.target.observation.value,
                userId: customers[0].userId,
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
                    text: "O novo serviço foi cadastrado no banco de dados.",
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
                api.delete("services", {
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
        fillhoursArr();
        fillMinutesArr();
    }, []);

    return (
        <>
            <PageHeaderContainer>
                <h1>Meus Serviços</h1>
                <button onClick={() => setOpenModal(true)}>Adicionar serviços</button>
            </PageHeaderContainer>

            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Duração</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.title}</td>
                            <td>{customer.price ? "R$ " + customer.price : "Não informado"}</td>
                            <td>{customer.timeHours ? customer.timeHours + "h" + customer.timeMinutes : "Não informado"}</td>
                            <td>
                                <Link to={"/clientes/" + customer.id} title="Visualizar cadastro completo">
                                    <FaEdit />{" "}
                                </Link>
                                <a href="" onClick={deleteCustomer} data-customer-id={customer.id} title="Deletar cadastro">
                                    <FaRegTrashAlt />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <ReactModal isOpen={openModal} onRequestClose={() => setOpenModal(true)} overlayClassName="modal-overlay">
                <ModalCloseButton
                    onClick={() => {
                        setOpenModal(false);
                    }}
                >
                    X
                </ModalCloseButton>
                <form onSubmit={addCustomer}>
                    <label htmlFor="title">Título do serviço</label>
                    <input id="title" type="text" name="title" placeholder="Título do serviço" />
                    <label htmlFor="price">Preço</label>
                    <input id="price" type="number" step=".01" name="price" placeholder="Preço" />
                    <fieldset>
                        <div>
                            <label htmlFor="timeHours">Horas</label>
                            <select id="timeHours" name="timeHours">
                                {totalHoursArr.map((hour) => (
                                    <option key={hour} value={hour < 10 ? "0" + hour : hour}>
                                        {hour < 10 ? "0" + hour : hour}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="timeMinutes">Minutos</label>
                            <select id="timeMinutes" name="timeMinutes">
                                <option value="00">00</option>
                                {totalMinutesArr.map((minute) => (
                                    <option key={minute} value={minute < 10 ? "0" + minute : minute}>
                                        {minute < 10 ? "0" + minute : minute}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </fieldset>
                    <label htmlFor="observation">Anotação</label>
                    <textarea id="observation" name="observation" placeholder="Anotação"></textarea>
                    <button>Cadastrar</button>
                </form>
            </ReactModal>
        </>
    );
};

export { ServicesPage };
