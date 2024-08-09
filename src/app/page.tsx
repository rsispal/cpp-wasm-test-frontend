"use client";
import { Flex, Spinner } from "@/chakra-ui";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RootPage = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => router.replace("/test"), 3000);
  }, [router]);

  return (
    <Flex alignItems="center" justifyContent="center" w="100vw" minH="100vh" bg="application.global.background">
      <Spinner size="xl" color="application.global.title" />
    </Flex>
  );
};
export default RootPage;
