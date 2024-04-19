import React from "react";

const UpcomingTasksContainer = ({ task }) => {
  let completed = true;
  const style = completed
    ? "rounded-full border p-1 bg-project-green"
    : "rounded-full border p-1";
  const color = completed ? "white" : "currentColor";
  return (
    <div className="mb-3 border rounded-lg border-gray-400 max-w-[500px] p-4 flex justify-between">
      <div className="flex items-center gap-3">
        <div className={style}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={color}
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <p className="text-xs bg-project-green bg-opacity-10 text-project-dark-green p-2 rounded-lg">
              Summary
            </p>
          </div>
          <h4 className="my-2">{task.upcoming_task[0]}</h4>
          {/* <p className="rounded-lg bg-gray-100 p-2 text-xs pr-16">
            Lorem ipsum dolor sit amet consectetur. A nulla ullamcorper vel in
            amet. Feugiat vel dui facilisis dictum arcu malesuada. Mauris
            aliquam tincidunt ante hendrerit feugiat pulvinar.
          </p> */}
          {/* <div className="mt-3">
            <div className="flex gap-2 w-[180px] items-center bg-[#FFEDED] rounded-2xl p-2">
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
                  d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
                />
              </svg>

              <p className=" text-gray-400">Due date</p>
              <p className="">Mar 14</p>
            </div>
          </div> */}
        </div>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default UpcomingTasksContainer;
