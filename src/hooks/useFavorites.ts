import { useCallback, useEffect, useState } from "react";
import { LocalStorage } from "@raycast/api";

export type FavList = string[];

const stripFavs = (lists: (FavList | undefined)[], favs: FavList): FavList[] => {
  return lists.map((orig) => (orig === undefined ? [] : orig.filter((item) => !(favs ?? []).includes(item))));
};

const getFavs = async (key: string): Promise<FavList> => {
  const val: string | undefined = await LocalStorage.getItem(key);
  return JSON.parse(val ?? "[]") ?? [];
};

const updateFavs = async (key: string, favs: FavList): Promise<void> => {
  await LocalStorage.setItem(key, JSON.stringify(favs));
};

export function useFavorites(
  key: string,
  ...lists: (FavList | undefined)[]
): [
  FavList,
  FavList[],
  (...rest: (FavList | undefined)[]) => void,
  {
    add: (item: string) => Promise<void>,
    remove: (item: string) => Promise<void>,
    reset: () => Promise<void>,
  },
] {
  const [allLists, setAll] = useState(lists);
  const [favs, setFavs] = useState<FavList>([]);

  useEffect(() => {
    getFavs(key).then((favs) => setFavs(favs));
  }, [key]);

  const setLists = useCallback((...rest: (FavList | undefined)[]) => setAll(rest), [key]);

  const add = useCallback(
    async (item: string) => {
      const favs = await getFavs(key);
      if (!favs.includes(item)) {
        favs.push(item);
      }
      updateFavs(key, favs).then(() => setFavs(favs));
    },
    [key]
  );

  const remove = useCallback(
    async (item: string) => {
      const favs = (await getFavs(key)).filter((fav) => fav !== item);
      updateFavs(key, favs).then(() => setFavs(favs));
    },
    [key, allLists]
  );

  const reset = useCallback(async () => {
    await updateFavs(key, [] as FavList);
    setFavs([] as FavList);
  }, [key, allLists]);

  return [favs || [], stripFavs(allLists, favs), setLists, { add, remove, reset}];
}
