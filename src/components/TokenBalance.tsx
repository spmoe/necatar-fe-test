import { FC, useState } from "react";

const TokenBalance: FC = () => {
  const [wallet, setWallet] = useState<string>(""); // the recipient address
  const [balance, setBalance] = useState<number | undefined>();

  const [loading, setLoading] = useState<boolean>(false);

  const getBalanceOfWallet = async () => {
    setLoading(true);
    setLoading(false);
  };

  return (
    <div className="max-w-[400px] mx-auto pb-10">
      <h2 className="text-xl font-bold mb-2">Get Balance of Wallet</h2>
      <div className="">
        <input
          className="border px-2 py-1 w-full"
          name="wallet"
          value={wallet}
          placeholder="Enter of paste recipient address"
          type="text"
          onChange={(e) => setWallet(e.target.value)}
        />
      </div>
      {balance && (
        <p className="text-xl mt-3">{`Balance of ${wallet}: ${balance}`} </p>
      )}
      <button
        className="w-full mt-5 bg-black text-white h-10 disabled:opacity-70 hover:bg-black/80 disabled:pointer-events-none"
        disabled={loading}
        onClick={getBalanceOfWallet}
      >
        {loading ? "Fetching..." : "Get Balance"}
      </button>
    </div>
  );
};

export default TokenBalance;
