import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DELETE_ANIMAL = gql`
  mutation DeleteAnimal($id: Int!) {
    deleteAnimal(id: $id)
  }
`;

export default function AnimalCard({ animal }: { animal: any }) {
  const { toast } = useToast();
  const [deleteAnimal] = useMutation(DELETE_ANIMAL, {
    refetchQueries: ["GetAnimals"],
  });

  const handleDelete = async () => {
    try {
      await deleteAnimal({
        variables: { id: animal.id },
      });
      toast({
        title: "Animal deleted",
        description: `${animal.name} has been removed from the system.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete animal",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{animal.name}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Badge variant="secondary">{animal.species}</Badge>
            <Badge variant="outline">{animal.age} years old</Badge>
          </div>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-semibold">Diet:</span> {animal.diet}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Habitat:</span> {animal.habitat}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Health:</span>{" "}
              {animal.health_status}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
