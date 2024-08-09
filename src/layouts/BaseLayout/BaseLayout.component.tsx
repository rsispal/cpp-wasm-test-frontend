"use client";
import { Box, chakra } from "@chakra-ui/react";
import Head from "next/head";
import { FC } from "react";
import { APPLICATION_NAME } from "../../constants/global";
import { BaseLayoutProps } from "./BaseLayout.types";

const Container = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "100vw",
    height: "100vh",
    backgroundColor: "application.global.background",
    overflow: "auto",
    margin: 0,
    padding: 0,
  },
});

export const BaseLayout: FC<BaseLayoutProps> = ({ title, description, children }) => (
  <Container>
    <Head>
      <title>{`${title} :: ${APPLICATION_NAME}`}</title>
      {description && <meta name="description" content={description} />}
    </Head>
    {children}
  </Container>
);
