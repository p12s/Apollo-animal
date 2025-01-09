import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  species: z.string().min(1, "Species is required"),
  age: z.coerce.number().min(0, "Age must be a positive number"),
  diet: z.string().min(1, "Diet is required"),
  habitat: z.string().min(1, "Habitat is required"),
  health_status: z.string().min(1, "Health status is required"),
});

const dietOptions = ["Carnivore", "Herbivore", "Omnivore", "Piscivore"];
const habitatOptions = ["Savanna", "Jungle", "Desert", "Arctic", "Grassland", "Rainforest"];
const healthOptions = ["Healthy", "Good", "Excellent", "Fair", "Poor"];

export default function AddAnimalForm({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      species: "",
      age: 0,
      diet: "",
      habitat: "",
      health_status: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Get existing animals from localStorage
      const localAnimals = JSON.parse(localStorage.getItem('localAnimals') || '[]');

      // Create new animal with unique ID
      const newAnimal = {
        ...values,
        id: Date.now().toString(), // Use timestamp as unique ID
        isLocal: true,
      };

      // Add to localStorage
      localStorage.setItem('localAnimals', JSON.stringify([...localAnimals, newAnimal]));

      toast({
        title: "Success",
        description: "Animal added successfully",
      });

      // Reset form and close dialog
      form.reset();
      onComplete();
    } catch (error) {
      console.error('Error adding animal:', error);
      toast({
        title: "Error",
        description: "Failed to add animal. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter animal name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="species"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Species</FormLabel>
              <FormControl>
                <Input placeholder="Enter species" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0" 
                  placeholder="Enter age" 
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="diet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diet</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select diet type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {dietOptions.map((diet) => (
                    <SelectItem key={diet} value={diet}>
                      {diet}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="habitat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Habitat</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select habitat" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {habitatOptions.map((habitat) => (
                    <SelectItem key={habitat} value={habitat}>
                      {habitat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="health_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Health Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select health status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {healthOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Add Animal
        </Button>
      </form>
    </Form>
  );
}