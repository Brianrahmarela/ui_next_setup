"use client";
import { useEffect } from "react";

export default function InstallPrompt() {
  useEffect(() => {
    let deferredPrompt;

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Mencegah popup default
      deferredPrompt = e;

      const installButton = document.getElementById("install-btn");
      if (installButton) installButton.style.display = "block";

      installButton?.addEventListener("click", async () => {
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        console.log(`User choice: ${choiceResult.outcome}`);
        deferredPrompt = null;
      });
    };

    const handleAppInstalled = () => {
      console.log("PWA installed successfully!");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  return <button id="install-btn" style={{ display: "none" }}>Install App</button>;
}
