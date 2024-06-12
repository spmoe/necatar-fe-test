import { FC, ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children?: ReactNode;
}

const Layouts: FC<LayoutProps> = ({ children }) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};

export default Layouts;
