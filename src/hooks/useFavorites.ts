import { useCallback, useEffect, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "@raycast/api";

export type FavList = string[];

const stripFavs = (lists: (FavList | undefined)[], favs: FavList): FavList[] => {
  return lists.map((orig) => (orig === undefined ? [] : orig.filter((item) => !(favs ?? []).includes(item))));
};

const getFavs = async (key: string): Promise<FavList> => {
  const val: string | undefined = await getLocalStorageItem(key);
  return JSON.parse(val ?? "[]") ?? [];
};

const updateFavs = async (key: string, favs: FavList): Promise<void> => {
  await setLocalStorageItem(key, JSON.stringify(favs));
};

export function useFavorites(
  key: string,
  ...lists: (FavList | undefined)[]
): [
  FavList,
  FavList[],
  (...rest: (FavList | undefined)[]) => void,
  (item: string) => Promise<void>,
  (item: string) => Promise<void>,
  () => Promise<void>
] {
  const [allLists, setAll] = useState(lists);
  const [favs, setFavs] = useState<FavList>([]);

  useEffect(() => {
    getFavs(key).then((favs) => setFavs(favs));
  }, [key]);

  const setLists = useCallback((...rest: (FavList | undefined)[]) => setAll(rest), [key]);

  const addFav = useCallback(
    async (item: string) => {
      const favs = await getFavs(key);
      if (!favs.includes(item)) {
        favs.push(item);
      }
      updateFavs(key, favs).then(() => setFavs(favs));
    },
    [key]
  );

  const remFav = useCallback(
    async (item: string) => {
      const favs = (await getFavs(key)).filter((fav) => fav !== item);
      updateFavs(key, favs).then(() => setFavs(favs));
    },
    [key, allLists]
  );

  const resetFavs = useCallback(async () => {
    await updateFavs(key, [] as FavList);
    setFavs([] as FavList);
  }, [key, allLists]);

  return [favs || [], stripFavs(allLists, favs), setLists, addFav, remFav, resetFavs];
}
