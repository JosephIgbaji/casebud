/* eslint-disable react/prop-types */
import noImage from "../../assets/cases/no-image.svg";
import download from "../../assets/cases/download.svg";
import kebabMenu from "../../assets/cases/kebab-menu.svg";
import { Link, useLocation } from "react-router-dom";
import { extractDate } from "../../utils/extractDate";
import { useState } from "react";

const CaseCard = ({ details }) => {
  const { pathname } = useLocation();

  const seeMore = `/dashboard/cases/${details._id}`;

  // const [caseType, setCaseType] = useState("Nil");

  let caseType = "NIL";

  if (details.case_type?.includes("vil")) {
    caseType = "Civil";
  } else if (details.case_type?.includes("minal")) {
    caseType = "Criminal";
  }

  // const casetype = details.case_type == "Civil" ? "Civil" : "Criminal"
  return (
    <div className="border-r borer-solid border-project-gray flex min-h-[298px]">
      <div className="w-3/6 h-full relative bg-[#D9D9D9] flex items-center">
        <img src={noImage} className="w-full m-auto" />
        <div className="absolute bottom-0 bg-gray-500 p-2 text-2xl rounded-lg w-full text-center">
          {caseType}
        </div>
      </div>
      <div className="px-3 pt-4 flex-1  text-project-light-black">
        <div className="flex justify-between text-[0.625rem] w-full">
          <p>{extractDate(details.createdAt)}</p>
          <p>{details.sex}</p>
        </div>
        <div className="pt-4">
          <p className="text-sm font-medium">{details.name}</p>
          <div>
            <p className="text-[0.625rem] mt-1 font-semibold leading-5">
              Case ID:
            </p>
            <p className="text-[0.625rem] leading-5">{details.case_id}</p>
          </div>
          <div>
            <p className="text-[0.625rem] mt-1 font-semibold leading-5">
              Case Area:
            </p>
            <p className="text-[0.625rem] leading-5">{details.case_area}</p>
          </div>
          {/* <div>
            <p className="text-[0.625rem] mt-1 font-semibold leading-5">
              Location:
            </p>
            <p className="text-[0.625rem] leading-5">{details.location}</p>
          </div> */}
        </div>
        <div className="mt-6">
          <div>
            <p className="text-[0.625rem] mt-1 font-semibold leading-5">
              Case Type:
            </p>
            <p className="text-[0.625rem] leading-5">{details.case_type}</p>
          </div>
          <div>
            <p className="text-[0.625rem] mt-1 font-semibold leading-5">
              Official Update:
            </p>
            <p className="text-[0.625rem] leading-5">{details.case_summary}</p>
          </div>
        </div>
        {/* action buttons */}
        <div className="flex mt-2 justify-between">
          {pathname.includes("overview") ? (
            <button
              aria-label="Download"
              className="flex h-7 px-3 items-center justify-center gap-x-2 bg-project-green bg-opacity-40 hover:bg-opacity-20 transition-all rounded-full"
            >
              <img src={download} />
              <span className="text-[0.625rem] text-project-dark-green font-medium">
                Download
              </span>
            </button>
          ) : (
            <Link to={seeMore}>
              <button
                aria-label="Download"
                className="flex h-7 px-3 items-center justify-center gap-x-2 bg-project-green bg-opacity-40 hover:bg-opacity-20 transition-all rounded-full"
              >
                <span className="text-[0.625rem] text-project-dark-green font-medium">
                  See more
                </span>
              </button>
            </Link>
          )}
          <button
            aria-label="Actions"
            className="flex h-7 w-7 items-center justify-center bg-[#F5F6F7] hover:bg-[#ebecec] transition-all rounded-full"
          >
            <img src={kebabMenu} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseCard;
