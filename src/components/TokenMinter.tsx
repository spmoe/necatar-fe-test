import { FC, useState } from "react";

const TokenMinter: FC = () => {
  const [amount, setAmount] = useState<number>(0); // the number of tokens to mint
  const [recipient, setRecipient] = useState<string>(""); // the recipient address

  const [loading, setLoading] = useState<boolean>(false);

  const handleMint = async () => {
    setLoading(true);
    setLoading(false);
  };

  return (
    <div className="max-w-[400px] mx-auto py-20">
      <h2 className="text-xl font-bold mb-2">Token Mint</h2>
      <div className="w-full mb-4">
        <label className="text-sm uppercase">Token amount</label>
        <input
          className="border px-2 py-1 w-full"
          name="amount"
          value={amount}
          placeholder="Token amount"
          type="number"
          min={0}
          onChange={(e) => setAmount(e.target.value as unknown as number)}
        />
      </div>
      <div className="">
        <label className="text-sm uppercase">Recipient Address</label>
        <input
          className="border px-2 py-1 w-full"
          name="wallet"
          value={recipient}
          placeholder="Enter of paste recipient address"
          type="text"
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>
      <button
        className="w-full mt-5 bg-black text-white h-10 disabled:opacity-70 hover:bg-black/80 disabled:pointer-events-none"
        disabled={loading}
        onClick={handleMint}
      >
        {loading ? "Minting..." : "Mint"}
      </button>
    </div>
  );
};

export default TokenMinter;
