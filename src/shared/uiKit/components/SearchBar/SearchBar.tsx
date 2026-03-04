'use client';

import { cn } from '@/src/shared/uiKit';
import { SearchIcon } from 'lucide-react';
import React, { useDeferredValue, useEffect, useRef, useState } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (newQuery: string) => void;
  useDebounce?: boolean;
  debounceDelay?: number;
  placeholder?: string;
  className?: string;
  searchIconClassName?: string;
  inputClassName?: string;
}

const SearchBar = ({
  value,
  onChange,
  placeholder,
  className,
  searchIconClassName,
  inputClassName,
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localQuery, setLocalQuery] = useState(value);
  const deferredQuery = useDeferredValue(localQuery);

  const handleInputChange = (newQuery: string) => {
    setLocalQuery(newQuery);
  };

  useEffect(() => {
    onChange(deferredQuery);
  }, [deferredQuery, onChange]);

  return (
    <div
      className={cn(
        'relative w-full rounded-lg border border-transparent transition-all duration-150',
        'border-2 focus-within:border-blue-500',
        className
      )}
    >
      <form
        onSubmit={e => {
          e.preventDefault();
          inputRef.current?.blur();
        }}
      >
        <button
          type="button"
          className={cn(
            'absolute top-0 left-0 flex h-full w-10 items-center justify-center text-gray-400',
            searchIconClassName
          )}
          onClick={() => inputRef.current?.focus()}
        >
          <SearchIcon className={'h-5 w-5'} />
        </button>
        <input
          ref={inputRef}
          type="text"
          className={cn(
            'w-full border-none bg-transparent py-2 pr-4 pl-10 text-[14px] placeholder-gray-500 outline-none focus:ring-0',
            inputClassName
          )}
          placeholder={placeholder ?? 'Search...'}
          onChange={e => handleInputChange(e.target.value)}
          value={localQuery}
        />
      </form>
    </div>
  );
};

export default SearchBar;
