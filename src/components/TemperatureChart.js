import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ADAFRUIT_KEY = "aio_Thil57EjxHNQScTLwXlHio8mCGpJ";

const TemperatureChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTemperatureData = async () => {
      try {
        const res = await fetch(
          "https://io.adafruit.com/api/v2/datio04/feeds/bbc-temp/data?limit=20",
          {
            headers: {
              "X-AIO-Key": ADAFRUIT_KEY,
            },
          }
        );
        const json = await res.json();
        const formatted = json.map((item) => ({
          time: new Date(item.created_at).toLocaleTimeString(),
          temp: parseFloat(item.value),
        }));
        setData(formatted.reverse());
      } catch (err) {
        console.error("Lỗi lấy dữ liệu:", err);
      }
    };

    fetchTemperatureData();

    // Tự động cập nhật mỗi 10 giây
    const interval = setInterval(fetchTemperatureData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-64 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Temperature Chart</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis unit="°C" />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;
