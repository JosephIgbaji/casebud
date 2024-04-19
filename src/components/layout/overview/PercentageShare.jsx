/* eslint-disable react/prop-types */
const PercentageShare = ({ total, value, color, bgColor }) => {
  return (
    <div className="w-full f-fit flex gap-2 items-center pr-4">
      <div
        style={{ background: bgColor }}
        className={`w-full h-[10px] rounded-full`}
      >
        <div
          style={{
            background: color,
            width: `${Math.round((value / total) * 100)}%`,
          }}
          className={`h-[10px] rounded-full`}
        />
      </div>
      <p className="font-poppins font-semibold text-project-light-black text-sm">
        {Math.round((value / total) * 100)}%
      </p>
    </div>
  );
};

export default PercentageShare;
