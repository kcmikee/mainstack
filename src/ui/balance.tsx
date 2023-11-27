"use client";
import { info } from "@/constants";
import Image from "next/image";
import React from "react";
import Chart from "./chart/chart";
import { useWalletStore } from "@/store/walletStore";

function Balance() {
  const wallets = useWalletStore((state) => state.wallets);
  const [balances, setBalances] = React.useState([]);
  const [hydrate, setHydrate] = React.useState(true);
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
  React.useEffect(() => {
    setHydrate(false);
  }, []);
  if (hydrate) return <></>;
  return (
    <div className="mt-16 flex gap-[124px]">
      <div className="w-full">
        <div className="flex items-center gap-16">
          <div className="">
            <p>Available Balance</p>
            <h1 className="text-h1 font-bold">USD {wallets?.balance || 0}</h1>
          </div>
          <button className="rounded-full bg-black px-7 py-3.5 text-white">
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

export default Balance;

function SideBalance({ data }: { data: { title: string; amount: string } }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-gray400">{data.title}</h3>
        <Image src={info} alt={`information`} width={20} height={20} />
      </div>
      <div className="mt-2 text-h2 font-black text-black">{data.amount}</div>
    </div>
  );
}
