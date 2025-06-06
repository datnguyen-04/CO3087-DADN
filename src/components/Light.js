import { useState } from "react";
import SwitchUserDefine from "./SwitchUserDefine";
import { faLightbulb, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
const ADAFRUIT_AIO_USERNAME = "datio04";
const ADAFRUIT_AIO_KEY = "aio_Thil57EjxHNQScTLwXlHio8mCGpJ";
function Light() {
  const [lightOn, setLightOn] = useState(true);
  const [room, setRoom] = useState("All room");
  const rooms = [
    { id: 1, name: "Room 1" },
    { id: 2, name: "Room 2" },
    { id: 3, name: "Room 3" },
  ]; // fetch
  const [showRoomList, setShowRoomList] = useState(false);
  const sendLockStatus = async (status) => {
    try {
      await axios.post(
        `https://io.adafruit.com/api/v2/${ADAFRUIT_AIO_USERNAME}/feeds/bbc-led/data`,
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

  return (
    <div className="col-span-1 p-4 bg-white rounded-xl shadow relative">
      <div className="text-2xl mt-1">
        <FontAwesomeIcon
          icon={faLightbulb}
          className={`bg-[#F7F6FF] p-3 rounded-xl ${lightOn ? "text-yellow-400" : ""} `}
        />
      </div>
      <div className="absolute top-4 right-4">
        <SwitchUserDefine
          toggleOn={lightOn}
          settoggleOn={(val) => {
            setLightOn(val);
            sendLockStatus(val ? 1 : 0); // hoặc "ON"/"OFF" tuỳ thuộc yêu cầu Adafruit
          }}
        />
      </div>
      <div className="font-semibold mt-2">Central light</div>
      <div className="flex justify-between items-center ">
        <div className="text-[#E7E7E7]">{room}</div>
        <div className="text-[#9D9D9D] relative">
          <FontAwesomeIcon
            icon={faChevronDown}
            className="cursor-pointer"
            onClick={() => setShowRoomList(!showRoomList)}
          />
          {showRoomList && (
            <div className="absolute flex flex-col justify-around gap-3 top-8 -left-32  min-w-40  bg-white  shadow ">
              {rooms.map((room) => {
                return (
                  <div
                    key={room.id}
                    onClick={() => {
                      setRoom(room.name);
                      setShowRoomList(!showRoomList);
                    }}
                    className="cursor-pointer hover:bg-sky-600 hover:text-white w-full px-3 py-1"
                  >
                    {room.name}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Light;
