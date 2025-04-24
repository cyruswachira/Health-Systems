const Dashboard = () => {
  return (
    <div className="h-screen w-screen bg-black text-white flex items-center justify-center overflow-hidden font-poppins">
      <h1 className="text-5xl font-extrabold text-blue-400 tracking-wide drop-shadow-lg">
        Dashboard
      </h1>
      <p className="text-lg text-gray-300 leading-relaxed text-center mt-4">
        Welcome to the <span className="text-yellow-400 font-semibold">Health Information System</span><br />
        Your gateway to managing healthcare programs and client records.
      </p>
    </div>
  );
};

export default Dashboard;
