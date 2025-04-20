import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import AddDevice from "./AddDevice";
import Popup from "reactjs-popup";
function Config() {
  const searchInputRef = useRef();
  const handleWrapperClick = () => {
    searchInputRef.current.focus();
  };
  //fetch api
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "Fan 1",
      type: "Fan",
      status: "active",
      description: "Ceiling fan in room A101",
    },
    {
      id: 2,
      name: "Printer 2",
      type: "Printer",
      status: "inactive",
      description: "HP LaserJet printer",
    },
    {
      id: 3,
      name: "AC 3",
      type: "Air Conditioner",
      status: "active",
      description: "Daikin inverter",
    },
    {
      id: 4,
      name: "Router 4",
      type: "Router",
      status: "active",
      description: "TP-Link wireless router",
    },
    {
      id: 5,
      name: "Light 5",
      type: "Lighting",
      status: "inactive",
      description: "LED ceiling light",
    },
    {
      id: 6,
      name: "Speaker 6",
      type: "Speaker",
      status: "active",
      description: "Bluetooth classroom speaker",
    },
  ]);
  const handleAddDevice = (newDevice) => {
    setDevices([...devices, newDevice]);
  };

  return (
    <>
      <div className="col-span-11 border rounded-md shadow-sm bg-[#FAFAFA] px-5 py-10">
        <div className="grid grid-cols-2 items-center ">
          <div className="text-lg font-semibold mb-4">All devices</div>
          <div className="flex justify-between items-center gap-3">
            <div
              className="relative w-full max-w-sm cursor-pointer"
              onClick={handleWrapperClick}
            >
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search"
                className="w-5/6 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute right-[73px] top-1/2 transform -translate-y-1/2 text-white bg-[#030391] rounded-xl p-2"
              />
            </div>
            <div className="text-white bg-[#030391] px-3 py-2 rounded-xl w-1/2 flex justify-between items-center cursor-pointer">
              <Popup trigger={<button> Add new device</button>} modal nested>
                {(close) => (
                  <div className="modal relative min-w-[200px] min-h-[200px] p-2">
                    <AddDevice handleAddDevice={handleAddDevice} />
                    <div>
                      <button
                        onClick={() => close()}
                        className="absolute top-0 right-0 m-2 text-xl bg-gray-200 hover:bg-red-600 hover:text-white px-3 py-1 shadow transition duration-300"
                      >
                        <FontAwesomeIcon icon={faClose} />
                      </button>
                    </div>
                  </div>
                )}
              </Popup>

              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 min-h-52 mt-10 ">
          {devices.map((device) => (
            <div className="p-2 bg-white rounded-lg">{device.name}</div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Config;
