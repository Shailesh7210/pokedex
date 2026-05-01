const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonList(limit = 1008, offset = 0) {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error("Failed to fetch Pokémon list");
  const data = await res.json();
  return data.results.map((p, i) => ({
    name: p.name,
    id: offset + i + 1,
    url: p.url,
  }));
}

export async function fetchPokemonDetail(idOrName) {
  const res = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
  if (!res.ok) throw new Error(`Failed to fetch Pokémon: ${idOrName}`);
  return res.json();
}

export async function fetchAllTypes() {
  const res = await fetch(`${BASE_URL}/type?limit=30`);
  if (!res.ok) throw new Error("Failed to fetch types");
  const data = await res.json();
  return data.results
    .filter((t) => !["unknown", "shadow"].includes(t.name))
    .map((t) => t.name);
}

export async function fetchPokemonByType(type) {
  const res = await fetch(`${BASE_URL}/type/${type}`);
  if (!res.ok) throw new Error(`Failed to fetch type: ${type}`);
  const data = await res.json();
  return new Set(
    data.pokemon
      .map((p) => {
        const parts = p.pokemon.url.split("/").filter(Boolean);
        return parseInt(parts[parts.length - 1]);
      })
      .filter((id) => id <= 1008)
  );
}

export function getPokemonImageUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function getPokemonFallbackUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}
