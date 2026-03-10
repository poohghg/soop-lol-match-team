import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  rootId?: string;
}

export const Portal = ({ children, rootId = 'portal-root' }: PortalProps) => {
  const portalRoot = document.getElementById(rootId);
  const container = portalRoot ? portalRoot : document.body;
  return createPortal(children, container);
};
