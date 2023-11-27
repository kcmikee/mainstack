import { getAsync, postAsync } from "../../http/methods";

interface GetUserProps {
  onComplete: Function;
  setLoader: Function;
}

export const useGetUsers = () => {
  const GetUsers = ({ onComplete = () => {}, setLoader }: GetUserProps) => {
    getAsync({
      data: {
        onComplete,
        setLoader,
      },
      url: `user`,
    });
  };

  return { GetUsers };
};
