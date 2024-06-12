import { FC, useEffect, useState } from "react";
import { useReadContract, useWriteContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../contracts/constants";
import { toast } from "react-toastify";

const NAVManager: FC = () => {
  const [newNav, setNewNav] = useState<number>(0); // the recipient address
  const [currentNav, setCurrentNav] = useState<number | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const { writeContractAsync } = useWriteContract();

  const {
    data: navData,
    refetch,
    isPending,
  } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "nav",
  });

  useEffect(() => {
    if (navData) {
      const num = Number((navData as any) / BigInt(10 ** 18));
      setCurrentNav(num);
    }
  }, [navData]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await writeContractAsync({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "updateNAV",
        args: [BigInt(newNav * 10 ** 18)],
      });
      await refetch();
      toast.success("Update successful!");
    } catch (error) {
      console.log(error);
      if (JSON.stringify(error).indexOf("UserRejectedRequestError") === -1) {
        toast.error("Something went wrong. Please try again");
      }
    }
    setLoading(false);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mb-2">NAV Update</h2>
        {currentNav && (
          <p>
            Current:{" "}
            {isPending ? (
              <div className="w-10 h-3 bg-black/20 rounded-lg" />
            ) : (
              <span className="font-bold">{currentNav}</span>
            )}
          </p>
        )}
      </div>
      <div className="">
        <p>Enter the amount you would like to update.</p>
        <input
          className="border px-2 py-1 w-full"
          name="amount"
          value={newNav}
          placeholder="Amount"
          type="text"
          onChange={(e) => setNewNav(e.target.value as unknown as number)}
        />
      </div>
      <button
        className="w-full mt-5 bg-black text-white h-10 disabled:opacity-70 hover:bg-black/80 disabled:pointer-events-none"
        disabled={loading}
        onClick={handleUpdate}
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  );
};

export default NAVManager;
