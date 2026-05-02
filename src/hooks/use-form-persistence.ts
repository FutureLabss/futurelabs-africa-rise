import { useEffect } from 'react';
import { UseFormReturn, FieldValues, Path, DefaultValues } from 'react-hook-form';

export function useFormPersistence<T extends FieldValues>(
  form: UseFormReturn<T>,
  storageKey: string
) {
  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Using reset instead of setValue to handle the whole object at once correctly
        form.reset(parsedData as DefaultValues<T>);
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }
  }, [form, storageKey]);

  // Save data to localStorage on change
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem(storageKey, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form.watch, storageKey]);

  const clearPersistence = () => {
    localStorage.removeItem(storageKey);
  };

  return { clearPersistence };
}
