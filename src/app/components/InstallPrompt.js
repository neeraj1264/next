"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function InstallPrompt() {
  const [prompt, setPrompt] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const pathname = usePathname();

  // Detect iOS Safari
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isIOS && isSafari) {
      setIsIos(true);
      if (pathname === "/") setVisible(true);
    }
  }, [pathname]);

  // Android: Handle beforeinstallprompt
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPrompt(e);
      if (pathname === "/") setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [pathname]);

  // Lock scroll when visible
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "auto";
  }, [visible]);

  const handleInstall = () => {
    if (!prompt) return;
    prompt.prompt();
    prompt.userChoice.then((choice) => {
      if (choice.outcome === "accepted") {
        console.log("App installed");
      }
      setPrompt(null);
      setVisible(false);
    });
  };

  const handleClose = () => {
    setPrompt(null);
    setVisible(false);
    setIsIos(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === "install-backdrop") {
      handleClose();
    }
  };

  if (!visible || pathname !== "/") return null;

  return (
    <div
      id="install-backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-40 bg-black bg-opacity-70 flex items-start justify-center pt-24 backdrop-blur-sm"
    >
      <div
        className="bg-white rounded-md shadow-xl p-6 w-11/12 max-w-md animate-slideDown relative"
        style={{ animation: "slideDown 0.5s ease-out" }}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
        >
          &times;
        </button>

        {isIos ? (
          <>
            <p className="text-gray-900 mb-4 font-semibold text-center text-lg">
              Install Treasured Care
            </p>
            <p className="text-sm text-gray-700 text-center mb-2">
              Tap <strong>Share</strong> icon <span className="text-xl">🔗</span> and choose <strong>"Add to Home Screen"</strong>
            </p>
          </>
        ) : (
          <>
            <p className="text-gray-900 mb-4 font-semibold text-center text-lg">
              Install Treasured Care
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleInstall}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Install App
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
