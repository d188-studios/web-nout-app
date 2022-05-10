import { useEffect, useState } from 'react';
import { isMobile } from '../utils/isMobile';

export function useIsMobile(width?: number) {
  const [mobile, setMobile] = useState(isMobile(width));

  useEffect(() => {
    const onResize = () => {
      setMobile(isMobile(width));
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

  return mobile;
}
