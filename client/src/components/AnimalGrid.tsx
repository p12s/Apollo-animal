import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import AnimalCard from "./AnimalCard";
import { Skeleton } from "@/components/ui/skeleton";

const GET_ALL_ANIMALS = gql`
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

const GET_ANIMAL_BY_ID = gql`
  query GetAnimal($id: Int!) {
    animal(id: $id) {
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
  // Query for all animals or specific animal based on search term
  const queryToUse = searchTerm ? GET_ANIMAL_BY_ID : GET_ALL_ANIMALS;
  const variables = searchTerm ? { id: parseInt(searchTerm) } : undefined;

  const { loading, error, data } = useQuery(queryToUse, {
    variables,
    skip: searchTerm !== "" && isNaN(parseInt(searchTerm))
  });

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
    return (
      <div className="text-center text-red-500">
        {error.message.includes("404") 
          ? "Animal not found" 
          : "Error loading animals"}
      </div>
    );
  }

  const animals = searchTerm && data?.animal 
    ? [data.animal] 
    : data?.animals || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {animals.map((animal: any) => (
        <AnimalCard 
          key={animal.id} 
          animal={animal}
        />
      ))}
      {searchTerm && animals.length === 0 && (
        <div className="col-span-full text-center text-gray-500">
          No animal found with ID: {searchTerm}
        </div>
      )}
    </div>
  );
}