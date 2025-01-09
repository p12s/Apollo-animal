import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";

// In-memory storage for animals
let animals = [
  { id: 1, name: "Leo", species: "Lion", age: 5, diet: "Carnivore", habitat: "Savanna", health_status: "Healthy" },
  { id: 2, name: "Dumbo", species: "Elephant", age: 10, diet: "Herbivore", habitat: "Grassland", health_status: "Good" },
  { id: 3, name: "Raja", species: "Tiger", age: 7, diet: "Carnivore", habitat: "Jungle", health_status: "Excellent" },
  { id: 4, name: "Charlie", species: "Chimpanzee", age: 4, diet: "Omnivore", habitat: "Rainforest", health_status: "Good" },
  { id: 5, name: "Penny", species: "Penguin", age: 3, diet: "Piscivore", habitat: "Arctic", health_status: "Healthy" },
  { id: 6, name: "Ziggy", species: "Zebra", age: 6, diet: "Herbivore", habitat: "Savanna", health_status: "Good" },
  { id: 7, name: "Koko", species: "Gorilla", age: 8, diet: "Herbivore", habitat: "Rainforest", health_status: "Excellent" },
  { id: 8, name: "Sandy", species: "Snake", age: 2, diet: "Carnivore", habitat: "Desert", health_status: "Good" },
  { id: 9, name: "Hopper", species: "Kangaroo", age: 4, diet: "Herbivore", habitat: "Grassland", health_status: "Healthy" },
  { id: 10, name: "Polly", species: "Parrot", age: 15, diet: "Omnivore", habitat: "Rainforest", health_status: "Good" },
];

const typeDefs = gql`
  type Animal {
    id: Int!
    name: String!
    species: String!
    age: Int!
    diet: String!
    habitat: String!
    health_status: String!
  }

  input AnimalInput {
    name: String!
    species: String!
    age: Int!
    diet: String!
    habitat: String!
    health_status: String!
  }

  type Query {
    animals: [Animal!]!
    animal(id: Int!): Animal
  }

  type Mutation {
    createAnimal(input: AnimalInput!): Animal!
    deleteAnimal(id: Int!): Boolean!
  }
`;

const resolvers = {
  Query: {
    animals: () => animals,
    animal: (_: any, { id }: { id: number }) => {
      return animals.find(animal => animal.id === id);
    },
  },
  Mutation: {
    createAnimal: (_: any, { input }: { input: Omit<typeof animals[0], 'id'> }) => {
      const newAnimal = {
        id: animals.length + 1,
        ...input,
      };
      animals.push(newAnimal);
      return newAnimal;
    },
    deleteAnimal: (_: any, { id }: { id: number }) => {
      const index = animals.findIndex(animal => animal.id === id);
      if (index === -1) return false;
      animals.splice(index, 1);
      return true;
    },
  },
};

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    return error;
  },
});