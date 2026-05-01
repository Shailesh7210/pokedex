import { useState, useEffect } from "react";
import { fetchPokemonDetail, getPokemonImageUrl, getPokemonFallbackUrl } from "../lib/pokeapi";
import { TYPE_COLORS } from "./TypeFilter";
import styles from "../styles/PokemonModal.module.css";

const STAT_LABELS = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

const STAT_COLORS = {
  hp: "#FF5959",
  attack: "#F5AC78",
  defense: "#FAE078",
  "special-attack": "#9DB7F5",
  "special-defense": "#A7DB8D",
  speed: "#FA92B2",
};

export default function PokemonModal({ pokemonId, isFavorite, onToggleFavorite, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        setData(null);
        setImgError(false);
        const detail = await fetchPokemonDetail(pokemonId);
        setData(detail);
      } catch (e) {
        setError("Failed to load Pokémon details.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [pokemonId]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const imgSrc = data
    ? imgError
      ? getPokemonFallbackUrl(data.id)
      : getPokemonImageUrl(data.id)
    : null;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal} role="dialog" aria-modal="true">
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          ✕
        </button>

        {loading && (
          <div className={styles.loadingWrap}>
            <div className={styles.spinner} />
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className={styles.errorWrap}>
            <p>{error}</p>
            <button onClick={onClose}>Close</button>
          </div>
        )}

        {data && !loading && (
          <>
            <div className={styles.header}>
              <img
                src={imgSrc}
                alt={data.name}
                className={styles.sprite}
                onError={() => setImgError(true)}
              />
              <div className={styles.titleBlock}>
                <p className={styles.number}>#{String(data.id).padStart(4, "0")}</p>
                <h2 className={styles.name}>{data.name}</h2>
                <div className={styles.types}>
                  {data.types.map((t) => (
                    <span
                      key={t.type.name}
                      className={styles.typeBadge}
                      style={{ background: TYPE_COLORS[t.type.name] || "#888" }}
                    >
                      {t.type.name}
                    </span>
                  ))}
                </div>
                <button
                  className={`${styles.favBtn} ${isFavorite ? styles.favBtnActive : ""}`}
                  onClick={() => onToggleFavorite(data.id)}
                >
                  {isFavorite ? "❤️ Saved" : "🤍 Save"}
                </button>
              </div>
            </div>

            <div className={styles.body}>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Height</span>
                  <span className={styles.infoValue}>{(data.height / 10).toFixed(1)}m</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Weight</span>
                  <span className={styles.infoValue}>{(data.weight / 10).toFixed(1)}kg</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Base XP</span>
                  <span className={styles.infoValue}>{data.base_experience ?? "—"}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Order</span>
                  <span className={styles.infoValue}>#{data.order}</span>
                </div>
              </div>

              <h3 className={styles.sectionTitle}>Abilities</h3>
              <div className={styles.abilities}>
                {data.abilities.map((a) => (
                  <span key={a.ability.name} className={styles.abilityBadge}>
                    {a.ability.name}
                    {a.is_hidden && <em> (hidden)</em>}
                  </span>
                ))}
              </div>

              <h3 className={styles.sectionTitle}>Base Stats</h3>
              <div className={styles.stats}>
                {data.stats.map((s) => {
                  const key = s.stat.name;
                  const val = s.base_stat;
                  const pct = Math.min(100, Math.round((val / 255) * 100));
                  return (
                    <div key={key} className={styles.statRow}>
                      <span className={styles.statName}>{STAT_LABELS[key] || key}</span>
                      <span className={styles.statVal}>{val}</span>
                      <div className={styles.statBarBg}>
                        <div
                          className={styles.statBarFill}
                          style={{
                            width: `${pct}%`,
                            background: STAT_COLORS[key] || "#aaa",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
