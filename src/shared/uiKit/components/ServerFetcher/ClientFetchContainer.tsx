'use client';

import { use } from 'react';

interface ClientFetchContainerProps<T> {
  promise: Promise<T>;
  children: (data: T) => React.ReactNode;
}

export const ClientFetchContainer = <T,>({ promise, children }: ClientFetchContainerProps<T>) => {
  const data = use(promise);
  return <>{children(data)}</>;
};
