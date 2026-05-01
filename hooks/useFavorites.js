import { useState, useEffect } from "react";

const STORAGE_KEY = "pokedex-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch (e) {
      console.error("Failed to load favorites:", e);
    }
  }, []);

  function toggleFavorite(pokemonId) {
    setFavorites((prev) => {
      const next = prev.includes(pokemonId)
        ? prev.filter((id) => id !== pokemonId)
        : [...prev, pokemonId];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error("Failed to save favorites:", e);
      }
      return next;
    });
  }

  function isFavorite(pokemonId) {
    return favorites.includes(pokemonId);
  }

  return { favorites, toggleFavorite, isFavorite };
}
