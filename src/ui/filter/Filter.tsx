import { DayPicker } from "react-day-picker";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import React, { useEffect } from "react";
import {
  IoCloseSharp,
  IoChevronDownOutline,
  IoChevronUpOutline,
} from "react-icons/io5";

import "react-day-picker/dist/style.css";
import Calendar from "../calendar/Calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { filterValuesProps, useAppStore } from "@/store/appStore";
import { useFormik } from "formik";
import { useTransactionStore } from "@/store/transactionStore";

import { getLastSevenDays, getLastThreeMonth } from "@/lib/CalenderFunction";
import { isThisMonth, isToday } from "date-fns";
import { useGetTransactions } from "@/store/actions/transactionActions";

type Checked = DropdownMenuCheckboxItemProps["checked"];

function Filter() {
  const isFilterOpen = useAppStore(
    (state: { isFilterOpen: Boolean }) => state.isFilterOpen,
  );
  const setIsFilterOpen = useAppStore(
    (state: { setIsFilterOpen: Function }) => state.setIsFilterOpen,
  );
  const filterValues = useAppStore(
    (state: { filterValues: filterValuesProps }) => state.filterValues,
  );
  const setFilterValues = useAppStore(
    (state: { setFilterValues: any }) => state.setFilterValues,
  );

  const transactions = useTransactionStore(
    (state: { transactions: [] }) => state.transactions,
  );
  const setFilteredTransactions = useAppStore(
    (state) => state.setFilteredTransactions,
  );
  const setLoader = useTransactionStore((state) => state.setLoader);
  const setTransactions = useTransactionStore((state) => state.setTransactions);

  const { GetTransactions } = useGetTransactions();
  const filterData = ["Today", "Last 7 days", "This month", "Last 3 months"];
  const transStatus = ["Successful", "Pending", "Failed"];
  const transType = [
    "Store Transactions",
    "Get Tipped",
    "Withdrawals",
    "Chargebacks",
    "Cashbacks",
    "Refer & Earn",
  ];
  const [showType, setShowType] = React.useState<Boolean>(false);
  const [showStatus, setShowStatus] = React.useState<Boolean>(false);
  const [showCalendar, setShowCalendar] = React.useState<Boolean>(false);
  const [showCalendar2, setShowCalendar2] = React.useState<Boolean>(false);
  const [sideDate] = React.useState(new Date());

  const [hydrate, setHydrate] = React.useState(true);

  const form = useFormik({
    initialValues: {
      from: filterValues?.from || "",
      to: filterValues?.to || "",
      type: filterValues?.type || [],
      status: filterValues?.status ?? [],
      period: filterValues?.period ?? "",
    },
    validate(values) {
      let errors = {};
    },
    onSubmit(values, formikHelpers) {},
    validateOnChange: false,
  });

  const OnSelectDate = (date: Date) => {
    if (showCalendar2) {
      form.setFieldValue("to", date);
      setShowCalendar2(false);
    } else {
      form.setFieldValue("from", date);
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    setHydrate(false);
  }, []);

  const onApply = () => {
    let num = 0;
    if (form.values.from) num += 1;
    if (form.values.period) num += 1;
    if (form.values.status.length > 0) num += 1;
    if (form.values.type.length > 0) num += 1;
    if (form.values.to) num += 1;

    setFilterValues({ ...form.values, active: num });
    const periodData = transactions.flatMap((data: { date: Date }, i) => {
      if (isToday(data?.date)) return Object.assign({}, data, { id: i });
      if (isThisMonth(data?.date)) return Object.assign({}, data, { id: i });
      if (new Date(data?.date) >= getLastSevenDays())
        return Object.assign({}, data, { id: i });
      if (new Date(data?.date) >= getLastThreeMonth())
        return Object.assign({}, data, { id: i });
      return [];
    });
    const dateData = transactions.flatMap((data: { date: Date }, i) => {
      if (form.values.from && form.values.to) {
        if (
          new Date(form.values.from) >= new Date(data?.date) &&
          new Date(data?.date) <= new Date(form?.values.to)
        )
          return Object.assign({}, data, { id: i });
      } else if (form.values.from && !form.values.to) {
        if (new Date(form.values.from) >= new Date(data?.date))
          return Object.assign({}, data, { id: i });
      } else if (!form.values.from && form.values.to) {
        if (new Date(data?.date) <= new Date(form?.values.to))
          return Object.assign({}, data, { id: i });
      } else return [];
    });
    const statusData = transactions.flatMap(
      (data: { date: Date; status: String }, i) => {
        if (
          form.values.status.includes("Successful") &&
          data?.status === "successful"
        )
          return Object.assign({}, data, { id: i });
        if (
          form.values.status.includes("Pending") &&
          data?.status === "pending"
        )
          return Object.assign({}, data, { id: i });
        if (form.values.status.includes("Failed") && data?.status === "failed")
          return Object.assign({}, data, { id: i });
        return [];
      },
    );
    const typeData = transactions.flatMap(
      (data: { date: Date; status: String; type: String }, i) => {
        if (form.values.type.includes("Cashbacks") && data?.type === "deposit")
          return Object.assign({}, data, { id: i });
        if (
          form.values.type.includes("Withdrawals") &&
          data?.type === "withdrawal"
        )
          return Object.assign({}, data, { id: i });
        return [];
      },
    );
    // console.log(typeData);

    const newData = [...periodData, ...dateData, ...statusData, ...typeData];
    const unique = new Map(newData.map((m: { id: any }) => [m.id, m]));

    // @ts-ignore
    setFilteredTransactions([...unique.values()]);
    setIsFilterOpen(!isFilterOpen);
    setShowType(false);
    setShowStatus(false);
    setShowCalendar(false);
    setShowCalendar2(false);
  };

  if (hydrate) return <></>;
  return (
    <div
      className={`${
        isFilterOpen ? "fixed" : "hidden"
      } group bottom-0 right-0 z-50 h-screen w-screen origin-right bg-transparent/50 transition-all duration-500 ease-linear `}
    >
      <div
        className={`border-1 absolute bottom-4 top-4  z-50 h-[96%] w-[456px] origin-right rounded-3xl bg-white p-5 shadow-Filter backdrop-blur transition-all delay-700 duration-2000 ease-in-out ${
          isFilterOpen ? "delay-2000 right-4" : "-right-[500px]"
        }`}
      >
        <div className="flex items-center justify-between pb-5">
          <h3 className="text-h3 font-semibold">
            Filter <span></span>
          </h3>
          <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="">
            <IoCloseSharp size={24} />
          </button>
        </div>
        <div className="relative flex gap-x-2">
          {filterData.map((data, i) => (
            <button
              key={i + data}
              className={`flex items-center justify-center rounded-full border px-[17px] py-2.5 text-xs font-semibold ${
                form.values.period === data
                  ? "bg-black300 text-white"
                  : "border-gray100 text-black300"
              } text-black300`}
              onClick={() => form.setFieldValue("period", data)}
            >
              {data}
            </button>
          ))}
        </div>
        <div className="relative mt-7">
          <h3 className="font-semibold text-black300">Date Range</h3>
          <div className="flex gap-3">
            <div className="w-1/2">
              <button
                onClick={() => {
                  if (showCalendar2) {
                    setShowCalendar2(false);
                  }
                  setShowCalendar(!showCalendar);
                }}
                className={`transactionDropdownTrigger text-sm ${
                  showCalendar ? "border-2 border-black" : ""
                }`}
              >
                {!form.values.from
                  ? "Select Date"
                  : new Date(form.values.from).toDateString()}
                {!showCalendar ? (
                  <IoChevronDownOutline />
                ) : (
                  <IoChevronUpOutline />
                )}
              </button>
            </div>
            <div className="w-1/2">
              <button
                onClick={() => {
                  if (showCalendar) {
                    setShowCalendar(false);
                  }
                  setShowCalendar2(!showCalendar2);
                }}
                className={`transactionDropdownTrigger text-sm ${
                  showCalendar2 ? "border-2 border-black" : ""
                }`}
              >
                {!form.values.to
                  ? "Select Date"
                  : new Date(form.values.to).toDateString()}
                {!showCalendar2 ? (
                  <IoChevronDownOutline />
                ) : (
                  <IoChevronUpOutline />
                )}
              </button>
            </div>
          </div>
          <div
            className={`filtercalendar z-50 w-full rounded-2xl bg-white px-8 pt-8 shadow-AppBar ${
              showCalendar || showCalendar2 ? "absolute" : "hidden"
            }`}
          >
            <Calendar selectedDay={sideDate} setSelectedDay={OnSelectDate} />
          </div>
        </div>

        {/* Transaction dropdown */}
        <div className="mt-6">
          <h3
            data-testid="filtertype"
            className="mb-3 font-semibold text-black300"
          >
            Transaction Type
          </h3>
          <div className="relative">
            <div>
              <button
                onClick={() => {
                  if (showStatus) {
                    setShowStatus(!showStatus);
                  }
                  setShowType(!showType);
                }}
                className={`transactionDropdownTrigger text-sm ${
                  showType ? "border-2 border-black" : ""
                }`}
              >
                <p className="flex w-11/12 truncate">
                  {form.values.type.length > 0
                    ? form.values.type.map((data, i) => {
                        if (i + 1 === form.values.type.length)
                          return `${data}.`;
                        else return `${data}, `;
                      })
                    : ""}
                </p>
                {!showType ? <IoChevronDownOutline /> : <IoChevronUpOutline />}
              </button>
            </div>
            <div
              className={`transactionDropdown1 z-20 py-2 ${
                showType ? "absolute" : "hidden"
              }`}
            >
              {transType.map((type, i) => (
                <div
                  key={type + i}
                  className="flex items-center space-x-2 py-3.5 pl-4"
                  onClick={(e) => {
                    e.preventDefault();
                    if (form.values.type.includes(type)) {
                      const data = form.values.type.filter(
                        (data) => data !== type,
                      );
                      form.setFieldValue("type", data);
                    } else {
                      form.setFieldValue("type", [...form.values.type, type]);
                    }
                  }}
                >
                  <Checkbox
                    id={type}
                    checked={form.values.type.includes(type)}
                  />
                  <label htmlFor={type} className="checkBoxLabel">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div role="filter-status" className="mt-6">
          <h3 className="mb-3 font-semibold text-black300">
            Transaction Status
          </h3>
          <div className="relative">
            <div>
              <button
                onClick={() => {
                  if (showType) {
                    setShowType(!showType);
                  }
                  setShowStatus(!showStatus);
                }}
                className={`transactionDropdownTrigger ${
                  showStatus ? "border-2 border-black" : ""
                }`}
              >
                <p className="start-0 flex w-11/12 truncate">
                  {form.values.status.length > 0
                    ? form.values.status.map((data, i) => {
                        if (i + 1 === form.values.status.length)
                          return `${data}.`;
                        else return `${data}, `;
                      })
                    : ""}
                </p>
                {!showStatus ? (
                  <IoChevronDownOutline />
                ) : (
                  <IoChevronUpOutline />
                )}
              </button>
            </div>
            <div
              className={`transactionDropdown z-20  ${
                showStatus ? "absolute" : "hidden"
              }`}
            >
              {transStatus.map((type, i) => (
                <div
                  key={type + i}
                  className="flex items-center space-x-2 py-3.5 pl-4"
                  onClick={(e) => {
                    e.preventDefault();
                    if (form.values.status.includes(type)) {
                      const data = form.values.status.filter(
                        (data) => data !== type,
                      );
                      form.setFieldValue("status", data);
                    } else {
                      form.setFieldValue("status", [
                        ...form.values.status,
                        type,
                      ]);
                    }
                  }}
                >
                  <Checkbox
                    id={type}
                    checked={form.values.status.includes(type)}
                  />
                  <label htmlFor={type} className="checkBoxLabel">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="btnContainer">
          <button
            className={`btn border-gray100 font-semibold`}
            onClick={() => {
              form.resetForm();
              setFilterValues({});
              GetTransactions({
                onComplete: (_: any, data: any) => {
                  setTransactions(data);
                  setFilteredTransactions(data);
                },
                setLoader,
              });
            }}
          >
            Clear
          </button>
          <button
            disabled={
              !form.values.from &&
              !form.values.period &&
              form.values.status.length === 0 &&
              !form.values.to &&
              form.values.type.length === 0
            }
            onClick={onApply}
            className={`btn bg-black300 text-white disabled:bg-gray100`}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
