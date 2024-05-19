import { useState } from "react";

export const CustomerHistory = () => {
    const [customerHistory] = useState([
        {
            id: 19,
            type: "observation",
            typeTranslated: "Observação",

            observationText: "lorem ipsum dolor met si.",

            inputChanged: "",
            oldValue: "",
            newValue: "",

            serviceName: "",
            price: null,
            timeHours: null,
            timeMinutes: null,

            paymentValue: null,
            paymentMethod: null,

            description: "",
            authorId: 1,
            authorName: "Contato@adelmodias.com.br",
            createdAt: "2024-05-17T23:00:00.147Z",
            updatedAt: "2024-05-17T23:00:00.147Z",
        },
        {
            id: 19,
            type: "payment-reversal",
            typeTranslated: "Estorno de pagamento",

            inputChanged: "",
            oldValue: "",
            newValue: "",

            serviceName: "",
            price: null,
            timeHours: null /* 1 a 24 */,
            timeMinutes: null /* 0 a 59 */,

            paymentValue: 100.0,
            paymentMethod: "Pix",

            authorId: 1,
            authorName: "Contato@adelmodias.com.br",
            description: "Estorno realizado para o cliente no pix pelo motivo de blablabla",
            createdAt: "2024-05-17T23:00:00.147Z",
            updatedAt: "2024-05-17T23:00:00.147Z",
        },
        {
            id: 19,
            type: "payment",
            typeTranslated: "Pagamento",

            inputChanged: "",
            oldValue: "",
            newValue: "",

            serviceName: "",
            price: null,
            timeHours: null /* 1 a 24 */,
            timeMinutes: null /* 0 a 59 */,

            paymentValue: 250.55,
            paymentMethod: "Pix",

            authorId: 1,
            authorName: "Contato@adelmodias.com.br",
            description: "",
            createdAt: "2024-05-17T23:00:00.147Z",
            updatedAt: "2024-05-17T23:00:00.147Z",
        },
        {
            id: 19,
            type: "service",
            typeTranslated: "Serviço realizado",

            inputChanged: "",
            oldValue: "",
            newValue: "",

            serviceName: "Massagem relaxante",
            servicePrice: 250.0,
            timeHours: 2 /* 1 a 24 */,
            timeMinutes: 45 /* 0 a 59 */,

            authorId: 1,
            authorName: "Contato@adelmodias.com.br",
            description: "Cliente realizou o serviço blablabla...",
            createdAt: "2024-05-17T23:00:00.147Z",
            updatedAt: "2024-05-17T23:00:00.147Z",
        },
        {
            id: 19,
            type: "data-changed",
            typeTranslated: "Dado alterado",
            oldValue: "(11) 90000-0000",
            newValue: "(11) 91234-5678",
            authorId: 1,
            authorName: "Contato@adelmodias.com.br",
            description: "Cliente solicitou alteração do número de telefone",
            createdAt: "2024-05-16T23:00:00.147Z",
            updatedAt: "2024-05-16T23:00:00.147Z",
        },
        {
            id: 19,
            type: "data-created",
            typeTranslated: "Cliente cadastrado no sistema",
            oldValue: "",
            newValue: "",
            authorId: 1,
            authorName: "Contato@adelmodias.com.br",
            createdAt: "2024-05-16T23:00:00.147Z",
            updatedAt: "2024-05-16T23:00:00.147Z",
        },
    ]);

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
