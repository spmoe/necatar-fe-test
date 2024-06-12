import { FC, useState } from "react";
import { useWriteContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../contracts/constants";
import { toast } from "react-toastify";

const TokenMinter: FC = () => {
  const [amount, setAmount] = useState<number>(0); // the number of tokens to mint
  const [recipient, setRecipient] = useState<string>(""); // the recipient address

  const { writeContractAsync } = useWriteContract();

  const [loading, setLoading] = useState<boolean>(false);

  const handleMint = async () => {
    if (recipient === "") {
      toast.error("Enter wallet address");
      return;
    }
    if (amount <= 0) {
      toast.error("Invalid amount");
      return;
    }
    setLoading(true);
    try {
      await writeContractAsync({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "mint",
        args: [recipient, BigInt(amount * 10 ** 18)],
      });
      toast.success("Mint successful!");
      setAmount(0);
      setRecipient("");
    } catch (error) {
      console.log(error);
      if (JSON.stringify(error).indexOf("UserRejectedRequestError") === -1) {
        toast.error("Something went wrong. Please try again");
      }
    }
    setLoading(false);
  };

  return (
    <div className="py-20">
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
