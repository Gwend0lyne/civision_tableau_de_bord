"use client";

import { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// Enregistrer les composants nécessaires pour les graphiques
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

interface ChartsProps {
  data: DataItem[];
  comparisonKey: string;
}

interface DataItem {
  id: number;       // Identifiant unique
  saison: string;   // La saison (printemps, été, automne, hiver)
  prix: number;     // Le prix
  age: number;      // L'âge
  niveau: string;   // Niveau (novice, moyen, pro)
  compte: boolean;  // Indique si le compte est actif (true ou false)
  passe: string;    // Type de passe (simple, double, illimité)
}


const Charts: FC<ChartsProps> = ({ data, comparisonKey }) => {
  if (!comparisonKey) {
    return <p className="text-center text-primary">Veuillez choisir un type de comparaison.</p>;
  }

  const uniqueValues = [...new Set(data.map((item) => item[comparisonKey as keyof DataItem]))];
  const valueCounts = uniqueValues.map(
    (value) => data.filter((item) => item[comparisonKey as keyof DataItem] === value).length
  );

  const pricePerValue = uniqueValues.map((value) =>
    data
      .filter((item) => item[comparisonKey as keyof DataItem] === value)
      .reduce((acc, item) => acc + item.prix, 0)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="charts">
      <div className="p-4 bg-secondary rounded-lg" id="barre">
        <h3 className="text-center text-primary font-bold">Nombre d'achat par {comparisonKey}</h3>
        <Bar
          data={{
            labels: uniqueValues.map(String), // Convertir les valeurs en chaînes
            datasets: [
              {
                label: `Nombre d'achat`,
                data: valueCounts,
                backgroundColor: "#3da478",
              },
            ],
          }}
        />
      </div>
      <div className="p-4 bg-secondary rounded-lg" id="rond">
        <h3 className="text-center text-primary font-bold">Prix par {comparisonKey}</h3>
        <Pie
          data={{
            labels: uniqueValues.map(String),
            datasets: [
              {
                label: "Prix total",
                data: pricePerValue,
                backgroundColor: ["#3da478", "#78c7a5", "#96d3b9", "#aedec9"],
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Charts;

