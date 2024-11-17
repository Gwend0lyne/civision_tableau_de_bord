"use client";

import { useState, useEffect } from "react";
import Filters from "../../src/app/components/Filters";
import PriceDisplay from "../../src/app/components/PriceDisplay";
import Charts from "../../src/app/components/Charts";

interface DataItem {
  id: number;       // Identifiant unique
  saison: string;   // La saison (printemps, été, automne, hiver)
  prix: number;     // Le prix
  age: number;      // L'âge
  niveau: string;   // Niveau (novice, moyen, pro)
  compte: boolean;  // Indique si le compte est actif (true ou false)
  passe: string;    // Type de passe (simple, double, illimité)
}

const Home = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [comparisonKey, setComparisonKey] = useState<string>("saison"); // Par défaut : "saison"
  const [topCategory, setTopCategory] = useState<string | null>(null); // Meilleure catégorie
  const [averagePrice, setAveragePrice] = useState<number | null>(null); // Prix moyen

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/database.json");
      const result: DataItem[] = await response.json();
      setData(result);
      setFilteredData(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (comparisonKey && filteredData.length > 0) {
      const grouped = filteredData.reduce((acc, item) => {
        const key = item[comparisonKey as keyof DataItem];
        if (!acc[key as string]) acc[key as string] = [];
        acc[key as string].push(item.prix);
        return acc;
      }, {} as Record<string, number[]>);

      // Trouver la catégorie avec le plus de ventes
      const bestCategory = Object.entries(grouped).reduce(
        (prev, curr) => (curr[1].length > prev[1].length ? curr : prev),
        ["", [] as number[]]
      );

      setTopCategory(bestCategory[0]); // Nom de la meilleure catégorie
      setAveragePrice(
        bestCategory[1].reduce((sum, price) => sum + price, 0) /
          bestCategory[1].length // Prix moyen
      );
    } else {
      setTopCategory(null);
      setAveragePrice(null);
    }
  }, [comparisonKey, filteredData]);

  const handleFilterChange = (filterType: string) => {
    setComparisonKey(filterType);
  };

  return (
    <div className="min-h-screen bg-background text-primary p-6">
      <div id="title" className="flex items-center">
        <img src="/logo.png" alt="Civision" id="logo" className="w-16 h-16 mr-4" />
        <h1 className="text-3xl font-bold">TABLEAU DE BORD</h1>
      </div>
      <div id="ligne2" className="flex mt-6">
        <Filters onFilterChange={handleFilterChange} />
        <div className="ml-6">
          <PriceDisplay
            topCategory={topCategory}
            averagePrice={averagePrice}
            comparisonKey={comparisonKey}
          />
        </div>
      </div>
      <Charts data={filteredData} comparisonKey={comparisonKey} />
    </div>
  );
};

export default Home;
