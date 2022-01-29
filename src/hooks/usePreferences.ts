import { useCallback, useEffect, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "@raycast/api";

type PrefList = {
  [key: string]: boolean | string;
};

const key = "app.preferences";

const getPrefs = async (): Promise<PrefList> => {
  const val: string | undefined = await getLocalStorageItem(key);
  return (JSON.parse(val ?? "{}") ?? {}) as PrefList;
};

const updatePrefs = async (prefs: PrefList): Promise<void> => {
  await setLocalStorageItem(key, JSON.stringify(prefs));
};

export function usePreferences(
  defaults: PrefList
): [PrefList, (pref: string, value: boolean | string) => Promise<void>, () => void] {
  const [prefs, setPrefs] = useState<PrefList>(defaults);

  useEffect(() => {
    getPrefs().then((prefs) => setPrefs({ ...defaults, ...prefs }));
  }, []);

  const updatePref = useCallback(async (pref: string, value: boolean | string) => {
    const prefs = await getPrefs();
    prefs[pref] = value;
    await updatePrefs(prefs);
    setPrefs(prefs);
  }, []);

  const resetPrefs = useCallback(() => {
    updatePrefs(defaults).then(() => setPrefs(defaults));
  }, [defaults]);

  return [prefs, updatePref, resetPrefs];
}