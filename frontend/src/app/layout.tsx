
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
import BookProvider from "@/providers/BookProvider";
import CategoryProvider from "@/providers/CategoryProvider";
import InventoryProvider from "@/providers/InventoryProvider";
import LoanProvider from "@/providers/LoanProvider";

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
        <CategoryProvider>
          <BookProvider>
            <Layout>
              <Header style={{background: "white"}}>
                <NavBar />
              </Header>
              <Layout>
                <Flex>
                    <InventoryProvider>
                      <LoanProvider>
                          <Sider width={"100%"} style={{background: "white"}}>
                            <Content>
                              {children}
                            </Content>
                          </Sider>                     
                      </LoanProvider>
                    </InventoryProvider>
                </Flex>
              </Layout>
            </Layout>
          </BookProvider>
        </CategoryProvider>
      </AuthProvider>
    </body>
    </html>
  );
}
