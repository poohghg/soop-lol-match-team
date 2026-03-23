import { IS_NODE } from '@/src/shared/constant';
import { useEffect, useState } from 'react';

export const useWindowSizes = () => {
  const [windowSizes, setWindowSizes] = useState({
    width: IS_NODE ? 0 : window.innerWidth,
    height: IS_NODE ? 0 : window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSizes({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSizes;
};
