import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { FC } from "react";
import { TITLE } from "../../config";

const Header: FC = () => {
  return (
    <header>
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="">
          <Link href={"/"}>
            <div className="uppercase text-xl font-bold hidden sm:block">
              {TITLE}
            </div>
          </Link>
        </div>
        <div className="">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
