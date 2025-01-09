import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import type { Animal } from "@db/schema";

interface AnimalCardProps {
  animal: Animal;
  onEdit: (animal: Animal) => void;
  onDelete: (id: number) => void;
}

export function AnimalCard({ animal, onEdit, onDelete }: AnimalCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{animal.name}</span>
            <span className="text-sm font-normal text-muted-foreground">{animal.species}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>Age:</strong> {animal.age} years</p>
            <p><strong>Diet:</strong> {animal.diet}</p>
            <p><strong>Health:</strong> {animal.health}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setShowDetails(true)}>
            View Details
          </Button>
          <div className="space-x-2">
            <Button variant="secondary" onClick={() => onEdit(animal)}>
              Edit
            </Button>
            <Button variant="destructive" onClick={() => onDelete(animal.id)}>
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{animal.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {animal.imageUrl && (
              <img 
                src={animal.imageUrl} 
                alt={animal.name} 
                className="w-full h-48 object-cover rounded-lg"
              />
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Species</h3>
                <p>{animal.species}</p>
              </div>
              <div>
                <h3 className="font-semibold">Age</h3>
                <p>{animal.age} years</p>
              </div>
              <div>
                <h3 className="font-semibold">Diet</h3>
                <p>{animal.diet}</p>
              </div>
              <div>
                <h3 className="font-semibold">Health</h3>
                <p>{animal.health}</p>
              </div>
              <div>
                <h3 className="font-semibold">Habitat</h3>
                <p>{animal.habitat}</p>
              </div>
            </div>
            {animal.description && (
              <div>
                <h3 className="font-semibold">Description</h3>
                <p>{animal.description}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
