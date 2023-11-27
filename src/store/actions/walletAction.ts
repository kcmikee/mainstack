import { getAsync, postAsync } from "../../http/methods";

interface GetWalletProps {
  onComplete: Function;
  setLoader: Function;
}

export const useGetWallets = () => {
  const GetWallets = ({ onComplete = () => {}, setLoader }: GetWalletProps) => {
    getAsync({
      data: {
        onComplete,
        setLoader,
      },
      url: `wallet`,
    });
  };

  return { GetWallets };
};
