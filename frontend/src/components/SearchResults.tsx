import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_STUDIES } from "../queries";
import StudyList from "./StudyList";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface SearchResultsProps {
  disease: string;
}

// Define the limit of results to fetch
const LIMIT = 10;

const SearchResults: React.FC<SearchResultsProps> = ({ disease }) => {
  // Store cumulative results
  const [studies, setStudies] = useState<any[]>([]);

  // Store the total number of results
  const [totalResults, setTotalResults] = useState(0);

  const { loading, error, fetchMore } = useQuery(SEARCH_STUDIES, {
    variables: { disease, limit: LIMIT, offset: 0 },
    // Skip query if no disease is provided
    skip: disease.trim() === "",
    onCompleted: (data) => {
      setStudies(data.searchStudies.studies);
      setTotalResults(data.searchStudies.totalCount);
    },
  });

  // Fetch more results starting from the current length of studies
  const handleLoadMore = () => {
    fetchMore({
      variables: {
        offset: studies.length,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        // Append the new studies to the existing ones
        setStudies([...studies, ...fetchMoreResult.searchStudies.studies]);
      },
    });
  };

  // If the query is still loading, display a loading spinner
  if (loading) return <Progress className="mx-auto" />;

  // If an error occurs, display an error message
  if (error) return <p className="text-red-500 text-center">Error: {error.message}.</p>;

  // If no studies are found, display a message
  if (studies.length === 0)
    return (
      <p className="text-gray-600 text-center">
        No studies found for "{disease}".
      </p>
    );

  // Cumulative number of results loaded
  const loadedResults = studies.length;

  return (
    <div className="mt-6">
      <p className="text-gray-600 text-center mb-4">
        Found {totalResults} results for "{disease}"
      </p>
      <StudyList studies={studies} />
      {loadedResults < totalResults && (
        <div className="flex flex-col justify-center mt-4">
          <p className="text-gray-600 text-center">
            Showing {loadedResults} of {totalResults} results.
          </p>
          <Button
            onClick={handleLoadMore}
            className="mt-4 w-full"
            variant="outline"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
