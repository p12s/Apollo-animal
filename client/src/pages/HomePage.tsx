import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ANIMALS, CREATE_ANIMAL, UPDATE_ANIMAL, DELETE_ANIMAL } from "@/lib/graphql";
import { AnimalSearch } from "@/components/AnimalSearch";
import { AnimalGrid } from "@/components/AnimalGrid";
import { AnimalForm } from "@/components/AnimalForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import type { Animal } from "@db/schema";
import { Loader2 } from "lucide-react";

export function HomePage() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | undefined>();
  const { toast } = useToast();

  const { data, loading, error } = useQuery(GET_ANIMALS);

  const [createAnimal] = useMutation(CREATE_ANIMAL, {
    refetchQueries: [{ query: GET_ANIMALS }],
  });

  const [updateAnimal] = useMutation(UPDATE_ANIMAL, {
    refetchQueries: [{ query: GET_ANIMALS }],
  });

  const [deleteAnimal] = useMutation(DELETE_ANIMAL, {
    refetchQueries: [{ query: GET_ANIMALS }],
  });

  const filteredAnimals = data?.animals.filter((animal: Animal) =>
    animal.name.toLowerCase().includes(search.toLowerCase()) ||
    animal.species.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const handleSubmit = async (formData: Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (selectedAnimal) {
        await updateAnimal({
          variables: {
            id: selectedAnimal.id,
            input: formData,
          },
        });
        toast({
          title: "Success",
          description: "Animal updated successfully",
        });
      } else {
        await createAnimal({
          variables: {
            input: formData,
          },
        });
        toast({
          title: "Success",
          description: "Animal created successfully",
        });
      }
      setShowForm(false);
      setSelectedAnimal(undefined);
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occurred while saving the animal",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAnimal({
        variables: { id },
      });
      toast({
        title: "Success",
        description: "Animal deleted successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the animal",
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error loading animals</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Zoo Animal Management</h1>

      <AnimalSearch
        value={search}
        onChange={setSearch}
        onAddNew={() => {
          setSelectedAnimal(undefined);
          setShowForm(true);
        }}
      />

      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <AnimalGrid
          animals={filteredAnimals}
          onEdit={(animal) => {
            setSelectedAnimal(animal);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      )}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedAnimal ? 'Edit Animal' : 'Add New Animal'}
            </DialogTitle>
          </DialogHeader>
          <AnimalForm
            animal={selectedAnimal}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedAnimal(undefined);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
