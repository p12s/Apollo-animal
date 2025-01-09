import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
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

  const filteredAnimals = data.animals.filter(
    (animal: any) =>
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.species.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredAnimals.map((animal: any) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </div>
  );
}
