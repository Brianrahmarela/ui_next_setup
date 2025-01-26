'use client'
import { useState, useEffect } from "react";

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsBannerVisible(true); // Tampilkan banner
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      console.log("Hasil instalasi:", choiceResult.outcome);
      setIsBannerVisible(false); // Sembunyikan banner
      setDeferredPrompt(null); // Reset
    }
  };

  const closeBanner = () => {
    setIsBannerVisible(false); // Tutup banner tanpa instalasi
  };

  return (
    isBannerVisible && (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center">
        <span>Tambahkan aplikasi ke layar utama Anda!</span>
        <div>
          <button onClick={handleInstallClick} className="bg-blue-500 px-4 py-2 rounded">
            Install
          </button>
          <button onClick={closeBanner} className="ml-2 text-red-500">
            Tidak Sekarang
          </button>
        </div>
      </div>
    )
  );
}
