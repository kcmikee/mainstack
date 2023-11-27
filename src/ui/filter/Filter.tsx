"use client";
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
import { useAppStore } from "@/store/appStore";
import { useFormik } from "formik";

type Checked = DropdownMenuCheckboxItemProps["checked"];

function Filter() {
  const isFilterOpen = useAppStore(
    (state: { isFilterOpen: Boolean }) => state.isFilterOpen,
  );
  const setIsFilterOpen = useAppStore(
    (state: { setIsFilterOpen: Function }) => state.setIsFilterOpen,
  );
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
  const [sideDate, setSideDate] = React.useState(new Date());
  const [sideDate2, setSideDate2] = React.useState(new Date());
  const [hydrate, setHydrate] = React.useState(true);

  const form = useFormik({
    initialValues: {
      from: "",
      to: "",
      type: [],
      status: [],
      period: "",
    },
    validate(values) {
      let errors = {};
    },
    onSubmit(values, formikHelpers) {},
    validateOnChange: false,
  });

  const OnSelectDate = (date: Date) => {
    if (showCalendar2) {
      setSideDate2(date);
      form.setFieldValue("to", date);
      setShowCalendar2(false);
    } else {
      setSideDate(date);
      form.setFieldValue("from", date);
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    setHydrate(false);
  }, []);
  if (hydrate) return <></>;
  return (
    <div
      className={`${
        isFilterOpen ? "fixed" : "hidden"
      } group bottom-0 right-0 z-50 h-screen w-screen origin-right bg-transparent/90 transition-all duration-500 ease-linear `}
    >
      <div
        className={`border-1 duration-2000 absolute bottom-4  top-4 z-50 h-[96%] w-[456px] origin-right rounded-3xl bg-white p-5 shadow-Filter backdrop-blur transition-all delay-700 ease-in-out ${
          isFilterOpen ? "delay-2000 right-4" : "-right-[500px]"
        }`}
      >
        <div className="flex items-center justify-between pb-5">
          <h3 className="text-h3 font-bold">Filter</h3>
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
          <h3 className="mb-3 font-semibold text-black300">Transaction Type</h3>
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
                  <label
                    htmlFor={type}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6">
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
                  <label
                    htmlFor={type}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 left-3 mx-auto flex w-[95%] gap-3">
          <button
            className={`h-14 w-1/2 rounded-full border border-gray100 font-semibold`}
            onClick={() => form.resetForm()}
          >
            Clear
          </button>
          <button
            className={`h-14 w-1/2 rounded-full border bg-black300 text-white`}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
