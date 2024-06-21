import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";

import { CustomerHistory } from "../../components/CustomerHistory";

import { Container, Flex, Heading, Button, FormControl, FormLabel, Input, Select, useToast } from "@chakra-ui/react";

interface CustomerInterface {
    id: number;
    name: string;
    phone: string;
    email: string;
    cpf: string;
    gender: string;
    createdAt: string;
    updatedAt: string;
}

const initCustomer = {
    id: 0,
    name: "",
    phone: "",
    email: "",
    cpf: "",
    gender: "",
    createdAt: "",
    updatedAt: "",
};

export const CustomerSinglePage = () => {
    const { id } = useParams();

    const [customer, setCustomer] = useState<CustomerInterface>(initCustomer);
    const [editAllowed, setEditAllowed] = useState(false);

    const toast = useToast();

    async function GetCustomerInfo() {
        api.get(`/customer?id=${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((response) => {
                let dataJson = response.data;
                setCustomer(dataJson);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function SaveCustomerInfo() {
        const saveInfoPromise = new Promise((resolve, reject) => {
            api.patch(
                "/customers",
                {
                    id: customer.id,
                    data: {
                        name: customer.name,
                        phone: customer.phone,
                        email: customer.email,
                        cpf: customer.cpf,
                        gender: customer.gender,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            )
                .then((response) => {
                    resolve("success");
                })
                .catch((error) => {
                    resolve(error);
                });
        });

        toast.promise(saveInfoPromise, {
            success: {
                title: "Informações atualizadas!",
                description: "As informações do cliente foram atualizadas.",
            },
            error: {
                title: "Erro!",
                description: "Houve um erro ao tentar atualizar o registro. Tente novamente.",
            },
            loading: { title: "Salvando...", description: "Aguarde." },
        });
    }

    useEffect(() => {
        GetCustomerInfo();
    }, []);

    return (
        <Container maxW="1140px" backgroundColor="white" paddingBottom="4rem">
            <Flex flexDirection={["column", "row"]} paddingTop="3rem" marginBottom="4rem" alignItems={{ base: "flex-start", lg: "center" }} justifyContent="space-between">
                <Heading as="h1">Visualizar cliente: {customer ? customer.name : ""}</Heading>
                <Button
                    marginTop={{ base: "2rem", lg: "0" }}
                    borderRadius={5}
                    backgroundColor="primary"
                    color="white"
                    _hover={{ backgroundColor: "primaryHover" }}
                    onClick={() => {
                        setEditAllowed(!editAllowed);
                    }}
                >
                    {!editAllowed ? "Liberar edição" : "Bloquear edição"}
                </Button>
            </Flex>

            <form
                onSubmit={(Event) => {
                    Event.preventDefault();
                }}
                style={{ marginBottom: "4rem" }}
            >
                <FormControl>
                    <FormLabel>Nome</FormLabel>
                    <Input
                        type="text"
                        name="name"
                        onChange={(e) => {
                            setCustomer({ ...customer, name: e.target.value });
                        }}
                        value={customer.name}
                        disabled={editAllowed ? false : true}
                        backgroundColor="white"
                    />
                </FormControl>
                <FormControl marginTop="1rem">
                    <FormLabel>Telefone</FormLabel>
                    <Input
                        type="text"
                        name="phone"
                        onChange={(e) => {
                            setCustomer({ ...customer, phone: e.target.value });
                        }}
                        value={customer.phone}
                        disabled={editAllowed ? false : true}
                    />
                </FormControl>
                <FormControl marginTop="1rem">
                    <FormLabel>E-mail</FormLabel>
                    <Input
                        type="email"
                        name="email"
                        onChange={(e) => {
                            setCustomer({ ...customer, email: e.target.value });
                        }}
                        value={customer.email}
                        disabled={editAllowed ? false : true}
                    />
                </FormControl>
                <FormControl marginTop="1rem">
                    <FormLabel>CPF</FormLabel>
                    <Input
                        type="text"
                        name="cpf"
                        onChange={(e) => {
                            setCustomer({ ...customer, cpf: e.target.value });
                        }}
                        value={customer.cpf}
                        disabled={editAllowed ? false : true}
                    />
                </FormControl>
                <FormControl marginTop="1rem">
                    <FormLabel>Gênero</FormLabel>
                    <Select
                        name="gender"
                        placeholder="selecione uma opção"
                        onChange={(e) => {
                            setCustomer({ ...customer, gender: e.target.value });
                        }}
                        value={customer.gender}
                        disabled={editAllowed ? false : true}
                    >
                        <option value="feminino">Feminino</option>
                        <option value="masculino">Masculino</option>
                    </Select>
                </FormControl>
                <Button
                    marginTop="1rem"
                    borderRadius={5}
                    backgroundColor="primary"
                    color="white"
                    _hover={{ backgroundColor: "primaryHover" }}
                    onClick={SaveCustomerInfo}
                    disabled={editAllowed ? false : true}
                >
                    Salvar
                </Button>
            </form>

            <CustomerHistory />
        </Container>
    );
};
