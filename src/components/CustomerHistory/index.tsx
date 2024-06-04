import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";

import {
    Flex,
    Heading,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Modal,
    useDisclosure,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    NumberInput,
    FormHelperText,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInputField,
    NumberInputStepper,
    Textarea,
    ModalCloseButton,
    useToast,
} from "@chakra-ui/react";

export const CustomerHistory = () => {
    const { id } = useParams();

    const [customerHistory, setCustomerHistory] = useState([]);
    const [historyType, setHistoryType] = useState("0");

    const [services, setServices] = useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    async function getCustomerHistory() {
        api.get(`/customer-history/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((response) => {
                let dataJson = response.data;
                setCustomerHistory(dataJson);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function getServices() {
        api.get(`/services`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((response) => {
                let dataJson = response.data;
                console.log("services => ", dataJson);
                setServices(dataJson);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function fillServiceDetails(service) {
        let serviceOnArr = services.find((item) => item.title == service);
        let elementPrice = document.querySelector("#servicePrice") as HTMLInputElement;
        let elementTimeHours = document.querySelector("#timeHours") as HTMLInputElement;
        let elementTimeMinutes = document.querySelector("#timeMinutes") as HTMLInputElement;
        elementPrice.value = serviceOnArr.price;
        elementTimeHours.value = serviceOnArr.timeHours;
        elementTimeMinutes.value = serviceOnArr.timeMinutes;
    }

    async function addCustomerHistory(event) {
        event.preventDefault();

        let historyType = event.target.historyType;
        let observationText = event.target.observationText;
        let serviceName = event.target.serviceName;
        let servicePrice = event.target.servicePrice;
        let timeHours = event.target.timeHours;
        let timeMinutes = event.target.timeMinutes;
        let paymentValue = event.target.paymentValue;
        let paymentMethod = event.target.paymentMethod;
        let description = event.target.description;
        let translate = "";

        switch (event.target.historyType.value) {
            case "service":
                translate = "Serviço realizado";
                break;

            case "payment":
                translate = "Pagamento realizado";
                break;

            case "payment-reversal":
                translate = "Estorno de pagamento";
                break;

            case "observation":
                translate = "Anotação";
                break;

            default:
                break;
        }

        const addHistoryPromise = new Promise((resolve, reject) => {
            api.post(
                "customer-history",
                {
                    type: historyType ? historyType.value : null,
                    typeTranslated: translate,
                    observationText: observationText ? observationText.value : null,
                    serviceName: serviceName ? serviceName.value : null,
                    price: servicePrice ? servicePrice.value : null,
                    timeHours: timeHours ? Number(timeHours.value) : null,
                    timeMinutes: timeMinutes ? Number(timeMinutes.value) : null,
                    paymentValue: paymentValue ? paymentValue.value : null,
                    paymentMethod: paymentMethod ? paymentMethod.value : null,
                    description: description ? description.value : null,
                    customerId: Number(id),
                    userId: 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            )
                .then((response) => {
                    let resJson = response.data;

                    setCustomerHistory([resJson, ...customerHistory]);

                    onClose();

                    resolve(resJson);
                })
                .catch((error) => {
                    resolve(error);
                });
        });

        toast.promise(addHistoryPromise, {
            success: {
                title: "Histórico adicionado!",
                description: "Você já pode visualiza-lo no histórico do cliente.",
            },
            error: {
                title: "Erro!",
                description: "Houve um erro ao tentar adicionar o registro. Tente novamente.",
            },
            loading: { title: "Salvando...", description: "Aguarde." },
        });
    }

    useEffect(() => {
        getCustomerHistory();
        getServices();
    }, []);

    return (
        <>
            <Flex marginBottom="1.5rem" alignItems="center" justifyContent="space-between">
                <Heading as="h2">Histórico do cliente</Heading>
                <Button
                    borderRadius={5}
                    backgroundColor="primary"
                    color="white"
                    _hover={{ backgroundColor: "primaryHover" }}
                    onClick={onOpen}
                >
                    Adicionar histórico
                </Button>
            </Flex>

            <div>
                {customerHistory.map((history) => (
                    <div key={history.id} style={{ marginTop: "2rem" }}>
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
                                    <strong>Tempo de execução:</strong> {history.timeHours}h{" "}
                                    {history.timeMinutes}m
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
                            <strong>Data:</strong>{" "}
                            {new Intl.DateTimeFormat("pt-BR").format(new Date(history.createdAt))}
                        </p>
                    </div>
                ))}
            </div>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Adicionar histórico</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <form onSubmit={addCustomerHistory}>
                            <FormControl marginTop="1rem">
                                <FormLabel>Tipo do histórico</FormLabel>
                                <Select
                                    placeholder="selecione uma opção"
                                    name="historyType"
                                    onChange={(e) => {
                                        setHistoryType(e.target.value);
                                    }}
                                >
                                    <option value="service">Serviço realizado</option>
                                    <option value="observation">Anotação</option>
                                    <option value="payment">Pagamento realizado</option>
                                    <option value="payment-reversal">Estorno de pagamento</option>
                                </Select>
                            </FormControl>

                            {historyType == "observation" && (
                                <FormControl marginTop="1rem">
                                    <FormLabel>Anotação</FormLabel>
                                    <Textarea name="observationText" />
                                </FormControl>
                            )}

                            {historyType == "service" && (
                                <>
                                    <FormControl marginTop="1rem">
                                        <FormLabel>Nome do serviço</FormLabel>
                                        <Select
                                            placeholder="selecione uma opção"
                                            id="serviceName"
                                            name="serviceName"
                                            onChange={(e) => fillServiceDetails(e.target.value)}
                                        >
                                            {services.map((service) => (
                                                <option key={service.id} value={service.title}>
                                                    {service.title}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl marginTop="1rem">
                                        <FormLabel>Valor do serviço</FormLabel>
                                        <Input
                                            type="number"
                                            id="servicePrice"
                                            name="price"
                                            step=".01"
                                        />
                                    </FormControl>
                                    <Flex
                                        alignItems="center"
                                        justifyContent="space-between"
                                        gap="10px"
                                        marginTop="1rem"
                                    >
                                        <FormControl>
                                            <FormLabel>Hora</FormLabel>
                                            <NumberInput
                                                max={24}
                                                min={0}
                                                id="timeHours"
                                                name="timeHours"
                                            >
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                            <FormHelperText>Digite de 0 a 24</FormHelperText>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Minutos</FormLabel>
                                            <NumberInput
                                                max={60}
                                                min={0}
                                                id="timeMinutes"
                                                name="timeMinutes"
                                            >
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                            <FormHelperText>Digite de 0 a 60</FormHelperText>
                                        </FormControl>
                                    </Flex>
                                </>
                            )}

                            {historyType == "payment" && (
                                <>
                                    <FormControl marginTop="1rem">
                                        <FormLabel>Valor do Pagamento</FormLabel>
                                        <Input type="number" name="paymentValue" step=".01" />
                                    </FormControl>
                                    <FormControl marginTop="1rem">
                                        <FormLabel>Método de pagamento</FormLabel>
                                        <Input type="text" name="paymentMethod" />
                                    </FormControl>
                                </>
                            )}

                            {historyType == "payment-reversal" && (
                                <>
                                    <FormControl marginTop="1rem">
                                        <FormLabel>Valor do Estorno</FormLabel>
                                        <Input type="number" name="paymentValue" step=".01" />
                                    </FormControl>
                                    <FormControl marginTop="1rem">
                                        <FormLabel>Método de pagamento</FormLabel>
                                        <Input type="text" name="paymentMethod" />
                                    </FormControl>
                                </>
                            )}

                            {(historyType == "service" ||
                                historyType == "payment" ||
                                historyType == "payment-reversal") && (
                                <FormControl marginTop="1rem">
                                    <FormLabel>Descrição / Observação</FormLabel>
                                    <Textarea name="description" />
                                </FormControl>
                            )}

                            <Button
                                marginTop="1rem"
                                borderRadius={5}
                                backgroundColor="primary"
                                color="white"
                                _hover={{ backgroundColor: "primaryHover" }}
                                type="submit"
                            >
                                Salvar
                            </Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
