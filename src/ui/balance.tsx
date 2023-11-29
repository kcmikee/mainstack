import { info } from "@/constants";
import Image from "next/image";
import React from "react";
import Chart from "./chart/chart";
import { useWalletStore } from "@/store/walletStore";
import dynamic from "next/dynamic";

function Balance() {
  const wallets = useWalletStore((state) => state.wallets);
  const [balances, setBalances] = React.useState([]);

  React.useEffect(() => {
    if (wallets?.ledger_balance) {
      const data = [
        {
          title: "Ledger Balance",
          amount: `USD ${wallets?.ledger_balance || ""}`,
        },
        { title: "Total Balance", amount: `USD ${wallets?.balance || ""}` },
        {
          title: "Total Revenue",
          amount: `USD ${wallets?.total_revenue || ""}`,
        },
        {
          title: "Pending Payout",
          amount: `USD ${wallets?.pending_payout || "0"}`,
        },
      ];
      setBalances(data);
    }

    return () => {
      setBalances([]);
    };
  }, [wallets]);

  return (
    <div className="mt-16 flex gap-[124px]">
      <div className="w-full">
        <div className="flex h-[52px] gap-16">
          <div className="">
            <p>Available Balance</p>
            <h1 className="text-h1 font-semibold">
              USD {wallets?.balance || 0}
            </h1>
          </div>
          <button className="h-[52px] w-[167px] rounded-full bg-black text-white">
            Withdraw
          </button>
        </div>
        <Chart />
      </div>
      <div className="w-[16.9375rem] shrink-0 space-y-8">
        {balances.map((bal, i) => (
          <SideBalance key={i} data={bal} />
        ))}
      </div>
    </div>
  );
}
export default dynamic(() => Promise.resolve(Balance), { ssr: false });

function SideBalance({ data }: { data: { title: string; amount: string } }) {
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-sm text-gray400">{data.title}</h3>
        <Image src={info} alt={`information`} width={20} height={20} />
      </div>
      <div className="mt-1 text-h2 font-semibold text-black">{data.amount}</div>
    </div>
  );
}
