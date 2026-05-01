import { useState } from "react";
import { getPokemonImageUrl, getPokemonFallbackUrl } from "../lib/pokeapi";
import styles from "../styles/PokemonCard.module.css";

export default function PokemonCard({ pokemon, isFavorite, onToggleFavorite, onSelect }) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = imgError
    ? getPokemonFallbackUrl(pokemon.id)
    : getPokemonImageUrl(pokemon.id);

  function handleFavClick(e) {
    e.stopPropagation();
    onToggleFavorite(pokemon.id);
  }

  return (
    <div
      className={styles.card}
      onClick={() => onSelect(pokemon.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect(pokemon.id)}
      aria-label={`View details for ${pokemon.name}`}
    >
      <button
        className={`${styles.favBtn} ${isFavorite ? styles.favBtnActive : ""}`}
        onClick={handleFavClick}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <div className={styles.imgWrap}>
        <img
          src={imgSrc}
          alt={pokemon.name}
          className={styles.img}
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </div>

      <p className={styles.number}>#{String(pokemon.id).padStart(4, "0")}</p>
      <p className={styles.name}>{pokemon.name}</p>
    </div>
  );
}
