import { Flex } from "antd";
import Image from "next/image";

export default function Loading() {
    return (
        <>
          <Flex align="center" justify="center" style={{background: "#d0e1e1"}}>
              <Image src={"/assets/images/book-op.gif"} alt="book" width={350} height={350} />
          </Flex>
        </>
    );
}