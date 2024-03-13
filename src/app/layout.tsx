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
  description: "Manage your library the modern way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
      <Layout>
        <Header>
          <NavBar />
        </Header>
        <Layout>
          <Sider width={"25%"} style={{background: "red"}}>side...</Sider>
          <Content>{children}</Content>
        </Layout>
        <Footer>footer...</Footer>
      </Layout>
    </body>
    </html>
  );
}
