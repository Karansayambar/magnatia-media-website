import { useEffect } from "react";

export default function useScrollRestoration() {
  useEffect(() => {
    // Restore saved position on reload
    const savedScrollY = sessionStorage.getItem("scrollY");
    if (savedScrollY) {
      window.scrollTo(0, parseInt(savedScrollY, 10));
    }

    // Save current scroll before reload/close
    const handleBeforeUnload = () => {
      sessionStorage.setItem("scrollY", window.scrollY);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);
}
