import styles from "../styles/Home.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.loaderWrap}>
      <div className={styles.pokeball}>
        <div className={styles.pokeballTop} />
        <div className={styles.pokeballBottom} />
        <div className={styles.pokeballCenter} />
      </div>
      <p className={styles.loaderText}>Loading Pokémon...</p>
    </div>
  );
}
