'use client';

import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  rootId?: string;
}

export const Portal = ({ children, rootId }: PortalProps) => {
  const container = rootId ? document.getElementById(rootId) : document.body;
  return createPortal(children, container || document.body);
};
