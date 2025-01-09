# Zoo animal Management Application with GraphQL and React

Build a full-stack animal management application with the following features:

1. Backend (Apollo GraphQL Server):
- Set up a GraphQL server using Apollo Server
- Define Animal type with fields: id (uuid), name, breed, and birth date
- Implement Query type with:
  - animals: Returns all animals
  - animal(id: ID!): Returns a specific animal by ID
- Implement Mutation type with:
  - createAnimal(input: CreateAnimalInput!): Creates a new animal
- Add authentication middleware that requires a Bearer token "54321-this-is-secret-token"
- Return 401 Unauthorized for missing or invalid tokens

2. Frontend (React + shadcn/ui):
- Create a responsive layout with multiple sections
- Implement components:
  - AnimalSearch: Search for animals by ID
  - AnimalDetails: Display detailed animal information
  - AddAnimalForm: Form to add new animals
  - Home: Main page with all components
- Use react-query for data fetching
- Add proper error handling and loading states
- Include authentication token in all GraphQL requests

3. Features:
- View all animals in a grid layout with cards
- Click on an animal card to view details in a modal
- Search for animals by ID with error handling for non-existent animals
- Add new animals with validation:
  - Name and breed and birth date required
  - Year between 1950 and current year
- Display appropriate error messages for:
  - Authentication failures
  - Invalid input
  - Network errors
  - Non-existent animals

4. UI/UX:
- Clean, modern design using shadcn/ui components
- Responsive grid layout
- Loading states and error messages
- Modal dialogs for detailed views
- Form validation with error messages
- Interactive hover states on cards
- Toast notifications for successful actions

Note: All GraphQL requests must include the authorization header:
`Authorization: Bearer 54321-this-is-secret-token`
