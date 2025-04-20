import React, { useState } from "react";

import SwitchUserDefine from "./SwitchUserDefine";

const FanControl = () => {
  const [fanOn, setFanOn] = useState(true);
  const [fanSpeed, setFanSpeed] = useState(20);

  return (
    <div className="col-span-1 p-4 bg-white rounded-xl shadow ">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-800 font-medium">Fan</span>
        <SwitchUserDefine toggleOn={fanOn} settoggleOn={setFanOn} />
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2 px-1 mb-2">
        {[0, 10, 20, 30, 40].map((val) => (
          <span key={val}>{val}</span>
        ))}
      </div>
      <input
        type="range"
        min={0}
        max={40}
        value={fanSpeed}
        onChange={(e) => setFanSpeed(Number(e.target.value))}
        disabled={!fanOn}
        className={`w-full appearance-none cursor-pointer bg-transparent ${
          fanOn ? "" : "opacity-50"
        }`}
        style={{
          // Tính % cho gradient track
          "--tw-progress": `${(fanSpeed / 40) * 100}%`,
        }}
      />

      {/* Mốc số dưới thanh trượt */}

      <div className="text-center text-blue-700 font-semibold mt-2 text-lg">
        {fanSpeed}
      </div>
    </div>
  );
};

export default FanControl;
