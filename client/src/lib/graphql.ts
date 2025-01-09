import { gql } from '@apollo/client';

export const GET_ANIMALS = gql`
  query GetAnimals {
    animals {
      id
      name
      species
      age
      diet
      health
      habitat
      description
      imageUrl
      createdAt
      updatedAt
    }
  }
`;

export const GET_ANIMAL = gql`
  query GetAnimal($id: ID!) {
    animal(id: $id) {
      id
      name
      species
      age
      diet
      health
      habitat
      description
      imageUrl
      createdAt
      updatedAt
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
      health
      habitat
      description
      imageUrl
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_ANIMAL = gql`
  mutation UpdateAnimal($id: ID!, $input: AnimalInput!) {
    updateAnimal(id: $id, input: $input) {
      id
      name
      species
      age
      diet
      health
      habitat
      description
      imageUrl
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_ANIMAL = gql`
  mutation DeleteAnimal($id: ID!) {
    deleteAnimal(id: $id)
  }
`;
