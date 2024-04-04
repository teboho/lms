
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
// import styles from './page.module.css';
import { Layout, Flex } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import AuthProvider from "@/providers/authProvider";
import CategoryProvider from "@/providers/categoryProvider";
import BookProvider from "@/providers/bookProvider";
import AuthorsProvider from "@/providers/authorsProvider";
import NavBar from "@/components/navBar";
import InventoryProvider from "@/providers/inventoryProvider";
import LoanProvider from "@/providers/loanProvider";
import HistoryProvider from "@/providers/historyProvider";
import PreferenceProvider from "@/providers/preferenceProvider";

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
          <AuthorsProvider>
            <Layout>
              <Header style={{background: "white"}}>
                <NavBar />
              </Header>
              <Layout>
                <Flex>
                    <InventoryProvider>
                      <LoanProvider>
                        <HistoryProvider>
                        <PreferenceProvider>
                              <Content>
                                {children}
                              </Content>                  
                        </PreferenceProvider>
                        </HistoryProvider>
                      </LoanProvider>
                    </InventoryProvider>
                </Flex>
              </Layout>
            </Layout>
          </AuthorsProvider>
          </BookProvider>
        </CategoryProvider>
      </AuthProvider>
    </body>
    </html>
  );
}
