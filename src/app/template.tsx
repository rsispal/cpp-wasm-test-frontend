"use client";
import "./globals.css";
import { Flex } from "@chakra-ui/react";

export default function RootTemplate({ children }: { children: React.ReactNode }) {
  return (
    <Flex w="100vw" h="100vh" flex={1} flexDir="column">
      {children}
    </Flex>
  );
}
