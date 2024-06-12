import { FC, useState } from "react";

const NAVManager: FC = () => {
  const [amount, setAmount] = useState<number>(0); // the recipient address

  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdate = async () => {
    setLoading(true);
    setLoading(false);
  };

  return (
    <div className="max-w-[400px] mx-auto">
      <h2 className="text-xl font-bold mb-2">NAV Update</h2>
      <div className="">
        <p>Enter the amount you would like to update.</p>
        <input
          className="border px-2 py-1 w-full"
          name="amount"
          value={amount}
          placeholder="Amount"
          type="text"
          onChange={(e) => setAmount(e.target.value as unknown as number)}
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
