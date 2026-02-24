"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy } from "lucide-react";

interface AchievementToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

export function AchievementToast({ message, show, onClose }: AchievementToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border bg-card px-5 py-3 shadow-lg"
        >
          <div className="flex items-center justify-center size-8 rounded-full bg-amber-500/10">
            <Trophy className="size-4 text-amber-500" />
          </div>
          <div>
            <p className="text-sm font-medium">Achievement Unlocked!</p>
            <p className="text-xs text-muted-foreground">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
