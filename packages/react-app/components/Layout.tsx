import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="bg-white overflow-hidden flex flex-col w-full min-h-screen">
        <Header />
        <div className=" flex flex-row w-full bg-gray-200 md:p-10">
          <div className="py-16 space-y-8 sm:px-6 lg:px-8">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
