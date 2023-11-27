import React, { useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { HiOutlineDownload } from "react-icons/hi";
import { GoArrowUpRight, GoArrowDownLeft } from "react-icons/go";
import { useAppStore } from "@/store/appStore";
import { useTransactionStore } from "@/store/transactionStore";

function Transactions() {
  const [hydrate, setHydrate] = React.useState(true);
  const isFilterOpen = useAppStore(
    (state: { isFilterOpen: Boolean }) => state.isFilterOpen,
  );
  const transactions = useTransactionStore(
    (state: { transactions: [] }) => state.transactions,
  );
  const setIsFilterOpen = useAppStore(
    (state: { setIsFilterOpen: Function }) => state.setIsFilterOpen,
  );

  useEffect(() => {
    setHydrate(false);
  }, []);
  if (hydrate) return <></>;
  return (
    <div className="mt-20  border-gray50">
      <div className="flex items-center justify-between border-b pb-5">
        <div>
          <h4 className="text-h3 font-bold">
            {transactions?.length} Transactions
          </h4>
          <p className="text-sm text-gray400">
            Your transactions for the last 7 days
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 rounded-full bg-gray100 py-3 pl-8 pr-5 font-semibold"
          >
            Filter
            <FiChevronDown color="#131313" />
          </button>
          <button className="flex items-center gap-2 rounded-full bg-gray100 py-3 pl-8 pr-5 font-semibold">
            Export list
            <HiOutlineDownload color="#131313" />
          </button>
        </div>
      </div>
      <div className="max-h-[550px] space-y-6 overflow-scroll pt-8">
        {transactions.map((trans, i) => (
          <TransactionsDetail key={i} data={trans} />
        ))}
      </div>
    </div>
  );
}

export default Transactions;

function TransactionsDetail({ data }) {
  return (
    <div className="flex h-12 items-center justify-between">
      <div className="flex gap-3.5">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${
            data?.type !== "withdrawal" ? "bg-jade100" : "bg-red"
          }`}
        >
          {data?.type === "withdrawal" ? (
            <GoArrowUpRight size={20} color={"#961100"} />
          ) : (
            <GoArrowDownLeft size={20} color={"#075132"} />
          )}
        </div>
        <div>
          <p className="text-base font-medium">
            {data?.type === "withdrawal"
              ? data?.metadata?.name || "Cash withdrawal"
              : data?.metadata?.product_name || "Cash Deposit"}
          </p>
          <p
            className={`text-sm font-normal  ${
              data?.type === "withdrawal" && data?.status === "successful"
                ? "text-green-500"
                : data?.type === "withdrawal" && data?.status === "pending"
                  ? "text-yellow-600"
                  : "text-gray400"
            }`}
          >
            {data?.type === "withdrawal"
              ? data?.status
              : data?.metadata?.name ?? ""}
          </p>
        </div>
      </div>
      <div>
        <p className="text-base font-bold">USD {data?.amount}</p>
        <p className="text-sm font-normal text-gray400">
          {data?.date && new Date(data?.date).toDateString()}
        </p>
      </div>
    </div>
  );
}