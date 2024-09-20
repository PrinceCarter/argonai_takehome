import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import synonyms from "./synonyms.js";

// Load data from database (JSON file)
const data = JSON.parse(readFileSync("./data.json", "utf-8"));

// Define GraphQL schema
const typeDefs = `#graphql
  type IdentificationModule {
    nctId: String!
    briefTitle: String!
    officialTitle: String!
  }

  type ConditionsModule {
    conditions: [String!]!
  }

  type ProtocolSection {
    identificationModule: IdentificationModule!
    conditionsModule: ConditionsModule!
  }

  type Study {
    protocolSection: ProtocolSection!
    hasResults: Boolean!
  }

  type StudyResults {
    totalCount: Int!
    studies: [Study!]!
  }

  type Query {
    searchStudies(disease: String!, limit: Int!, offset: Int!): StudyResults!
    allStudies: [Study!]!
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    searchStudies: (
      _: any,
      {
        disease,
        limit = 10,
        offset = 0,
      }: { disease: string; limit: number; offset: number }
    ) => {

      // Normalize the search term
      const searchTerm = disease.toLowerCase();

      // Get synonyms for the search term, if any
      let terms = [searchTerm];
      for (const [key, values] of Object.entries(synonyms)) {
        if (key === searchTerm || values.includes(searchTerm)) {
          terms = [key, ...values];
          break;
        }
      }

      // Remove duplicates and ensure all terms are lowercase
      terms = [...new Set(terms.map((term) => term.toLowerCase()))];

      // Filter studies where any condition matches any of the terms
      const filteredStudies = data.filter((study: any) => {
        const conditionsModule = study.protocolSection?.conditionsModule;

        // Skip studies without conditions module
        if (!conditionsModule || !conditionsModule.conditions) {
          return false;
        }

        // Check if any condition matches any of the terms
        const conditions = conditionsModule.conditions.map((cond: string) =>
          cond.toLowerCase()
        );

        // Return true if any term matches any condition
        return terms.some((term: string) => conditions.includes(term));
      });

      // Apply pagination
      const paginatedStudies = filteredStudies.slice(offset, offset + limit);
      return {
        totalCount: filteredStudies.length,
        studies: paginatedStudies,
      };
    },
    allStudies: () => data,
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
