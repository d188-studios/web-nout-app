import { useEffect, useState } from 'react';
import { isMobile } from '../utils/isMobile';

export function useIsMobile() {
  const [mobile, setMobile] = useState(isMobile());

  useEffect(() => {
    const onResize = () => {
      setMobile(isMobile());
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

  return mobile;
}
