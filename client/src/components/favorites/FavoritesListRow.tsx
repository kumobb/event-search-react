import React from "react";
import { FavoriteEvent } from "../routes/Favorites";
import DeleteIcon from "@mui/icons-material/Delete";

const FavoriteListRow = ({
  index,
  favoriteEvent,
  onDelete,
}: {
  index: number;
  favoriteEvent: FavoriteEvent;
  onDelete: (id: string) => void;
}) => {
  const handleDelete = () => {
    onDelete(favoriteEvent.id);
  };

  return (
    <tr>
      <td>{index}</td>
      <td>{favoriteEvent.date}</td>
      <td>{favoriteEvent.event}</td>
      <td>{favoriteEvent.category}</td>
      <td>{favoriteEvent.venue}</td>
      <td>
        <span role="button" onClick={handleDelete}>
          <DeleteIcon />
        </span>
      </td>
    </tr>
  );
};

export default FavoriteListRow;
