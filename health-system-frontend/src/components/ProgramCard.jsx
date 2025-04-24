const ProgramCard = ({ name, description }) => (
  <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-blue-500">
    <h2 className="text-2xl font-extrabold mb-3 tracking-wide text-yellow-300">
      {name}
    </h2>
    <p className="text-sm leading-relaxed text-blue-100">
      {description}
    </p>
  </div>
);

export default ProgramCard;
