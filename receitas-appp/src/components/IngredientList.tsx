import type { Ingredient } from "../types";

interface IngredientListProps {
  ingredients: Ingredient[];
}

export default function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <ul className="ingredients">
      {ingredients.map((item, index) => (
        <li key={`${item.name}-${index}`}>
          <strong>{item.measure}</strong> {item.name}
        </li>
      ))}
    </ul>
  );
}
