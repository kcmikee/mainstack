import { getAsync, postAsync } from "../../http/methods";

interface GetTransactionProps {
  onComplete: Function;
  setLoader: Function;
}

export const useGetTransactions = () => {
  const GetTransactions = ({
    onComplete = () => {},
    setLoader,
  }: GetTransactionProps) => {
    getAsync({
      data: {
        onComplete,
        setLoader,
      },
      url: `transactions`,
    });
  };

  return { GetTransactions };
};
