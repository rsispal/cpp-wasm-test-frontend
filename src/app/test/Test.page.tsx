"use client";
import { FC, useCallback, useState } from "react";
import {
  AbsoluteCenter,
  Box,
  Button,
  Code,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
  useClipboard,
  useToast,
} from "@/chakra-ui";
import { useWASM } from "@/hooks/useWasm";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { CPPTestLibrary } from "@rsispal/cpp-wasm-test/dist/cpp-test/types";
import { getBrowserInfo } from "./actions";

const PayloadTable: FC<{ payload: Record<string, string> }> = ({ payload }) => {
  return (
    <TableContainer>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th color="application.global.title">Property</Th>
            <Th color="application.global.title">Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td color="application.global.text">Method Called</Td>
            <Td>
              <Code color="whiteAlpha" lang="sh">
                {payload["method_called"] || "-"}
              </Code>
            </Td>
          </Tr>
          <Tr>
            <Td color="application.global.text">Session ID</Td>
            <Td>
              <Code color="whiteAlpha" lang="sh">
                {payload["sessionId"] || "-"}
              </Code>
            </Td>
          </Tr>
          <Tr>
            <Td color="application.global.text">Date/Time</Td>
            <Td>
              <Code color="whiteAlpha" lang="sh">
                {payload["datetime"] || "-"}
              </Code>
            </Td>
          </Tr>
          <Tr>
            <Td color="application.global.text">Encoded Session Id</Td>
            <Td>
              <Code color="whiteAlpha" lang="sh">
                {payload["encodedSessionId"] || "-"}
              </Code>
            </Td>
          </Tr>
          <Tr>
            <Td color="application.global.text">Decoded Session Id</Td>
            <Td>
              <Code color="whiteAlpha" lang="sh">
                {payload["decodedSessionId"] || "-"}
              </Code>
            </Td>
          </Tr>
          <Tr>
            <Td color="application.global.text">Strategy</Td>
            <Td>
              <Code color="whiteAlpha" lang="sh">
                {payload["strategy"] || "-"}
              </Code>
            </Td>
          </Tr>
          <Tr>
            <Td color="application.global.text">Secret</Td>
            <Td>
              <Code color="whiteAlpha" lang="sh">
                {payload["secret"] || "-"}
              </Code>
            </Td>
          </Tr>
          <Tr>
            <Td color="application.global.text">Iv</Td>
            <Td>
              <Code color="whiteAlpha" lang="sh">
                {payload["iv"] || "-"}
              </Code>
            </Td>
          </Tr>
          <Tr>
            <Td color="application.global.text">Encrypted Session Id</Td>
            <Td>
              <Code color="whiteAlpha" lang="sh">
                {payload["encryptedSessionId"] || "-"}
              </Code>
            </Td>
          </Tr>
          <Tr>
            <Td color="application.global.text">Decrypted Session Id</Td>
            <Td>
              <Code color="whiteAlpha" lang="sh">
                {payload["decryptedSessionId"] || "-"}
              </Code>
            </Td>
          </Tr>
          <Tr>
            <Td color="application.global.text">OS</Td>
            <Td color="application.global.text">
              {payload["osName"] || "-"} {payload["osVersion"] || "-"} (arch {payload["cpuArchitecture"] || "?"})
            </Td>
          </Tr>
          <Tr>
            <Td color="application.global.text">Browser</Td>
            <Td color="application.global.text">
              {payload["browserName"] || "-"} {payload["browserVersion"] || "-"}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export const TestPage: FC = () => {
  const [isLoaded, wasm] = useWASM<CPPTestLibrary>("/node_modules/@rsispal/cpp-wasm-test/dist/cpp-test/binding.js", "CPPTest");
  const [payload, setPayload] = useState<Record<string, string>>({});
  const { setValue, hasCopied } = useClipboard("");
  const toast = useToast();

  const getTestPayload = useCallback(async () => {
    const browserInfo = await getBrowserInfo();

    if (isLoaded && wasm?.CPPTest) {
      const value = wasm.CPPTest.getTestPayload();
      const parsed = JSON.parse(value);
      setPayload({ ...parsed, ...browserInfo });
    }
  }, [isLoaded, wasm]);

  const copyToClipboard = useCallback(async () => {
    if (Object.keys(payload).length) {
      setValue(JSON.stringify(payload));
      await navigator.clipboard.writeText(JSON.stringify(payload));
      toast({
        title: "Value copied",
        description: "Please send this value",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [payload, setValue, toast]);

  return (
    <Flex w="100vw" minH="100vh" bg="application.global.background">
      <AbsoluteCenter>
        <Box bgColor="application.global.foreground" minW="2xl" minH="2xl" maxW="2xl" borderRadius={8} p="8">
          <Heading color="application.global.title">Compatibility Test</Heading>
          <Text color="application.global.text">Please follow the steps below to perform a browser compatibility test:</Text>

          <HStack alignItems="center">
            <Heading size="md" color="application.global.title" marginTop={4} display="inline">
              1. Wait for the library status to show{" "}
            </Heading>
            <Icon as={IoCheckmarkCircleOutline} boxSize={6} color="green" display="inline" />
          </HStack>
          <HStack>
            <VStack>
              <Text color="application.global.text">Library Status:</Text>
            </VStack>
            <VStack>
              {!isLoaded ? (
                <Spinner size="xs" color="application.global.text" />
              ) : (
                <Icon as={IoCheckmarkCircleOutline} boxSize={6} color="green" />
              )}
            </VStack>
          </HStack>
          <Heading size="md" color="application.global.title" marginTop={4} marginBottom={2}>
            2. Hit {'"'}Run Tests{'"'}
          </Heading>
          <Button onClick={getTestPayload} marginBottom={4}>
            Run Tests
          </Button>
          <PayloadTable payload={payload} />

          <Heading size="md" color="application.global.title" marginTop={4} marginBottom={2}>
            3. Press the {'"'}Copy{'"'} button and return this value to support
          </Heading>
          <Box position="relative" w="100%">
            <Button
              position="absolute"
              top={2}
              right={2}
              colorScheme="orange"
              size="xs"
              isDisabled={!Object.keys(payload).length}
              onClick={copyToClipboard}>
              {hasCopied ? "Copied!" : "Copy"}
            </Button>
            <Code color="whiteAlpha" lang="json" w="100%" paddingTop="xs" minH={8}>
              {JSON.stringify(payload || {})}
            </Code>
          </Box>

          <Divider color="application.global.outline" marginY={4} />
          <Heading color="application.global.title">Having trouble?</Heading>
          <Text color="application.global.text">
            Please get in touch, providing your computer make/model, operating system version and web browser version.
          </Text>
        </Box>
      </AbsoluteCenter>
    </Flex>
  );
};
