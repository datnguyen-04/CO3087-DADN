import React, { useState, useEffect } from "react";
import SwitchUserDefine from "./SwitchUserDefine";

const ADAFRUIT_AIO_KEY = "aio_Thil57EjxHNQScTLwXlHio8mCGpJ";
const FanControl = () => {
  const [fanOn, setFanOn] = useState(true);
  const [fanSpeed, setFanSpeed] = useState(20);
  const percentage = (fanSpeed / 40) * 100; // phần trăm tiến trình
  useEffect(() => {
    const sendFanStatus = async () => {
      // const value = fanOn ? 1 : 0;

      // try {
      //   await fetch(
      //     "https://io.adafruit.com/api/v2/datio04/feeds/bbc-fan/data",
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //         "X-AIO-Key": ADAFRUIT_AIO_KEY,
      //       },
      //       body: JSON.stringify({ value }),
      //     }
      //   );
      // } catch (error) {
      //   console.error("Lỗi khi gửi dữ liệu:", error);
      // }
    };

    sendFanStatus();
  }, [fanOn]);

  const handleSendFanSpeed = async () => {
    if (!fanOn) return;
    try {
      await fetch(
        "https://io.adafruit.com/api/v2/datio04/feeds/bbc-fan/data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-AIO-Key": ADAFRUIT_AIO_KEY,
          },
          body: JSON.stringify({ value: fanSpeed }),
        }
      );
    } catch (error) {
      console.error("Lỗi khi gửi tốc độ quạt:", error);
    }
  };

  return (
    <div className="col-span-1 p-4 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-800 font-medium">Fan</span>
        <SwitchUserDefine toggleOn={fanOn} settoggleOn={setFanOn} />
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2 px-1 mb-2">
        {[0, 10, 20, 30, 40].map((val) => (
          <span key={val}>{val}</span>
        ))}
      </div>
      <div className="relative h-4 mb-2 cursor-pointer">
        {/* Thanh nền (progress bar nền) */}
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 w-full h-1 rounded-full ${
            fanOn ? "bg-gray-200" : "bg-gray-100"
          } transition-colors duration-300`} // Chỉ transition màu
        />

        {/* Thanh tiến trình */}
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 h-1 rounded-full ${
            fanOn ? "bg-blue-700" : "bg-gray-400"
          }`} // Không transition width, chỉ transition màu
          style={{ width: `${percentage}%` }}
        />

        {/* Slider nằm trên */}
        <input
          type="range"
          min={0}
          max={40}
          value={fanSpeed}
          onChange={(e) => setFanSpeed(Number(e.target.value))}
          onMouseUp={handleSendFanSpeed}
          onTouchEnd={handleSendFanSpeed}
          className="w-full appearance-none bg-transparent h-4 z-10 relative"
          disabled={!fanOn}
        />
      </div>

      {/* Mốc số dưới thanh trượt */}
      <div className="text-center text-blue-700 font-semibold mt-2 text-lg">
        {fanSpeed}
      </div>
    </div>
  );
};

export default FanControl;
