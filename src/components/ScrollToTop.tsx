import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll window to top-left instantly on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleSamePageClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (anchor) {
        const href = anchor.getAttribute("href");
        const currentPath = window.location.pathname;

        // Verify if the link destination is the same as the current pathname
        if (href === currentPath || (href && href.endsWith(currentPath))) {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }
      }
    };

    document.addEventListener("click", handleSamePageClick);
    return () => document.removeEventListener("click", handleSamePageClick);
  }, []);

  return null;
};

export default ScrollToTop;
