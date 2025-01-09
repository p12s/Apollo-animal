import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
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
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  species: z.string().min(1, "Species is required"),
  age: z.coerce.number().min(0, "Age must be a positive number"),
  diet: z.string().min(1, "Diet is required"),
  habitat: z.string().min(1, "Habitat is required"),
  health_status: z.string().min(1, "Health status is required"),
});

const CREATE_ANIMAL = gql`
  mutation CreateAnimal($input: AnimalInput!) {
    createAnimal(input: $input) {
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

export default function AddAnimalForm({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const { toast } = useToast();
  const [createAnimal] = useMutation(CREATE_ANIMAL, {
    refetchQueries: ["GetAnimals"],
  });

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
      await createAnimal({
        variables: { input: values },
      });
      toast({
        title: "Success",
        description: "Animal added successfully",
      });
      onComplete();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add animal",
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
                <Input type="number" min="0" {...field} />
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
              <FormControl>
                <Input placeholder="Enter diet details" {...field} />
              </FormControl>
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
              <FormControl>
                <Input placeholder="Enter habitat" {...field} />
              </FormControl>
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
              <FormControl>
                <Input placeholder="Enter health status" {...field} />
              </FormControl>
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