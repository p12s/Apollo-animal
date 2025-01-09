import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface AnimalSearchProps {
  value: string;
  onChange: (value: string) => void;
  onAddNew: () => void;
}

export function AnimalSearch({ value, onChange, onAddNew }: AnimalSearchProps) {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="search"
          placeholder="Search animals..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button onClick={onAddNew}>Add New Animal</Button>
    </div>
  );
}
