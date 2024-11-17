import { FC } from "react";

interface FiltersProps {
  onFilterChange: (filterType: string) => void;
}

const Filters: FC<FiltersProps> = ({ onFilterChange }) => {
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(event.target.value);
  };

  return (
    <div className="p-4 bg-secondary rounded-lg" id="filter">
      <label className="block text-primary font-bold">Comparer en fonction :</label>
      <select onChange={handleTypeChange} className="w-full p-2 mt-2 border rounded" id="choose">
        <option value="saison">de la saison</option>
        <option value="age">de l'age</option>
        <option value="niveau">du niveau</option>
        <option value="compte">de l'existence d'un compte</option>
        <option value="passe">du type de passe</option>
      </select>
    </div>
  );
};

export default Filters;
