import { AnimalCard } from "./AnimalCard";
import type { Animal } from "@db/schema";

interface AnimalGridProps {
  animals: Animal[];
  onEdit: (animal: Animal) => void;
  onDelete: (id: number) => void;
}

export function AnimalGrid({ animals, onEdit, onDelete }: AnimalGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {animals.map((animal) => (
        <AnimalCard
          key={animal.id}
          animal={animal}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
