import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
      <Input
        className="pl-10"
        placeholder="Search animals by name or species..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
