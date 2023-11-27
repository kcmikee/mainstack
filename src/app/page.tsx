"use client";
import { useGetTransactions } from "@/store/actions/transactionActions";
import { useGetUsers } from "@/store/actions/userAction";
import { useGetWallets } from "@/store/actions/walletAction";
import { useAppStore } from "@/store/appStore";
import { useTransactionStore } from "@/store/transactionStore";
import { useUserStore } from "@/store/userStore";
import { useWalletStore } from "@/store/walletStore";
import Balance from "@/ui/balance";
import Filter from "@/ui/filter/Filter";
import NavBar from "@/ui/nav";
import SideOptions from "@/ui/sideOptions";
import Transactions from "@/ui/transactions";
import { useEffect } from "react";

export default function Home() {
  const setLoader = useTransactionStore((state) => state.setLoader);
  const setTransactions = useTransactionStore((state) => state.setTransactions);
  const setFilteredTransactions = useAppStore(
    (state) => state.setFilteredTransactions,
  );
  const setWalletLoader = useWalletStore((state) => state.setWalletLoader);
  const setWallets = useWalletStore((state) => state.setWallets);

  const setUsers = useUserStore((state) => state.setUsers);
  const setUserLoader = useUserStore((state) => state.setUserLoader);

  const setFilterValues = useAppStore(
    (state: { setFilterValues: Function }) => state.setFilterValues,
  );

  const { GetTransactions } = useGetTransactions();
  const { GetWallets } = useGetWallets();
  const { GetUsers } = useGetUsers();

  useEffect(() => {
    function CallData() {
      GetTransactions({
        onComplete: (_: any, data: any) => {
          setTransactions(data);
          setFilteredTransactions(data);
        },
        setLoader,
      });
      GetWallets({
        onComplete: (_: any, data: any) => {
          setWallets(data);
        },
        setLoader: setWalletLoader,
      });
      GetUsers({
        onComplete: (_: any, data: any) => {
          setUsers(data);
        },
        setLoader: setUserLoader,
      });
    }
    CallData();
    setFilterValues({});
  }, []);
  return (
    <main className="relative min-h-screen w-screen p-4">
      <NavBar />
      <div className="flex">
        <SideOptions />
        <div className="mx-auto  w-5/6">
          <Balance />
          <Transactions />
        </div>
      </div>
      <Filter />
    </main>
  );
}
