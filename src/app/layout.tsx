import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
// import styles from './page.module.css';
import { Layout, Flex } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import NavBar from "@/components/NavBar";
import MyFooter from "@/components/MyFooter";
import AuthProvider from "@/providers/AuthProvider";
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
      <AuthProvider>
        <Layout>
          <Header style={{background: "white"}}>
            <NavBar />
          </Header>
          <Layout>
            <Flex>
              <Sider width={"100%"} style={{background: "white"}}>
                <Content>{children}</Content>
              </Sider>
            </Flex>
          </Layout>
          {/* <Footer>footer</Footer> */}
          {/* <MyFooter>footer...123</MyFooter> */}
        </Layout>
      </AuthProvider>
    </body>
    </html>
  );
}
