"use client";

import { lazy, Suspense, useState, useEffect } from "react";

const LiveChatLazy = lazy(() => import("./LiveChat"));

const DeferredLiveChat = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // 1. Defer loading of non-critical chat component by 3 seconds
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 3000);

    // 2. Load immediately if the user interacts with the page
    const triggerLoad = () => {
      setShouldLoad(true);
      cleanup();
    };

    const cleanup = () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", triggerLoad);
      window.removeEventListener("mousemove", triggerLoad);
      window.removeEventListener("touchstart", triggerLoad);
    };

    window.addEventListener("scroll", triggerLoad, { passive: true });
    window.addEventListener("mousemove", triggerLoad, { passive: true });
    window.addEventListener("touchstart", triggerLoad, { passive: true });

    return cleanup;
  }, []);

  if (!shouldLoad) return null;

  return (
    <Suspense fallback={null}>
      <LiveChatLazy />
    </Suspense>
  );
};

export default DeferredLiveChat;
