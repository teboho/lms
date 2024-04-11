"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Flex, Button, Typography } from "antd";
import Link from "next/link";
import { useContext } from "react";
import AuthContext from "@/providers/authProvider/context";
import { redirect } from "next/navigation";

const { Paragraph } = Typography;

export default function Welcome() {    
  const {isLoggedIn, getUserInfo, getUserId } = useContext(AuthContext);

  if (isLoggedIn()) {
    getUserInfo(getUserId());
    redirect("/home");
  }
  
  return (
    <main className={styles.main}>
          <Flex align="center" style={{background: "#d0e1e1"}}>
              <Image src={"/assets/images/book-op.gif"} alt="book" width={350} height={350} />
              <Flex align="center" vertical justify="center" gap={100}>
                <div>
                  <Image src={"/assets/images/LMS-logo1.svg"} alt="snow time" width={350} height={350} />
                  <Paragraph style={{textAlign: "center"}}>Manage your library the modern way</Paragraph>
                </div>
                <Flex gap={50}>
                  <div>
                    <Link href={"/login"}><Button>Login</Button></Link>
                  </div>
                  {" "}
                  <div>
                    <Link href={"/register"}><Button>Register</Button></Link>
                  </div>
                </Flex>
              </Flex>
          </Flex>
    </main>
  );
}
