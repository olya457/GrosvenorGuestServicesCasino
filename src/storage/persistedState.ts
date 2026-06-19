import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect, useState} from 'react';

export const storageKeys = {
  onboardingComplete: 'grosvenor_guest_services_onboarding_complete',
  doNotDisturb: 'grosvenor_guest_services_do_not_disturb',
  quickRequests: 'grosvenor_guest_services_quick_requests',
  cart: 'grosvenor_guest_services_cart',
  climate: 'grosvenor_guest_services_climate',
};

export async function readBoolean(key: string, fallback = false) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value === null ? fallback : value === 'true';
  } catch {
    return fallback;
  }
}

export async function writeBoolean(key: string, value: boolean) {
  await AsyncStorage.setItem(key, value ? 'true' : 'false');
}

export function useStoredState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let mounted = true;

    AsyncStorage.getItem(key)
      .then(stored => {
        if (!mounted) {
          return;
        }

        if (stored !== null) {
          setValue(JSON.parse(stored) as T);
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (mounted) {
          setHydrated(true);
        }
      });

    return () => {
      mounted = false;
    };
  }, [key]);

  const saveValue = useCallback(
    (nextValue: T | ((current: T) => T)) => {
      setValue(current => {
        const resolved =
          typeof nextValue === 'function'
            ? (nextValue as (current: T) => T)(current)
            : nextValue;

        AsyncStorage.setItem(key, JSON.stringify(resolved)).catch(
          () => undefined,
        );

        return resolved;
      });
    },
    [key],
  );

  return [value, saveValue, hydrated] as const;
}
