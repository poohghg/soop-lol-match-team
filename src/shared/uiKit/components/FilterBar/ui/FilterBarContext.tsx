import { createReactContext } from '@/src/shared/lib/reactUtils';
import { ReactNode, SetStateAction, useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';

interface FilterBarContext {
  selectedValue: string;
  deferredSelectedValue: string;
  setSelectedValue: (next: SetStateAction<string>) => void;
}

const [Provider, useFilterBarContext] = createReactContext<FilterBarContext>({
  name: 'FilterBarContext',
  errorMessage: 'useFilterBarContext: `context` is undefined. Seems you forgot to wrap all components in <FilterBar />',
});

interface FilterBarProviderProps {
  children: ReactNode;
  defaultValue: string;
  onChange?: (value: string) => void;
}

const FilterBarContextProvider = ({ children, defaultValue, onChange }: FilterBarProviderProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);
  const deferredSelectedValue = useDeferredValue(selectedValue);

  const handleSetSelect = useCallback(
    (next: SetStateAction<string>) => {
      const nextValue = typeof next === 'function' ? next(selectedValue) : next;
      setSelectedValue(nextValue);
    },
    [selectedValue]
  );

  const value = useMemo(
    () => ({
      selectedValue,
      deferredSelectedValue,
      setSelectedValue: handleSetSelect,
    }),
    [selectedValue, deferredSelectedValue, handleSetSelect]
  );

  useEffect(() => {
    if (onChange) {
      onChange(deferredSelectedValue);
    }
  }, [deferredSelectedValue, onChange]);

  return <Provider value={value}>{children}</Provider>;
};

export { useFilterBarContext, FilterBarContextProvider };
