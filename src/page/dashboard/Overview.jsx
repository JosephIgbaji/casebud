/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from "react";
import increase from "../../assets/overview/increase.svg";
import decrease from "../../assets/overview/decrease.svg";
import chevron from "../../assets/titlebar/chevron.svg";
import { PercentageShare } from "../../components/layout/overview";
import { cases } from "../../constants";
import { defaults } from "chart.js";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { CaseCard } from "../../components/cases";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-dropdown-select";
import Barchart from "../../components/barchart/Barchart";
import { useGetRecentCaseQuery } from "../../service/recentCases.service";
import { useGetMonthlyCaseQuery } from "../../service/monthlyCases.service";
import { useGetUpcomingTasksCountQuery } from "../../service/upcomingTaskCount.service";
import Doughnutchart from "../../components/Doughnutchart";
import { useGetAllCaseQuery } from "../../service/allCase.service";
import { useGetLastUpdateQuery } from "../../service/lastUpdate.service";
import { extractDate } from "./../../utils/extractDate";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

ChartJS.register(ArcElement, Tooltip, CategoryScale, LinearScale, BarElement);
defaults.font.family = "'Poppins', sans-serif";
defaults.font.weight = "600";

const Overview = () => {
  const { data: dt } = useGetUpcomingTasksCountQuery();
  const { data: recent } = useGetRecentCaseQuery();
  const { data: totalCase } = useGetAllCaseQuery();
  const { data: monthly } = useGetMonthlyCaseQuery();
  const { data: lastUpdate } = useGetLastUpdateQuery();

  // console.log("Total:", totalCase?.data);

  // console.log("Monthyly: ", monthly?.data);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");
  const [ttl, setTtl] = useState("Total");

  const navigate = useNavigate();
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [, setIndicatorWidth] = useState(0);

  // const activeTextStyling = (index) => {
  //   if (index === currentTabIndex) {
  //     return "text-black";
  //   } else {
  //     return "text-project-gray-2";
  //   }
  // };

  const handleChange = (event, name) => {
    // console.log(event.target.value);
    setValue(event.target.value);
    // setTtl(name);
  };

  const dailyRef = useRef();
  const weeklyRef = useRef();
  const monthlyRef = useRef();
  const yearlyRef = useRef();

  useEffect(() => {
    setInterval(() => {
      // setValue(totalCase?.data?.totalcaseCount);
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setIndicatorPosition(calculateIndicatorPosition(currentTabIndex));
  }, [currentTabIndex]);

  useEffect(() => {
    setIndicatorWidth(calculateWidth);
  }, [currentTabIndex]);

  const calculateWidth = (i) => {
    if (i === 0) return dailyRef.current?.offsetWidth;
    if (i === 1) return weeklyRef.current?.offsetWidth;
    if (i === 2) return monthlyRef.current?.offsetWidth;
    if (i === 3) return yearlyRef.current?.offsetWidth;
  };

  const calculateIndicatorPosition = (i) => {
    if (i === 0) return 0;
    if (i === 1) return dailyRef.current.offsetWidth;
    if (i === 2)
      return dailyRef.current.offsetWidth + weeklyRef.current.offsetWidth;
    if (i === 3)
      return (
        dailyRef.current.offsetWidth +
        weeklyRef.current.offsetWidth +
        monthlyRef.current.offsetWidth
      );
  };

  return (
    <div className="px-4">
      {/* First Section */}
      <div className="p-5 rounded-xl bg-white font-poppins">
        {/* Summary section */}
        {/* <div className="flex flex-wrap gap-6 mt-4"> */}
        <div className="lg:grid lg:grid-cols-3 gap-6 mt-4">
          {/* First card */}
          <Link to="/dashboard/upcoming-tasks">
            <div>
              <div className="justify-between h-52 pt-8 pl-8 border border-solid border-project-gray rounded-xl">
                <div className="flex w-5/6 justify-between items-start">
                  <div>
                    <p className="font-bold text-5xl text-project-light-black">
                      {dt?.upcoming_task_count[0]?.total_upcoming_tasks}
                    </p>
                    <p className="font-medium text-base text-project-light-black">
                      Upcoming Tasks
                    </p>
                  </div>
                  <div className="w-11 h-11 p-[6px] rounded-md bg-red-100 flex justify-center items-center">
                    {/* <img src={handcuffs} /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="red"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-xs mt-4 inline-flex items-center">
                  <img src={increase} className="w-2 inline-flex mr-1" />
                  <span className="text-project-green font-medium"></span>
                  &nbsp;
                  {/* <span className="text-project-light-black">
                    from the last month
                  </span> */}
                </p>
              </div>
            </div>
          </Link>
          {/* Second card */}
          <div>
            <div className="justify-between h-52 p-2 border border-solid border-project-gray rounded-xl">
              <p className="font-inter text-base text-project-light-black font-semibold">
                Last updates
              </p>
              <div className="mt-3">
                {lastUpdate?.data?.map((dt, id) => (
                  <div key={id}>
                    {/*Subject of the last update */}
                    <p className="font-poppins text-sm text-project-light-black font-semibold">
                      {dt?.entry_subject}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="mt-1">
                        <p className="font-poppins text-xs text-project-light-black font-semibold">
                          {dt?.entry_details}
                        </p>

                        <p className="text-xs inline-flex items-center -translate-y-2 mt-2">
                          {/* <img
                            src={decrease}
                            className="w-2 inline-flex mr-1"
                          /> */}

                          <span className="text-project-light-black">
                            {extractDate(dt?.entry_date)}
                          </span>
                        </p>
                      </div>
                      <button className="rounded-lg bg-project-green text-white p-1 flex gap-2 items-center">
                        <p className="text-xs">View Details</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col justify-between h-52 p-2 border border-solid border-project-gray rounded-xl">
              <p className="font-inter text-base text-project-light-black font-semibold whitespace-nowrap">
                Case Summary
              </p>
              <div className="flex justify-between items-center">
                <div className="mr-4 font-dmsans gap-2 bg-white h-[24px] border-project-gray">
                  {/* <Select
                    values={[{ value: "all-cases", label: "All Cases" }]}
                    dropdownHandleRenderer={({ state, methods }) => (
                      <img
                        src={chevron}
                        className={
                          state.dropdown
                            ? "rotate-180 transition-all"
                            : "transition-all"
                        }
                        onClick={() => methods.dropDown("toggle")}
                      />
                    )}
                    contentRenderer={({ state }) => (
                      <p className="whitespace-nowrap w-24 overflow-hidden text-ellipsis text-project-light-black">
                        {state.values[0].label}
                      </p>
                    )}
                    itemRenderer={({
                      item,
                      itemIndex,
                      props,
                      state,
                      methods,
                    }) => (
                      <div
                        onClick={() => {
                          methods.clearAll();
                          methods.addItem(item);
                        }}
                        className="p-1 px-2 bg-[#F4F0F0] text-project-light-black hover:bg-project-blue hover:text-white transition-all"
                      >
                        {item.label}
                      </div>
                    )}
                    closeOnScroll={true}
                    options={[
                      { value: "all-cases", label: "All Cases" },
                      { value: "drug-abuse", label: "Drug Abuse" },
                      { value: "sexual-assault", label: "Sexual Assault" },
                      { value: "murder", label: "Murder" },
                      { value: "cultism", label: "Cultism" },
                      {
                        value: "violent-activities",
                        label: "Violent Activities",
                      },
                      { value: "others", label: "Others" },
                    ]}
                    // onChange={(values) => this.onChange(values)}
                    dropdownGap={5}
                    style={{
                      width: 120,
                      fontSize: "10px",
                      margin: 0,
                      height: 0,
                      minHeight: "20px",
                      border: "none",
                      outlineColor: "red",
                    }}
                    className="custom-outline"
                  /> */}

                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={value}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value={totalCase?.data?.totalcaseCount}
                        control={<Radio />}
                        label="Total"
                        onClick={() => setTtl("Total")}
                        // onClick={(e) => handleChange(e)}
                      />
                      <FormControlLabel
                        // onClick={(e) => handleChange(e)}
                        onClick={() => setTtl("Closed")}
                        control={<Radio />}
                        value={totalCase?.data?.totalClosedCase}
                        label="Closed"
                      />
                      <FormControlLabel
                        onClick={() => setTtl("Open")}
                        value={totalCase?.data?.totalOpenCase}
                        control={<Radio />}
                        label="Open"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-between px-2 pb-6">
                {/* previous button */}
                {/* <button
                  aria-label="Previous"
                  className=" p-1 hover:bg-project-gray flex justify-center items-center rounded-lg trnasition-all duration-150"
                >
                  <img src={chevron} className="w-6 rotate-90" />
                </button> */}

                {/* chart */}
                <div className="flex-1 h-[140px] w-[140px] pt-3 flex justify-center items-center">
                  {totalCase?.data?.totalcaseCount && (
                    <Doughnutchart
                      dt={value ? value : totalCase?.data?.totalcaseCount}
                      innerTitle={""}
                    />
                  )}
                  {totalCase?.data?.totalcaseCount && (
                    <p className="pl-2">
                      {ttl}: {value ? value : totalCase?.data?.totalcaseCount}
                    </p>
                  )}
                </div>

                {/* next button */}
                {/* <button
                  aria-label="Previous"
                  className=" p-1 hover:bg-project-gray flex justify-center items-center rounded-lg trnasition-all duration-150"
                >
                  <img src={chevron} className="w-6 -rotate-90" />
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Second Section */}
      <div className="p-5 rounded-xl bg-white font-poppins mt-6">
        <div className="justify-between items-center pb-2">
          <p className="font-medium text-xl text-project-light-black">
            Cases Assigned
          </p>
          {monthly?.data && <Barchart obj={monthly?.data} />}
        </div>
      </div>
      {/* Third Section */}
      <div className="p-5 rounded-xl bg-white font-poppins mt-6 mb-10">
        <div className="flex justify-between items-center border-b border-solid border-project-gray pb-2">
          <p className="font-medium text-xl text-project-light-black">
            Recent Cases
          </p>
          <button
            aria-label="View all cases"
            className="flex gap-x-2 items-center hover:bg-project-gray p-2 rounded-lg transition-all"
            onClick={() => navigate("/dashboard/cases")}
          >
            <span className="font-inter font-medium text-xs text-project-light-black">
              View All
            </span>
            <img src={chevron} className="-rotate-90" />
          </button>
        </div>
        {!loading ? (
          <div className="lg:grid lg:grid-cols-3 pt-4 gap-4">
            {recent.data?.slice(0, 3)?.map((item) => (
              <div className="mb-5 lg:mb-0">
                <CaseCard key={item._id} details={item} />
              </div>
            ))}
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
};

export default Overview;
