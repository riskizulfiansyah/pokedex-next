import { POKEAPI_BASE_URL } from "@/lib/config";
import { PokemonDetail } from "@/lib/types/pokemon";
import { PokemonListResponse } from "@/lib/types/pokemon";
import { PokemonSpecies } from "@/lib/types/species";

// Simple in-memory cache
const cache = new Map<string, any>();

export const fetchWithCache = async <T>(url: string): Promise<T> => {
    if (cache.has(url)) {
        return cache.get(url) as T;
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    cache.set(url, data);
    return data;
};

export const fetchPokemonList = async (limit: number = 20, offset: number = 0): Promise<PokemonListResponse> => {
    return fetchWithCache<PokemonListResponse>(
        `${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    );
};

export const fetchPokemonDetails = async (name: string): Promise<PokemonDetail> => {
    return fetchWithCache<PokemonDetail>(`${POKEAPI_BASE_URL}/pokemon/${name}`);
};

export const fetchPokemonSpecies = async (name: string): Promise<PokemonSpecies> => {
    return fetchWithCache<PokemonSpecies>(`${POKEAPI_BASE_URL}/pokemon-species/${name}`);
};
