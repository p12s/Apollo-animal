import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useState, useEffect } from "react";
import AnimalCard from "./AnimalCard";
import { Skeleton } from "@/components/ui/skeleton";

const GET_ANIMALS = gql`
  query GetAnimals {
    animals {
      id
      name
      species
      age
      diet
      habitat
      health_status
    }
  }
`;

export default function AnimalGrid({ searchTerm }: { searchTerm: string }) {
  const { loading, error, data } = useQuery(GET_ANIMALS);
  const [localAnimals, setLocalAnimals] = useState<any[]>([]);
  const [allAnimals, setAllAnimals] = useState<any[]>([]);

  useEffect(() => {
    // Load animals from localStorage
    const storedAnimals = JSON.parse(localStorage.getItem('localAnimals') || '[]');
    setLocalAnimals(storedAnimals);
  }, []);

  useEffect(() => {
    // Combine server animals with local animals
    const serverAnimals = data?.animals || [];
    setAllAnimals([...serverAnimals, ...localAnimals]);
  }, [data, localAnimals]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[200px] rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error loading animals</div>;
  }

  const filteredAnimals = allAnimals.filter(
    (animal: any) =>
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.species.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (animalId:string) => {
    // Reload local animals after deletion
    const storedAnimals = JSON.parse(localStorage.getItem('localAnimals') || '[]');
    const updatedAnimals = storedAnimals.filter((animal:any) => animal.id !== animalId);
    localStorage.setItem('localAnimals', JSON.stringify(updatedAnimals));
    setLocalAnimals(updatedAnimals);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredAnimals.map((animal: any) => (
        <AnimalCard 
          key={`${animal.id}`} 
          animal={animal} 
          onDelete={() => handleDelete(animal.id)}
        />
      ))}
    </div>
  );
}