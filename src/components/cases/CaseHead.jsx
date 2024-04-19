import React from "react";

const CaseHead = ({ icon, count, title }) => {
  return (
    <div className="p-7 bg-white flex gap-x-5 items-center w-[clamp(200px,100%,280px)]">
      <div className="w-16 h-16 p-[6px] bg-[#5b92ff20] flex justify-center items-center rounded-full">
        <img src={icon} />
      </div>
      <div className="font-nunito text-project-light-black">
        <p className="text-2xl font-extrabold">{count}</p>
        <p className="text-sm">{title}</p>
      </div>
    </div>
  );
};

export default CaseHead;
