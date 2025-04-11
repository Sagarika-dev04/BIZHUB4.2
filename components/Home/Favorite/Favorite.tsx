"use client";

import { useState, useTransition } from "react";
import { FiHeart } from "react-icons/fi";

type Props = {
  businessId: string;
  isFavorite: boolean;
};

export default function FavoriteButton({ businessId, isFavorite }: Props) {
  const [liked, setLiked] = useState(isFavorite);
  const [isPending, startTransition] = useTransition();

  const toggleFavorite = async () => {
    startTransition(async () => {
      const res = await fetch(`/api/favorite/${businessId}`, {
        method: "POST",
      });

      if (res.ok) {
        setLiked(!liked);
      }
    });
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={isPending}
      className="p-2 rounded-full bg-gray-50 hover:cursor-pointer hover:bg-gray-100 transition" // dark background for white heart to show
      title="Add to favorites"
    >
      <FiHeart
        className={`w-6 h-6 transition ${
          liked ? "text-red-500 fill-red-500" : "text-white"
        }`}
      />
    </button>
  );
}
