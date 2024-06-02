import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useParams } from "react-router-dom";

import api from "../../services/api";
import { ModalCloseButton } from "./style";

export const CustomerHistory = () => {
    const { id } = useParams();
    const [customerHistory, setCustomerHistory] = useState([]);
    const [historyType, setHistoryType] = useState("service");

    let [openModal, setOpenModal] = useState(false);

    async function getCustomerHistory() {
        api.get(`/customer-history/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((response) => {
                let dataJson = response.data;
                console.log("dataJson => ", dataJson);
                setCustomerHistory(dataJson);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getCustomerHistory();
    }, []);

    return (
        <>
            <div>
                <h1>Histórico do cliente</h1>
                <button onClick={() => setOpenModal(true)}>Adicionar histórico</button>
            </div>

            <div>
                {customerHistory.map((history) => (
                    <div style={{ marginTop: "2rem" }}>
                        <hr />
                        <br />
                        <p>
                            <strong>Tipo:</strong> {history.typeTranslated}
                        </p>

                        {history.type === "data-changed" ? (
                            <>
                                <p>
                                    <strong>Valor antigo:</strong> {history.oldValue}
                                </p>
                                <p>
                                    <strong>Novo valor:</strong> {history.newValue}
                                </p>
                            </>
                        ) : (
                            ""
                        )}

                        {history.type === "service" ? (
                            <>
                                <p>
                                    <strong>Serviço realizado:</strong> {history.serviceName}
                                </p>
                                <p>
                                    <strong>Preço:</strong> R$ {history.price}
                                </p>
                                <p>
                                    <strong>Tempo de execução:</strong> {history.timeHours}h {history.timeMinutes}m
                                </p>
                            </>
                        ) : (
                            ""
                        )}

                        {history.type === "payment" || history.type === "payment-reversal" ? (
                            <>
                                <p>
                                    <strong>Valor pago:</strong> R$ {history.paymentValue}
                                </p>
                                <p>
                                    <strong>Método de pagamento:</strong> {history.paymentMethod}
                                </p>
                            </>
                        ) : (
                            ""
                        )}

                        {history.type === "observation" ? (
                            <p>
                                <strong>Observação:</strong> {history.observationText}
                            </p>
                        ) : (
                            ""
                        )}

                        {history.type !== "data-created" && history.type !== "observation" ? (
                            <>
                                {history.description && (
                                    <p>
                                        <strong>Comentário:</strong> {history.description}
                                    </p>
                                )}
                            </>
                        ) : (
                            ""
                        )}

                        <p>
                            <strong>Data:</strong> {new Intl.DateTimeFormat("pt-BR").format(new Date(history.createdAt))}
                        </p>
                    </div>
                ))}
            </div>

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
                <form>
                    <select
                        name="historyType"
                        onChange={(e) => {
                            setHistoryType(e.target.value);
                        }}
                    >
                        <option value="service">Serviço realizado</option>
                        <option value="observation">Anotação</option>
                        <option value="payment">Pagamento realizado</option>
                        <option value="payment-reversal">Estorno de pagamento</option>
                    </select>

                    {historyType == "observation" && (
                        <>
                            <textarea name="observationText" placeholder="Anotação" />
                        </>
                    )}

                    {historyType == "service" && (
                        <>
                            <input type="text" name="serviceName" placeholder="Massagem Relaxante" />
                            <input type="text" name="price" placeholder="Valor do serviço" />
                            <input type="text" name="timeHours" placeholder="Tempo do serviço - Horas" />
                            <input type="text" name="timeMinutes" placeholder="Tempo do serviço - Minutos" />
                        </>
                    )}

                    {historyType == "payment" && (
                        <>
                            <input type="text" name="paymentValue" placeholder="Valor do pagamento" />
                            <input type="text" name="paymentMethod" placeholder="Método de pagamento" />
                        </>
                    )}

                    {historyType == "payment-reversal" && (
                        <>
                            <input type="text" name="paymentValue" placeholder="Valor do Estorno" />
                            <input type="text" name="paymentMethod" placeholder="Método de pagamento" />
                        </>
                    )}

                    <button>Cadastrar</button>
                </form>
            </ReactModal>
        </>
    );
};
