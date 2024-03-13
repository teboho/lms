import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import { Layout, Flex } from "antd";
import { Header, Content,  } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import Footer from "@/components/MyFooter";
import MyFooter from "@/components/MyFooter";
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
        <Header style={{background: "white"}}>
          <NavBar />
        </Header>
        <Layout>
          <Flex>
          <Sider width={"25%"} style={{background: "green"}}>side...</Sider>
          <Sider width={"75%"} style={{background: "yellow"}}>
            <Content>{children}</Content>
          </Sider>
          </Flex>
        </Layout>
        <MyFooter>footer...</MyFooter>
      </Layout>
    </body>
    </html>
  );
}
