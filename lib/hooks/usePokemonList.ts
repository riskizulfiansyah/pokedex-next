import { useState, useEffect, useCallback } from 'react';
import { BasicResource } from '@/lib/types/type';
import { Pokemon, PokemonDetail } from '@/lib/types/pokemon';
import { PokemonSpecies } from '@/lib/types/species';
import { fetchPokemonDetails, fetchPokemonList, fetchPokemonSpecies } from './fetch';

const fetchSpecies = async (pokemonList: BasicResource[]): Promise<PokemonSpecies[]> => {
    const species = await Promise.all(
        pokemonList.map(pokemon =>
            fetchPokemonSpecies(pokemon.name)
                .catch(error => {
                    console.error(`Failed to fetch species for ${pokemon.name}:`, error);
                    return { ...pokemon, error: true } as unknown as PokemonSpecies;
                })
        )
    );
    return species;
}

const fetchDetails = async (pokemonList: BasicResource[]): Promise<PokemonDetail[]> => {
    const details = await Promise.all(
        pokemonList.map(pokemon =>
            fetchPokemonDetails(pokemon.name)
                .catch(error => {
                    console.error(`Failed to fetch details for ${pokemon.name}:`, error);
                    return { ...pokemon, error: true } as unknown as PokemonDetail;
                })
        )
    );
    return details;
}

export const usePokemonList = (limit: number = 20, offset: number = 0) => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [loadingDetails, setLoadingDetails] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            // First fetch the basic list
            const { count, next, results } = await fetchPokemonList(limit, offset);

            setHasMore(next !== null);
            setTotalCount(count);

            // Then fetch detailed information and species for the new Pokemon
            setLoadingDetails(true);

            // Fetch both details and species in parallel
            const [detailedList, speciesList] = await Promise.all([
                fetchDetails(results),
                fetchSpecies(results)
            ]);

            // Update the list with detailed information and species for current page only
            setPokemonList((prev) => {
                // Create a map of species data by Pokemon ID for quick lookup
                const speciesMap = new Map<number, PokemonSpecies>();
                speciesList.forEach((species) => {
                    speciesMap.set(Number(species.id), species);
                });

                // Create Pokemon list for current page only with species data
                const currentPokemonList = detailedList
                    .filter(detail => !('error' in detail))
                    .map(detail => {
                        const speciesData = speciesMap.get(detail.id);
                        return {
                            ...detail,
                            species_detail: speciesData
                        };
                    })
                    .sort((a, b) => Number(a.id) - Number(b.id));

                if (offset === 0) {
                    return currentPokemonList;
                }

                const existingIds = new Set(prev.map(p => p.id));
                const newPokemon = currentPokemonList.filter(p => !existingIds.has(p.id));

                return [...prev, ...newPokemon];
            });
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        } finally {
            setLoading(false);
            setLoadingDetails(false);
        }
    }, [limit, offset]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        pokemonList,
        loading,
        loadingDetails,
        error,
        hasMore,
        totalCount,
        refetch: fetchData
    };
};
