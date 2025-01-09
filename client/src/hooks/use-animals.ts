import { useQuery, useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

export const GET_ANIMALS = gql`
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

export const GET_ANIMAL = gql`
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

export const CREATE_ANIMAL = gql`
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

export const UPDATE_ANIMAL = gql`
  mutation UpdateAnimal($id: Int!, $input: AnimalInput!) {
    updateAnimal(id: $id, input: $input) {
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

export const DELETE_ANIMAL = gql`
  mutation DeleteAnimal($id: Int!) {
    deleteAnimal(id: $id)
  }
`;

export function useAnimals() {
  const { data, loading, error } = useQuery(GET_ANIMALS);
  return {
    animals: data?.animals ?? [],
    loading,
    error,
  };
}

export function useAnimal(id: number) {
  const { data, loading, error } = useQuery(GET_ANIMAL, {
    variables: { id },
  });
  return {
    animal: data?.animal,
    loading,
    error,
  };
}

export function useCreateAnimal() {
  return useMutation(CREATE_ANIMAL, {
    refetchQueries: [{ query: GET_ANIMALS }],
  });
}

export function useUpdateAnimal() {
  return useMutation(UPDATE_ANIMAL, {
    refetchQueries: [{ query: GET_ANIMALS }],
  });
}

export function useDeleteAnimal() {
  return useMutation(DELETE_ANIMAL, {
    refetchQueries: [{ query: GET_ANIMALS }],
  });
}
