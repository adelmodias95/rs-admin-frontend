import { useState, useEffect } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";

import { Flex, Heading, Input, Button, InputGroup, Stack, InputLeftElement, chakra, Box, Link, Avatar, FormControl, FormHelperText, InputRightElement } from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

// Services
import { useAuthStore } from "../../stores/authStore";
import { login } from "../../services/services";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export async function action({ request }) {
    document.querySelector(".alert-error").innerHTML = "";
    document.querySelector(".alert-error").classList.remove("active");

    try {
        let formData = await request.formData();
        // const type = formData.get("type");
        const email = formData.get("email");
        const password = formData.get("password");
        // const response = type === "register" ? await register({ email, password }) : await login({ email, password });
        const response = await login({ email, password });
        const { accessToken, refreshToken } = response.data;
        return { tokens: { accessToken, refreshToken }, error: null };
    } catch (error) {
        document.querySelector(".alert-error").innerHTML = error.response.data.message;
        document.querySelector(".alert-error").classList.add("active");

        return {
            error: error?.response?.data?.message || error.message,
            tokens: null,
        };
    }
}

export function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    // Login
    const actionData = useActionData();
    const navigate = useNavigate();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
    const login = useAuthStore((state) => state.login);
    useEffect(() => {
        if (actionData?.tokens) {
            login(actionData.tokens);
            navigate("/");
        }
        // }, [actionData]);
    });

    if (isLoggedIn) {
        navigate("/");
    }

    return (
        <Flex flexDirection="column" width="100wh" height="100vh" backgroundColor="gray.200" justifyContent="center" alignItems="center">
            <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
                <Avatar bg="primary" />
                <Heading color="titleColor" mb="2rem">
                    Faça Login
                </Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <Form method="post">
                        <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
                                    <Input type="email" name="email" placeholder="email address" />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none" color="gray.300" children={<CFaLock color="gray.300" />} />
                                    <Input type={showPassword ? "text" : "password"} name="password" placeholder="Password" />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <small className="alert-error"></small>
                            <Button borderRadius={5} type="submit" variant="solid" backgroundColor="primary" textColor="white" _hover={{ backgroundColor: "primaryHover" }} width="full">
                                Login
                            </Button>
                        </Stack>
                    </Form>
                </Box>
            </Stack>
        </Flex>
    );
}
