import React from "react";
import { useState, useEffect } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

import api from "../../services/api";

import {
    Flex,
    Container,
    Heading,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Textarea,
    FormHelperText,
    useToast,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
} from "@chakra-ui/react";

const ServicesPage = () => {
    let [customers, setCustomers] = useState([]);

    let [customerToDelete, setCustomerToDelete] = useState(0);

    // Modal Add
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    // Modal delete
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
    const cancelRef = React.useRef();

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

        const addPromise = new Promise((resolve, reject) => {
            api.post(
                "services",
                {
                    title: event.target.title.value,
                    price: Number(event.target.price.value),
                    timeHours: Number(event.target.timeHours.value),
                    timeMinutes: Number(event.target.timeMinutes.value),
                    observation: event.target.observation.value,
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

                    setCustomers([resJson, ...customers]);

                    onClose();

                    resolve(resJson);
                })
                .catch((error) => {
                    resolve(error);
                });
        });

        toast.promise(addPromise, {
            success: {
                title: "Serviço adicionado!",
                description: "Você já pode visualiza-lo na lista de serviços.",
            },
            error: {
                title: "Erro!",
                description: "Houve um erro ao tentar adicionar o serviço. Tente novamente.",
            },
            loading: { title: "Salvando...", description: "Aguarde." },
        });
    }

    async function deleteCustomer() {
        let customerId = customerToDelete;

        const deletePromise = new Promise((resolve, reject) => {
            api.delete("services", {
                data: { id: customerId },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
                .then(() => {
                    let customersArr = [...customers];
                    let newCustomersArr = customersArr.filter(
                        (item) => item.id !== Number(customerId)
                    );

                    setCustomers(newCustomersArr);

                    onCloseDelete();

                    resolve(newCustomersArr);
                })
                .catch((error) => {
                    resolve(error);
                });
        });

        toast.promise(deletePromise, {
            success: {
                title: "Serviço deletado!",
                description: "O serviço selecionado foi deletado do sistema.",
            },
            error: {
                title: "Erro!",
                description: "Houve um erro ao tentar deletar o serviço. Tente novamente.",
            },
            loading: { title: "Deletando...", description: "Aguarde." },
        });
    }

    useEffect(() => {
        getCustomers();
    }, []);

    return (
        <Container maxW="1140px" minH="100vh" backgroundColor="white" paddingBottom="4rem">
            <Flex
                paddingTop="3rem"
                marginBottom="4rem"
                alignItems="center"
                justifyContent="space-between"
            >
                <Heading as="h1">Meus Serviços</Heading>
                <Button
                    borderRadius={5}
                    backgroundColor="primary"
                    color="white"
                    _hover={{ backgroundColor: "primaryHover" }}
                    onClick={onOpen}
                >
                    Adicionar serviço
                </Button>
            </Flex>

            <Table>
                <Thead backgroundColor="primary">
                    <Tr>
                        <Th color="white">ID</Th>
                        <Th color="white">Nome</Th>
                        <Th color="white">Preço</Th>
                        <Th color="white">Duração</Th>
                        <Th color="white" textAlign="center">
                            Ações
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {customers.map((customer) => (
                        <Tr key={customer.id}>
                            <Td>{customer.id}</Td>
                            <Td>{customer.title}</Td>
                            <Td>{customer.price ? "R$ " + customer.price : "Não informado"}</Td>
                            <Td>
                                {customer.timeHours
                                    ? customer.timeHours + "h" + customer.timeMinutes
                                    : "Não informado"}
                            </Td>
                            <Td textAlign="center">
                                <Button backgroundColor="transparent">
                                    <FaEdit />{" "}
                                </Button>
                                <Button
                                    onClick={() => {
                                        onOpenDelete();
                                        setCustomerToDelete(customer.id);
                                    }}
                                    title="Deletar cadastro"
                                    backgroundColor="transparent"
                                >
                                    <FaRegTrashAlt />
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            {/* Remover */}
            <AlertDialog
                isOpen={isOpenDelete}
                leastDestructiveRef={cancelRef}
                onClose={onCloseDelete}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Deletar serviço
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Tem certeza? Você não pode desfazer esta ação posteriormente.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button
                                ref={cancelRef}
                                onClick={() => {
                                    onCloseDelete();
                                    setCustomerToDelete(0);
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button colorScheme="red" onClick={deleteCustomer} ml={3}>
                                Deletar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            {/* Adicionar */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Adicionar serviço</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <form onSubmit={addCustomer}>
                            <FormControl>
                                <FormLabel>Título do serviço</FormLabel>
                                <Input type="text" name="title" />
                            </FormControl>
                            <FormControl marginTop="1rem">
                                <FormLabel>Preço</FormLabel>
                                <Input type="number" step=".01" name="price" />
                            </FormControl>
                            <Flex
                                alignItems="center"
                                justifyContent="space-between"
                                gap="10px"
                                marginTop="1rem"
                            >
                                <FormControl>
                                    <FormLabel>Hora</FormLabel>
                                    <NumberInput max={24} min={0} name="timeHours">
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
                                    <NumberInput max={60} min={0} name="timeMinutes">
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <FormHelperText>Digite de 0 a 60</FormHelperText>
                                </FormControl>
                            </Flex>
                            <FormControl marginTop="1rem">
                                <FormLabel>Anotação</FormLabel>
                                <Textarea name="observation" />
                            </FormControl>
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
        </Container>
    );
};

export { ServicesPage };
