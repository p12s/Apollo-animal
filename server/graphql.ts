import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { db } from "@db";
import { animals, type Animal, type NewAnimal } from "@db/schema";
import { eq } from "drizzle-orm";

const typeDefs = gql`
  type Animal {
    id: Int!
    name: String!
    species: String!
    age: Int!
    diet: String!
    habitat: String!
    health_status: String!
    created_at: String!
    updated_at: String!
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
    updateAnimal(id: Int!, input: AnimalInput!): Animal!
    deleteAnimal(id: Int!): Boolean!
  }
`;

const resolvers = {
  Query: {
    animals: async () => {
      return db.select().from(animals);
    },
    animal: async (_: any, { id }: { id: number }) => {
      const [animal] = await db.select().from(animals).where(eq(animals.id, id));
      return animal;
    },
  },
  Mutation: {
    createAnimal: async (_: any, { input }: { input: NewAnimal }) => {
      const [animal] = await db.insert(animals).values(input).returning();
      return animal;
    },
    updateAnimal: async (
      _: any,
      { id, input }: { id: number; input: NewAnimal }
    ) => {
      const [animal] = await db
        .update(animals)
        .set(input)
        .where(eq(animals.id, id))
        .returning();
      return animal;
    },
    deleteAnimal: async (_: any, { id }: { id: number }) => {
      await db.delete(animals).where(eq(animals.id, id));
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