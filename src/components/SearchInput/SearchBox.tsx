import React, { useState } from 'react';
import { Focus, Paperclip } from 'lucide-react';
import ActionButton from './ActionButton';
import ToggleSwitch from './ToggleSwitch';
import SearchButton from './SearchButton';
import SearchTextArea from './SearchTextArea';
import '../../styles/animations.css';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [isPro, setIsPro] = useState(false);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="relative w-full">
      <SearchTextArea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        isPro={isPro}
      />

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ActionButton
            icon={Focus}
            label="Focus"
            onClick={() => {}}
          />
          <ActionButton
            icon={Paperclip}
            label="Attach"
            onClick={() => {}}
          />
        </div>

        <div className="flex items-center gap-4">
          <ToggleSwitch
            isEnabled={isPro}
            onToggle={() => setIsPro(!isPro)}
          />
          <SearchButton
            onClick={handleSearch}
            isActive={query.trim().length > 0}
            disabled={!query.trim()}
          />
        </div>
      </div>
    </div>
  );
}