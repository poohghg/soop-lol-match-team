'use client';

import dynamic from 'next/dynamic';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  rootId?: string;
}

const PortalComponet = ({ children, rootId }: PortalProps) => {
  const container = rootId ? document.getElementById(rootId) : document.body;
  return createPortal(children, container || document.body);
};

export const Portal = dynamic(() => Promise.resolve(PortalComponet), {
  ssr: false,
});
