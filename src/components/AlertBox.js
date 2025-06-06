import React, { useEffect, useState } from "react";

const ADAFRUIT_KEY = "aio_Thil57EjxHNQScTLwXlHio8mCGpJ";

function AlertBox() {
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    const fetchAlert = async () => {
      try {
        const res = await fetch(
          "https://io.adafruit.com/api/v2/datio04/feeds/alert/data/last",
          {
            headers: { "X-AIO-Key": ADAFRUIT_KEY },
          }
        );
        const data = await res.json();
        setAlertMsg(data.value);
      } catch (err) {
        console.error("Không lấy được alert:", err);
      }
    };

    fetchAlert();

    // Optionally, cập nhật alert mỗi 10 giây:
    const interval = setInterval(fetchAlert, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-4">
      {alertMsg && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded">
          🔔 {alertMsg}
        </div>
      )}
    </div>
  );
}

export default AlertBox;
