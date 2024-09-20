import React, { useState } from 'react';
import { Button } from './components/ui/button';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';

const App: React.FC = () => {
  const [disease, setDisease] = useState<string>('');
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = (searchDisease: string) => {
    setDisease(searchDisease);
    setHasSearched(true);
  };

  const handleReset = () => {
    setDisease('');
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Clinical Studies Search</h1>
        <SearchBar onSearch={handleSearch} />
        {hasSearched && (
          <div className="mt-6">
            <SearchResults disease={disease} />
            <Button variant='secondary' onClick={handleReset} className="mt-4 w-full">
              Reset Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
