import { useState, useEffect } from 'react';

export interface GuestInfo {
  name: string;
  email: string;
}

const GUEST_STORAGE_KEY = 'futurelabs_guest';

export const useGuest = () => {
  const [guest, setGuest] = useState<GuestInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(GUEST_STORAGE_KEY);
    if (stored) {
      try {
        setGuest(JSON.parse(stored));
      } catch {
        localStorage.removeItem(GUEST_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const saveGuest = (info: GuestInfo) => {
    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(info));
    setGuest(info);
  };

  const clearGuest = () => {
    localStorage.removeItem(GUEST_STORAGE_KEY);
    setGuest(null);
  };

  return { guest, saveGuest, clearGuest, isLoading };
};
