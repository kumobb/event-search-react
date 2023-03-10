import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { getFavorites, removeFromFavorite } from "../../utils/favorites";
import FavoriteListRow from "../favorites/FavoritesListRow";

interface FavoriteEvent {
  id: string;
  date: string;
  event: string;
  category: string;
  venue: string;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoriteEvent[] | null>(null);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleDelete = (id: string) => {
    alert("Removed form Favorites");
    removeFromFavorite(id);
    setFavorites(getFavorites());
  };

  if (!favorites) return <></>;

  return (
    <Container className="mt-5 main-container p-0 text-center table-container details-tab">
      {favorites.length === 0 ? (
        <p className="text-danger bg-white rounded-4">
          No favorite events to show
        </p>
      ) : (
        <>
          <h4>List of your favorite events</h4>
          <Table
            className="rounded-4 overflow-hidden bg-body"
            striped
            responsive="md"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Event</th>
                <th>Category</th>
                <th>Venue</th>
                <th>Favorite</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((f, i) => (
                <FavoriteListRow
                  key={f.id}
                  index={i + 1}
                  favoriteEvent={f}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default Favorites;
export type { FavoriteEvent };
