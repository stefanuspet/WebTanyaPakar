import React from "react";

const BubbleChatRight = ({ name, time, message }) => {
  return (
    <div className="flex items-start gap-2.5 justify-end mb-4">
      <div className="flex flex-col gap-1 w-full max-w-[370px]">
        <div className="flex items-center space-x-2 justify-end">
          <span className="text-sm font-semibold text-gray-900">{name}</span>
          <span className="text-sm font-normal text-gray-500">{time}</span>
        </div>
        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-tertiary rounded-s-xl rounded-ee-xl h-fit">
          <p className="text-sm font-normal text-white break-words overflow-hidden">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BubbleChatRight;
