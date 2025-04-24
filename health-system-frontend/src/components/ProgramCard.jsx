const ProgramCard = ({ name, description }) => (
    <div className="border p-4 rounded bg-white shadow">
      <h2 className="text-lg font-bold">{name}</h2>
      <p>{description}</p>
    </div>
  );
  
  export default ProgramCard;
  