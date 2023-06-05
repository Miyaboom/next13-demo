import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function usePageView() {
  const pathName = usePathname();

  useEffect(() => {
    if (pathName) {
      window.dataLayer.push({
        event: 'virtual_page_view',
        custom_param: 'custom_value'
      });
    }
  }, [pathName]);
}
