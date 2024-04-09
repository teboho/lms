import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
// import styles from './page.module.css';
import { Layout, Flex, ConfigProvider } from "antd";
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
import CommunicationProvider from "@/providers/communicationProvider";

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
      <ConfigProvider direction="ltr"
        theme={{
          token: {
            colorPrimary: "#004AAD",    
          },
        }}
      >
        <AuthProvider>
          <CategoryProvider>
            <BookProvider>
              <AuthorsProvider>
                <Layout>
                  <Header style={{background: "#d0e1e1"}}>
                    <NavBar />
                  </Header>
                  <Layout>
                    <Flex>
                        <CommunicationProvider>
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
                        </CommunicationProvider>
                    </Flex>
                  </Layout>
                </Layout>
              </AuthorsProvider>
            </BookProvider>
          </CategoryProvider>
        </AuthProvider>
      </ConfigProvider>
    </body>
    </html>
  );
}
