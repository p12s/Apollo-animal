import { makeExecutableSchema } from '@graphql-tools/schema';
import { animals, users } from '@db/schema';
import { db } from '@db';
import { eq } from 'drizzle-orm';

const typeDefs = `#graphql
  type Animal {
    id: ID!
    name: String!
    species: String!
    age: Int!
    diet: String!
    health: String!
    habitat: String!
    description: String
    imageUrl: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    animals: [Animal!]!
    animal(id: ID!): Animal
  }

  input AnimalInput {
    name: String!
    species: String!
    age: Int!
    diet: String!
    health: String!
    habitat: String!
    description: String
    imageUrl: String
  }

  type Mutation {
    createAnimal(input: AnimalInput!): Animal!
    updateAnimal(id: ID!, input: AnimalInput!): Animal!
    deleteAnimal(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    animals: async () => {
      return await db.select().from(animals);
    },
    animal: async (_, { id }) => {
      const [animal] = await db.select().from(animals).where(eq(animals.id, parseInt(id))).limit(1);
      return animal;
    },
  },
  Mutation: {
    createAnimal: async (_, { input }) => {
      const [animal] = await db.insert(animals).values(input).returning();
      return animal;
    },
    updateAnimal: async (_, { id, input }) => {
      const [animal] = await db
        .update(animals)
        .set({ ...input, updatedAt: new Date() })
        .where(eq(animals.id, parseInt(id)))
        .returning();
      return animal;
    },
    deleteAnimal: async (_, { id }) => {
      await db.delete(animals).where(eq(animals.id, parseInt(id)));
      return true;
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
