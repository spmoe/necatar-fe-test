import type { NextPage } from "next";
import Layouts from "../components/layouts";
import TokenMinter from "../components/TokenMinter";
import TokenBalance from "../components/TokenBalance";
import NAVManager from "../components/NAVManager";

const Home: NextPage = () => {
  return (
    <Layouts>
      <div className="w-full px-4 sm:max-w-[400px] sm:mx-auto py-10">
        <TokenMinter />
        <TokenBalance />
        <NAVManager />
      </div>
    </Layouts>
  );
};

export default Home;
