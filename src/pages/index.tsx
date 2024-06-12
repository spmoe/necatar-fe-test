import type { NextPage } from "next";
import Layouts from "../components/layouts";
import TokenMinter from "../components/TokenMinter";
import TokenBalance from "../components/TokenBalance";
import NAVManager from "../components/NAVManager";

const Home: NextPage = () => {
  return (
    <Layouts>
      <div className="py-10">
        <TokenMinter />
        <TokenBalance />
        <NAVManager />
      </div>
    </Layouts>
  );
};

export default Home;
