import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";

export const CustomerHistory = () => {
    const { id } = useParams();
    const [customerHistory, setCustomerHistory] = useState([]);

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
            <h1>Histórico do cliente</h1>

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
                                    <strong>Preço:</strong> R$ {history.servicePrice}
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
                                <p>
                                    <strong>Comentário:</strong> {history.description}
                                </p>
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
        </>
    );
};
