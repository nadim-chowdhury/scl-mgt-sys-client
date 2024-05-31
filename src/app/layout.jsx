import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/lib/apollowrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SCL MGT SYS",
  description: "Generated by create next app, developed by Nadim Chowdhury",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
