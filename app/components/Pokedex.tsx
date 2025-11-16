'use client'
import PokeCard from "./PokeCard";
import { usePokemonList } from "@/lib/hooks/usePokemonList";
import { useEffect, useRef, useState } from "react";
import { PAGINATION_LIMIT } from "@/lib/config";
import Header from "./Header";

const Pokedex: React.FC = () => {
    const [offset, setOffset] = useState(0);
    const { pokemonList, loading, error, hasMore, refetch } = usePokemonList(PAGINATION_LIMIT, offset);
    const observerTarget = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // When the target is visible and we have more data and not loading
                if (entries[0].isIntersecting && hasMore && !loading) {
                    setOffset(prev => prev + PAGINATION_LIMIT);
                }
            },
            { threshold: 0.5 } // Trigger when 50% visible
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [hasMore, loading]);

    if (error && pokemonList.length === 0) {
        return (
            <div className="text-center p-4">
                <p className="text-red-500">Error: {error.message}</p>
                <button
                    onClick={() => refetch()}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="pokedex-container">
            {/* Header */}
            <Header />
            <h1 className="pokedex-title">Pokedex</h1>

            {/* Grid Container */}
            <PokeCard pokemonList={pokemonList} />

            <div
                ref={observerTarget}
                className="h-20 flex items-center justify-center"
            >
                {loading && <p>Loading more Pokemon...</p>}
                {!hasMore && pokemonList.length > 0 && <p>No more Pokemon</p>}
            </div>

            {/* Floating Action Button */}
            <button className="fab" aria-label="Floating action button" onClick={() => alert("Just a Test")}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </div>
    );
};

export default Pokedex;