import React, { useEffect } from "react";

export default function useScrollToEnd(
  domElementId: string,
  callback: Function
) {
  useEffect(() => {
    const scrollableDiv = document.getElementById(domElementId);

    const handleScroll = () => {
      if (!scrollableDiv) return;
      // Total height of the content
      const scrollHeight = scrollableDiv.scrollHeight;
      // Height of the visible part of the div
      const clientHeight = scrollableDiv.clientHeight;
      // Number of pixels the content has been scrolled vertically
      const scrollTop = scrollableDiv.scrollTop;

      if (scrollTop + clientHeight + 1 > scrollHeight) {
        const scrollY = window.scrollY; // Save current scroll position
        callback();
        window.scrollTo(0, scrollY); // Restore scroll position
      }
    };

    scrollableDiv && scrollableDiv.addEventListener("scroll", handleScroll);

    return () => {
      scrollableDiv &&
        scrollableDiv.removeEventListener("scroll", handleScroll);
    };
  }, []);
}
