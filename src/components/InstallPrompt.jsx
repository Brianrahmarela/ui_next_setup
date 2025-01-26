'use client'
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsDialogOpen(true); // Buka dialog custom
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
      setDeferredPrompt(null); // Reset
      setIsDialogOpen(false); // Tutup dialog
    }
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger />
        <DialogContent>
          <p>Tambahkan aplikasi ke layar utama Anda untuk pengalaman yang lebih baik.</p>
          <DialogFooter>
            <button onClick={handleInstallClick}>
              Install Sekarang
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
