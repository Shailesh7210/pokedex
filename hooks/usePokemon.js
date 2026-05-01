import { useState, useEffect, useCallback } from "react";
import {
  fetchPokemonList,
  fetchAllTypes,
  fetchPokemonByType,
} from "../lib/pokeapi";

const PAGE_SIZE = 24;

export function usePokemon() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [types, setTypes] = useState([]);
  const [typeFilteredIds, setTypeFilteredIds] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [typeLoading, setTypeLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadInitial() {
      try {
        setLoading(true);
        const [pokemonList, allTypes] = await Promise.all([
          fetchPokemonList(),
          fetchAllTypes(),
        ]);
        setAllPokemon(pokemonList);
        setTypes(allTypes);
      } catch (e) {
        setError(e.message || "Failed to load Pokémon data");
      } finally {
        setLoading(false);
      }
    }
    loadInitial();
  }, []);

  const handleTypeChange = useCallback(async (type) => {
    setSelectedType(type);
    setPage(1);
    if (!type) {
      setTypeFilteredIds(null);
      return;
    }
    try {
      setTypeLoading(true);
      const ids = await fetchPokemonByType(type);
      setTypeFilteredIds(ids);
    } catch (e) {
      setTypeFilteredIds(null);
    } finally {
      setTypeLoading(false);
    }
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearch(value);
    setPage(1);
  }, []);

  const filteredPokemon = (() => {
    let list = allPokemon;
    if (typeFilteredIds) {
      list = list.filter((p) => typeFilteredIds.has(p.id));
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (p) => p.name.includes(q) || String(p.id).includes(q)
      );
    }
    return list;
  })();

  const totalPages = Math.max(1, Math.ceil(filteredPokemon.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const currentPagePokemon = filteredPokemon.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  return {
    pokemon: currentPagePokemon,
    filteredPokemon,
    types,
    search,
    selectedType,
    page: safePage,
    totalPages,
    loading: loading || typeLoading,
    error,
    setPage,
    handleSearchChange,
    handleTypeChange,
    totalCount: filteredPokemon.length,
  };
}
