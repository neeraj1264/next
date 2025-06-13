"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function InstallPrompt() {
  const [prompt, setPrompt] = useState(null);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  // Lock scroll when modal is visible
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [visible]);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPrompt(e);

      if (pathname === "/") {
        setVisible(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [pathname]);

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
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === "install-backdrop") {
      handleClose();
    }
  };

  if (!prompt || !visible || pathname !== "/") return null;

  return (
    <div
      id="install-backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-40 bg-black bg-opacity-70 flex items-start justify-center pt-8 backdrop-blur-sm"
    >
      <div
        className="bg-white flex items-baseline justify-around rounded-md shadow-xl pb-2 pt-4 px-4 flex max-w-md animate-slideDown relative"
        style={{ animation: "slideDown 0.5s ease-out" }}
      >
        <p className="text-gray-900 mb-4 font-semibold text-center text-sm md:text-base">
          Download Our Application
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleInstall}
            className="bg-blue-600 text-white ml-4 px-4 py-2 rounded hover:bg-blue-700 transition text-sm md:text-base"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}
