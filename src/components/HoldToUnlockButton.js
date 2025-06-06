import axios from "axios";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock } from "lucide-react";

const ADAFRUIT_AIO_USERNAME = "datio04";
const ADAFRUIT_AIO_KEY = "aio_Thil57EjxHNQScTLwXlHio8mCGpJ";

const sendLockStatus = async (status) => {
  try {
    await axios.post(
      `https://io.adafruit.com/api/v2/${ADAFRUIT_AIO_USERNAME}/feeds/door/data`,
      { value: status },
      {
        headers: {
          "Content-Type": "application/json",
          "X-AIO-Key": ADAFRUIT_AIO_KEY,
        },
      }
    );
    console.log("Đã gửi trạng thái:", status);
  } catch (err) {
    console.error("Gửi lên Adafruit thất bại:", err);
  }
};

const HoldToUnlockButton = () => {
  const [holding, setHolding] = useState(false);
  const [locked, setLocked] = useState(true);
  const [ripples, setRipples] = useState([]);
  const holdTimer = useRef(null);
  const rippleInterval = useRef(null);

  const handleMouseDown = () => {
    if (!locked) return;

    setHolding(true);

    holdTimer.current = setTimeout(() => {
      setLocked(false);
      sendLockStatus("1"); // Mở khóa
      setHolding(false);
      clearInterval(rippleInterval.current);

      setTimeout(() => {
        setLocked(true);
        sendLockStatus("0");
        setRipples([]); 
      }, 3000);
    }, 3000);

    rippleInterval.current = setInterval(() => {
      setRipples((prev) => [...prev, Date.now()]);
    }, 800);
  };

  const handleMouseUp = () => {
    clearTimeout(holdTimer.current);
    clearInterval(rippleInterval.current);
    setHolding(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-16 h-16 rounded-full bg-[#454DF6] flex items-center justify-center shadow-lg overflow-hidden active:scale-95 transition-transform"
      >
        <AnimatePresence>
          {holding &&
            ripples.map((r, i) => (
              <motion.div
                key={r}
                className="absolute w-full h-full rounded-full bg-blue-300 opacity-50"
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 2 + i * 0.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
              />
            ))}
        </AnimatePresence>

        {locked ? (
          <Lock className="text-white w-8 h-8" />
        ) : (
          <Unlock className="text-white w-8 h-8" />
        )}
      </button>
    </div>
  );
};

export default HoldToUnlockButton;
