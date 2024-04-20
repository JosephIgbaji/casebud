import React, { useEffect, useState } from "react";
import { pdf, xlsx, docx, jpeg } from "../../assets";
import noImage from "../../assets/cases/no-image.svg";
import horizontalLine from "../../assets/cases/horizontal-color-line.png";
import download from "../../assets/cases/download.svg";
import kebabMenu from "../../assets/cases/kebab-menu.svg";
import SummaryCard from "../../components/summary/SummaryCard";
import { useGetAllCaseQuery } from "../../service/allCase.service";
import { useParams } from "react-router-dom";

const CaseDetails = () => {
  // const { params } = useParams();
  const { id } = useParams();
  const { data: mycase } = useGetAllCaseQuery();
  console.log(mycase?.data?.allCase[0]?.entries);
  const detail = mycase?.data?.allCase?.filter((d) => d._id == id);

  let caseType = "NIL";

  if (detail[0].case_type?.includes("vil")) {
    caseType = "Civil";
  } else if (detail[0].case_type?.includes("minal")) {
    caseType = "Criminal";
  }
  // console.log(detail);
  // const [caseInfo, setCaseInfo] = useState(null);

  return (
    detail && (
      <div className="bg-white p-5">
        <div className=" border-r borer-solid border-project-gray md:grid md:grid-cols-2 gap-4 lg:flex justify-between flex-wrap min-h-[298px]">
          <div className="relative w-[300px] bg-[#D9D9D9] flex flex-1 items-center">
            <img src={noImage} className="w-[300px] m-auto" />
            <div className="absolute bottom-0 bg-gray-500 p-2 text-2xl rounded-lg w-full text-center">
              {caseType}
            </div>
          </div>
          <div className="w-[350px] px-3 flex-1  text-project-light-black">
            <div className="">
              {/* <p className="text-sm font-medium">{detail[0]?.name}</p> */}
              <div className="mb-3 flex justify-between items-start">
                <p className=" mt-1 font-semibold leading-5">Case ID:</p>
                <p className=" leading-5 w-1/2">{detail[0]?.case_id}</p>
              </div>
              <div className="mb-3 flex justify-between items-start">
                <p className=" mt-1 font-semibold leading-5">Case Type:</p>
                <p className=" leading-5 w-1/2">{detail[0]?.case_type}</p>
              </div>
              <div>
                <div className="mb-3 flex justify-between items-start">
                  <p className=" mt-1 font-semibold leading-5">Criminal:</p>
                  <p className=" leading-5 w-1/2">
                    {detail[0]?.case_type !== "criminal"}
                  </p>
                </div>
                <div className="mb-3 flex justify-between items-start">
                  <p className=" mt-1 font-semibold leading-5">Case Reason:</p>
                  <p className=" leading-5 w-1/2">{detail[0]?.case_reason}</p>
                </div>
                <div className="mb-3 flex justify-between items-start">
                  <p className=" mt-1 font-semibold leading-5">
                    Initial Witness List?
                  </p>
                  <p className=" leading-5 w-1/2">
                    {detail[0]?.witness_list.length}
                  </p>
                </div>
                <div className="mb-3 flex justify-between items-start">
                  <p className=" mt-1 font-semibold leading-5">
                    Initial Evidence List?
                  </p>
                  <p className=" leading-5 w-1/2">
                    {detail[0]?.evidence_list.length}
                  </p>
                </div>
                <div></div>
              </div>
            </div>
          </div>
          <div className="w-[350px] px-3 flex-1  text-project-light-black">
            <div className="">
              <div className="mb-3 flex justify-between items-start">
                <p className=" mt-1 font-semibold leading-5">Subcase Type:</p>
                <p className=" leading-5 w-1/2">{detail[0]?.case_area}</p>
              </div>
              <div>
                <div className="mb-3 flex justify-between items-start">
                  <p className=" mt-1 font-semibold leading-5">Offence:</p>
                  <p className=" leading-5 w-1/2">
                    {detail[0]?.case_type != "murder"
                      ? "-"
                      : detail[0]?.case_type}
                  </p>
                </div>
                <div className="mb-3 flex justify-between items-start">
                  <p className=" mt-1 font-semibold leading-5">Witnesses:</p>
                  <div className="w-1/2">
                    {detail[0]?.witness_list.map((witness, id) => (
                      <p key={id} className=" leading-5 ">
                        {witness}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="mb-3 flex justify-between items-start">
                  <p className=" mt-1 font-semibold leading-5">Evidences:</p>
                  <div className="w-1/2">
                    {detail[0]?.evidence_list.map((witness, id) => (
                      <p key={id} className=" leading-5 ">
                        {witness}
                      </p>
                    ))}
                  </div>
                </div>

                <div></div>
              </div>
            </div>
          </div>
          <button
            aria-label="Download"
            className="flex h-7 px-3 items-center max-w-[150px] justify-center gap-x-2 bg-project-green bg-opacity-40 hover:bg-opacity-20 transition-all rounded-full"
          >
            <img src={download} />
            <span className="text-[0.625rem] text-project-dark-green font-medium">
              Download Summary
            </span>
          </button>
        </div>
        <div className=" md:flex justify-between items-start">
          <div className="mt-5 mb-5 md:mb-0">
            <h2 className="font-semibold mb-2">Case Summary/Description</h2>
            <p className="text-xs text-gray-500 w-7/12">
              {detail[0]?.case_summary}
            </p>
          </div>
          <div className="">
            <h2 className="font-semibold mb-2">Uploaded Documents</h2>
            <div className="bg-gray-200 p-4">
              {detail[0]?.documents.map((doc, id) => {
                let imageIcon = jpeg;
                let title = "Document FIle";
                if (doc.document_type.includes("pdf")) {
                  imageIcon = pdf;
                  title = "Pdf Document";
                } else if (doc.document_type.includes("doc")) {
                  title = "Word Document";
                  imageIcon = docx;
                } else if (doc.document_type.includes("xls")) {
                  title = "Excel Document";
                  imageIcon = xlsx;
                } else if (doc.document_type.includes("jp" || "png" || "gif")) {
                  title = "Image File";
                  imageIcon = jpeg;
                }
                return (
                  <div key={id} className=" flex gap-10 mb-3 justify-between">
                    <div className="flex gap-5">
                      <img width={50} src={imageIcon} alt="" />
                      <div className="text-sm">
                        <h3 className="font-semibold">{title}</h3>
                        {/* <p>Courney Henry</p> */}
                      </div>
                    </div>
                    <div className="text-xs flex gap-5">
                      {/* <p>1.4 MB</p> */}
                      <a href={doc.document_url} target="_blank">
                        <p className="text-project-blue">Download</p>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <h2 className="border-b-[1px] mb-5 p-4 font-semibold text-lg">
            Updates
          </h2>
          <div className="flex gap-2">
            <img src={horizontalLine} alt="horizonal color line" />
            <div>
              {detail[0]?.entries?.map((ts, id) => (
                <SummaryCard key={id} entry={ts} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CaseDetails;
