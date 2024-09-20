import { gql } from '@apollo/client';

// Search for clinical trials based on a single disease with pagination (limit and offset)
export const SEARCH_STUDIES = gql`
  query SearchStudies($disease: String!, $limit: Int!, $offset: Int!) {
    searchStudies(disease: $disease, limit: $limit, offset: $offset) {
      totalCount
      studies {
        protocolSection {
          identificationModule {
            nctId
            briefTitle
            officialTitle
          }
        }
        hasResults
      }
    }
  }
`;