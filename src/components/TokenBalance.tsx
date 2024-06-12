import { FC, useMemo, useState } from "react";
import { useReadContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../contracts/constants";

const TokenBalance: FC = () => {
  const [wallet, setWallet] = useState<string>(""); // the recipient address

  const { isRefetching, data: balanceOfWallet } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "balanceOf",
    args: [wallet],
  });

  const bal = useMemo(() => {
    if (balanceOfWallet) {
      const num = Number((balanceOfWallet as any) / BigInt(10 ** 18));
      return num;
    } else {
      return undefined;
    }
  }, [balanceOfWallet]);

  return (
    <div className="pb-10">
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
      {isRefetching ? (
        <p className="text-lg mt-3">Fetching...</p>
      ) : (
        <>{bal && <p className="text-lg mt-3">{`Balance: ${bal}`} </p>}</>
      )}
    </div>
  );
};

export default TokenBalance;
