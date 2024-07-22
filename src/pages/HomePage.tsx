import { Link as ReactRouterLink } from "react-router-dom";
import { Container, Flex, Heading, Text, Link as ChakraLink, LinkProps } from "@chakra-ui/react";

export function HomePage() {
    return (
        <Container maxW="1140px" minH="100vh" backgroundColor="white" paddingBottom="4rem">
            <Flex flexDirection={["row", "column"]} paddingTop="3rem" marginBottom="4rem" alignItems={{ base: "flex-start", lg: "center" }} justifyContent="space-between">
                <Heading as="h1" mb={"1.5rem"}>
                    Seja bem-vinda, Ronilda.
                </Heading>
                <Text mb="1rem">
                    <ChakraLink as={ReactRouterLink} color="primary" to="/servicos">
                        Clique aqui
                    </ChakraLink>{" "}
                    para visualizar os serviços.
                </Text>
                <Text mb="1rem">
                    <ChakraLink as={ReactRouterLink} color="primary" to="/clientes">
                        Clique aqui
                    </ChakraLink>{" "}
                    para visualizar os clientes.
                </Text>
            </Flex>
        </Container>
    );
}
