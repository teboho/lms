import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import { Layout, Flex } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "savvyshelf",
  description: "Web application to manage your library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout>
      <Header>
        <NavBar />
      </Header>
      <Layout>
        <Sider width={"25%"}>side...</Sider>
        <Content>{children}</Content>
      </Layout>
      <Footer>footer...</Footer>
    </Layout>
  );
}
