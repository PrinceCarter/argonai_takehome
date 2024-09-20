import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SearchBarProps {
  onSearch: (disease: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [diseaseInput, setDiseaseInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const disease = diseaseInput.trim();
    if (disease) {
      onSearch(disease);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-5">
      <Input
        type="text"
        placeholder="Enter disease (e.g., NSCLC)"
        value={diseaseInput}
        onChange={(e) => setDiseaseInput(e.target.value)}
        className="w-80 p-2 text-lg"
      />
      <Button type="submit" className="ml-3 p-3 text-lg">
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
