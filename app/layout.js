import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./utility/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "QNotes",
  description: "Generated by create next app",
};

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
      <AuthContextProvider>{children}</AuthContextProvider>;
      </body>
    </html>
  );
};

export default Layout;