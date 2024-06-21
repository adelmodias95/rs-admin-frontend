import React from "react";
import { useState, useEffect } from "react";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";

import api from "../../services/api";

import {
    Box,
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
    Select,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const CustomersPage = () => {
    let [customers, setCustomers] = useState([]);

    let [customerToDelete, setCustomerToDelete] = useState(0);

    const navigate = useNavigate();

    // Modal Add
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    // Modal delete
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
    const cancelRef = React.useRef();

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
        // let email = event.target.email.value;
        // let cpf = event.target.cpf.value;
        // let gender = event.target.gender.value;
        let userId = 1;

        const addPromise = new Promise((resolve, reject) => {
            api.post(
                "customers",
                {
                    name,
                    phone,
                    // email,
                    // cpf,
                    // gender,
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

                    onClose();

                    resolve(resJson);
                })
                .catch((error) => {
                    console.log(error);
                });
        });

        toast.promise(addPromise, {
            success: {
                title: "Cliente adicionado!",
                description: "Você já pode visualiza-lo na lista de clientes.",
            },
            error: {
                title: "Erro!",
                description: "Houve um erro ao tentar adicionar o cliente. Tente novamente.",
            },
            loading: { title: "Salvando...", description: "Aguarde." },
        });
    }

    async function deleteCustomer() {
        let customerId = customerToDelete;

        const deletePromise = new Promise((resolve, reject) => {
            api.delete("customers", {
                data: { id: customerId },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
                .then(() => {
                    let customersArr = [...customers];
                    let newCustomersArr = customersArr.filter((item) => item.id !== Number(customerId));

                    setCustomers(newCustomersArr);

                    onCloseDelete();

                    resolve(newCustomersArr);
                })
                .catch((error) => {
                    console.log(error);
                });
        });

        toast.promise(deletePromise, {
            success: {
                title: "Cliente deletado!",
                description: "O cliente selecionado foi deletado do sistema.",
            },
            error: {
                title: "Erro!",
                description: "Houve um erro ao tentar deletar o cliente. Tente novamente.",
            },
            loading: { title: "Deletando...", description: "Aguarde." },
        });
    }

    useEffect(() => {
        getCustomers();
    }, []);

    return (
        <Container maxW="1140px" minH="100vh" backgroundColor="white" paddingBottom="4rem">
            <Flex flexDirection={["column", "row"]} paddingTop="3rem" marginBottom="4rem" alignItems={{ base: "flex-start", lg: "center" }} justifyContent="space-between">
                <Heading as="h1">Meus Clientes</Heading>
                <Button marginTop={{ base: "2rem", lg: "0" }} borderRadius={5} backgroundColor="primary" color="white" _hover={{ backgroundColor: "primaryHover" }} onClick={onOpen}>
                    Adicionar cliente
                </Button>
            </Flex>

            <Box overflowX="auto">
                <Table>
                    <Thead backgroundColor="primary">
                        <Tr>
                            <Th color="white">ID</Th>
                            <Th color="white">Nome</Th>
                            <Th color="white">Celular</Th>
                            <Th color="white">E-mail</Th>
                            <Th color="white">Cadastro</Th>
                            <Th color="white" textAlign="center">
                                Ações
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {customers.map((customer) => (
                            <Tr key={customer.id}>
                                <Td style={{ textAlign: "center" }}>{customer.id}</Td>
                                <Td>{customer.name}</Td>
                                <Td>{customer.phone ? customer.phone : "Não informado"}</Td>
                                <Td>{customer.email ? customer.email : "Não informado"}</Td>
                                <Td>{new Intl.DateTimeFormat("pt-BR").format(new Date(customer.createdAt))}</Td>
                                <Td textAlign="center">
                                    <Button
                                        backgroundColor="transparent"
                                        title="Visualizar cadastro completo"
                                        onClick={() => {
                                            navigate(`/clientes/${customer.id}`);
                                        }}
                                    >
                                        <FaEye />
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
            </Box>

            {/* Remover */}
            <AlertDialog isOpen={isOpenDelete} leastDestructiveRef={cancelRef} onClose={onCloseDelete}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Deletar serviço
                        </AlertDialogHeader>

                        <AlertDialogBody>Tem certeza? Você não pode desfazer esta ação posteriormente.</AlertDialogBody>

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
                                <FormLabel>Nome</FormLabel>
                                <Input type="text" name="name" />
                            </FormControl>
                            <FormControl marginTop="1rem">
                                <FormLabel>Telefone / Celular</FormLabel>
                                <Input type="text" name="phone" />
                            </FormControl>
                            {/* <FormControl marginTop="1rem">
                                <FormLabel>E-mail</FormLabel>
                                <Input type="email" name="email" />
                            </FormControl>
                            <FormControl marginTop="1rem">
                                <FormLabel>CPF</FormLabel>
                                <Input type="text" name="cpf" />
                            </FormControl>
                            <FormControl marginTop="1rem">
                                <FormLabel>Gênero</FormLabel>
                                <Select name="gender" placeholder="selecione uma opção">
                                    <option value="feminino">Feminino</option>
                                    <option value="masculino">Masculino</option>
                                </Select>
                            </FormControl> */}
                            <Button marginTop="1rem" borderRadius={5} backgroundColor="primary" color="white" _hover={{ backgroundColor: "primaryHover" }} type="submit">
                                Salvar
                            </Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* <ReactModal
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
            </ReactModal> */}
        </Container>
    );
};

export { CustomersPage };
