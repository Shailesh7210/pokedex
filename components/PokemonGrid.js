import PokemonCard from "./PokemonCard";
import styles from "../styles/Home.module.css";

export default function PokemonGrid({ pokemon, isFavorite, onToggleFavorite, onSelect }) {
  return (
    <div className={styles.grid}>
      {pokemon.map((p) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          isFavorite={isFavorite(p.id)}
          onToggleFavorite={onToggleFavorite}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
