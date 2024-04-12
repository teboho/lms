import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import styles from './page.module.css';
import { App, Layout, Flex, ConfigProvider } from "antd";
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
import StoredFileProvider from "@/providers/storedFileProvider";

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
      <App>
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
                  <CommunicationProvider>
                    <InventoryProvider>
                      <LoanProvider>
                        <HistoryProvider>
                          <PreferenceProvider>
                              <StoredFileProvider>
                                <Layout>
                                  <Header style={{position: "sticky", width: "100%" , top: 0, zIndex: 1000, background: "#d0e1e1"}}>
                                    <NavBar />
                                  </Header>
                                  <Layout>
                                    <Flex>
                                      <Content>
                                        {children}
                                      </Content>
                                    </Flex>
                                  </Layout>
                                </Layout>
                            </StoredFileProvider>            
                          </PreferenceProvider>
                        </HistoryProvider>
                      </LoanProvider>
                    </InventoryProvider>
                  </CommunicationProvider>
                </AuthorsProvider>
              </BookProvider>
            </CategoryProvider>
          </AuthProvider>
        </ConfigProvider>
      </App>
    </body>
    </html>
  );
}
