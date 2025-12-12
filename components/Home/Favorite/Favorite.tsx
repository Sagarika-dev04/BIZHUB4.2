"use client";

import { useState, useTransition } from "react";
import { FiHeart } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai"; // filled heart

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
      className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition"
      title={liked ? "Remove from favorites" : "Add to favorites"}
    >
      {liked ? (
        <AiFillHeart className="w-6 h-6 text-red-500" />
      ) : (
        <FiHeart className="w-6 h-6 text-gray-600" />
      )}
    </button>
  );
}
