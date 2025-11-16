import { useState, useCallback, useEffect } from 'react';
import { Pokemon } from '@/lib/types/pokemon';
import { fetchPokemonDetails, fetchPokemonSpecies } from './fetch';

export const usePokemonDetails = (slug: string) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [detail, setDetail] = useState<Pokemon | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const [data, speciesDetail] = await Promise.all([
                fetchPokemonDetails(slug),
                fetchPokemonSpecies(slug),
            ]);
            const commaEggGroups = speciesDetail.egg_groups.map((group) => group.name).join(', ');
            const gender = { male: speciesDetail.gender_rate * 100 / 8 + '%', female: (8 - speciesDetail.gender_rate) * 100 / 8 + '%' };
            const statsDetail = data.stats.map((stat) => ({
                name: stat.stat.name,
                base_state: stat.base_stat,
                effort: stat.effort,
            }));
            setDetail({ ...data, species_detail: speciesDetail, egg_groups: commaEggGroups, gender, stats_detail: statsDetail });

            return detail;
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch Pokemon details'));
            return null;
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        loading,
        error,
        detail,
        refetch: fetchData,
    };
};
