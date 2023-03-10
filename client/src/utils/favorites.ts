import { FavoriteEvent } from "../components/routes/Favorites";

const key = "favorites";

const getFavorites: () => FavoriteEvent[] = () => {
  const favorites = localStorage.getItem(key);
  return favorites ? JSON.parse(favorites) : [];
};

const isFavorite = (id: string) => {
  const favorites = getFavorites();
  return favorites.some((f) => f.id === id);
};

const addToFavorite = (item: FavoriteEvent) => {
  if (isFavorite(item.id)) return;

  const favorites = getFavorites();
  favorites.push(item);

  localStorage.setItem(key, JSON.stringify(favorites));
};

const removeFromFavorite = (id: string) => {
  if (!isFavorite(id)) return;

  const favorites = getFavorites();
  const index = favorites.findIndex((f) => f.id === id);

  if (index >= 0) {
    favorites.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(favorites));
  }
};
export { getFavorites, isFavorite, addToFavorite, removeFromFavorite };
