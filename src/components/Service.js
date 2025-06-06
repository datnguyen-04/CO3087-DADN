import React, { useState, useEffect } from "react";
import AlertBox from "./AlertBox";

const ADAFRUIT_URL =
  "https://io.adafruit.com/api/v2/datio04/feeds/door-lock/data";
const ADAFRUIT_KEY = "aio_Thil57EjxHNQScTLwXlHio8mCGpJ";

function Service() {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [hasSent, setHasSent] = useState(false); // tránh gửi trùng

  const handleChange = (value, index) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Tự động focus sang ô kế tiếp
    if (value && index < 3) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  useEffect(() => {
    const isFull = pin.every((v) => v !== "");
    if (isFull && !hasSent) {
      const code = pin.join("");
      sendToAdafruit(code);
      setHasSent(true);
    }

    if (!isFull) {
      setHasSent(false); // cho phép gửi lại nếu có thay đổi
    }
  }, [pin]);

  const sendToAdafruit = async (value) => {
    try {
      await fetch(ADAFRUIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-AIO-Key": ADAFRUIT_KEY,
        },
        body: JSON.stringify({ value }),
      });
      console.log("Đã gửi mật khẩu:", value);
    } catch (err) {
      console.error("Lỗi khi gửi mật khẩu lên Adafruit:", err);
    }
  };

  return (
    <div className="col-span-4 px-4 py-3">
      <div className="font-semibold text-xl mb-5">Service</div>
      <div className="bg-[#030391] rounded-lg flex flex-col p-5 gap-7">
        <div className="text-white">Password</div>
        <div className="flex justify-between items-center gap-3">
          {pin.map((digit, index) => (
            <input
              key={index}
              id={`pin-${index}`}
              type="password"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="text-center text-black border rounded-lg w-12 h-12 bg-white outline-none"
            />
          ))}
        </div>
      </div>
      <div>
        <div className="font-semibold mt-5">Schedule</div>
      </div>
      <AlertBox />
    </div>
  );
}

export default Service;
