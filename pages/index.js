import { useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import TypeFilter from "../components/TypeFilter";
import PokemonGrid from "../components/PokemonGrid";
import Pagination from "../components/Pagination";
import PokemonModal from "../components/PokemonModal";
import LoadingSpinner from "../components/LoadingSpinner";
import { usePokemon } from "../hooks/usePokemon";
import { useFavorites } from "../hooks/useFavorites";
import styles from "../styles/Home.module.css";

export default function Home() {
  const {
    pokemon,
    filteredPokemon,
    types,
    search,
    selectedType,
    page,
    totalPages,
    loading,
    error,
    setPage,
    handleSearchChange,
    handleTypeChange,
    totalCount,
  } = usePokemon();

  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const displayedPokemon = showFavoritesOnly
    ? pokemon.filter((p) => isFavorite(p.id))
    : pokemon;

  function handlePageChange(newPage) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Head>
        <title>Pokédex Lite</title>
        <meta name="description" content="A Pokédex web app built with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Navbar />

        <main className={styles.main}>
          <div className={styles.hero}>
            <h1 className={styles.heroTitle}>
              Pokédex <span>Lite</span>
            </h1>
            <p className={styles.heroSub}>
              Discover, search, and collect your favourite Pokémon
            </p>
          </div>

          <div className={styles.controls}>
            <SearchBar value={search} onChange={handleSearchChange} />
            <TypeFilter
              types={types}
              selected={selectedType}
              onChange={handleTypeChange}
            />
            <button
              className={`${styles.favToggle} ${showFavoritesOnly ? styles.favToggleActive : ""}`}
              onClick={() => setShowFavoritesOnly((v) => !v)}
            >
              {showFavoritesOnly ? "★" : "☆"} Favorites
              {favorites.length > 0 && (
                <span className={styles.favCount}>{favorites.length}</span>
              )}
            </button>
          </div>

          {error && (
            <div className={styles.error}>
              <span>⚠️</span> {error}
            </div>
          )}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <p className={styles.resultCount}>
                Showing <strong>{displayedPokemon.length}</strong> of{" "}
                <strong>{totalCount}</strong> Pokémon
              </p>

              {displayedPokemon.length === 0 ? (
                <div className={styles.empty}>
                  <span className={styles.emptyIcon}>🔍</span>
                  <p>No Pokémon found. Try a different search!</p>
                </div>
              ) : (
                <PokemonGrid
                  pokemon={displayedPokemon}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                  onSelect={setSelectedPokemonId}
                />
              )}

              {!showFavoritesOnly && totalPages > 1 && (
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </main>

        {selectedPokemonId && (
          <PokemonModal
            pokemonId={selectedPokemonId}
            isFavorite={isFavorite(selectedPokemonId)}
            onToggleFavorite={toggleFavorite}
            onClose={() => setSelectedPokemonId(null)}
          />
        )}
      </Layout>
    </>
  );
}
