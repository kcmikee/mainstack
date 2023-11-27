const now = new Date();

export const getLastSevenDays = () => {
  const lastWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 7,
  );
  return lastWeek;
};

export const getLastThirtyOneDays = () => {
  const lastMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 31,
  );
  return lastMonth;
};

export const getLastThreeMonth = () => {
  const lastMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 93,
  );
  return lastMonth;
};

export const lastSixMonth = (date: any) => {
  // const month: any = {
  //   0: 12,
  //   "-1": 11,
  //   "-2": 10,
  //   "-3": 9,
  //   "-4": 8,
  //   "-5": 7,
  //   "-6": 6,
  // };
  //
  const gottenDate = new Date(date).getMonth();

  return (
    gottenDate >= new Date().getMonth() - 3 ||
    new Date(date).getMonth() <= new Date().getMonth()
  );
};
