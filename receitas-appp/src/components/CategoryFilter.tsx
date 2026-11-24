interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="chips" role="group" aria-label="Filtrar por categoria">
      <button
        type="button"
        className={`chip ${selected === "" ? "chip--active" : ""}`}
        onClick={() => onChange("")}
      >
        Todas
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`chip ${selected === category ? "chip--active" : ""}`}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
