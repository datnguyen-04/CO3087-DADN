function Service() {
  return (
    <div className="col-span-4 px-4 py-3">
      <div className="font-semibold text-xl mb-5">Service</div>
      <div className="bg-[#030391] rounded-lg  flex flex-col p-5  gap-7">
        <div className="text-white">Password</div>
        <div className="flex justify-between items-center gap-3">
          <input
            type="password"
            maxLength={1}
            className="text-center text-black border rounded-lg w-12 h-12 bg-white outline-none"
          />
          <input
            type="password"
            maxLength={1}
            className="text-center text-black border rounded-lg w-12 h-12 bg-white outline-none"
          />
          <input
            type="password"
            maxLength={1}
            className="text-center text-black border rounded-lg w-12 h-12 bg-white outline-none"
          />
          <input
            type="password"
            maxLength={1}
            className="text-center text-black border rounded-lg w-12 h-12 bg-white outline-none"
          />
        </div>
      </div>
      <div>
        <div className="font-semibold mt-5">Schedule</div>
      </div>
    </div>
  );
}

export default Service;
