import { useState } from "react";

function AddDevice({ handleAddDevice }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !type || !description) {
      alert("Vui lòng nhập đầy đủ thông tin thiết bị.");
      return;
    }

    const device = {
      name,
      type,
      description,
    };

    handleAddDevice(device);
    setName("");
    setType("");
    setDescription("");
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
        Thêm thiết bị
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tên thiết bị
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên thiết bị"
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Loại thiết bị
          </label>
          <input
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Nhập loại thiết bị"
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mô tả
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nhập mô tả thiết bị"
            className="w-full mt-1 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
        >
          Xác nhận
        </button>
      </form>
    </div>
  );
}

export default AddDevice;
