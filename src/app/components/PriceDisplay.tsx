import { FC } from "react";
interface PriceDisplayProps {
  topCategory: string | null;
  averagePrice: number | null;
  comparisonKey: string;
}

const PriceDisplay: FC<PriceDisplayProps> = ({
  topCategory,
  averagePrice,
  comparisonKey,
}) => {
  const formatCategoryLabel = (key: string, value: string | null): string => {
    if (!value) return "";

    switch (key) {
      case "saison":
        return `la saison : ${value}`;
      case "age":
        return `l'âge : ${value}`;
      case "niveau":
        return `le niveau : ${value}`;
      case "compte":
        return value === "true"
          ? "un client ayant un compte"
          : "un client n'ayant pas de compte";
      case "passe":
        return `le passe : ${value}`;
      default:
        return `${key} : ${value}`;
    }
  };

  return (
    <div className="p-4 bg-accent text-center rounded-lg" id="prix">
      {topCategory && averagePrice !== null ? (
        <>
          <h2 className="text-xl font-bold text-primary">
            Prix moyen d'achat pour {formatCategoryLabel(comparisonKey, topCategory)}
          </h2>
          <p className="text-lg" id="moyenne">{averagePrice.toFixed(2)} €</p>
        </>
      ) : (
        <p className="text-lg text-gray-500">Aucune donnée disponible.</p>
      )}
    </div>
  );
};

export default PriceDisplay;
