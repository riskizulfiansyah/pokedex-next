import React from 'react'
import { capitalFirst, withPadStart } from '@/lib/helper';
import { Pokemon } from '@/lib/types/pokemon';
import { useRouter } from 'next/navigation';
import { POKEMON_COLORS } from '@/lib/config';
import Image from 'next/image';

const PokeCard: React.FC<{ pokemonList: Pokemon[] }> = ({ pokemonList }) => {
  const router = useRouter();
  return (
    <div className="pokemon-grid">
      {pokemonList.map((pokemon) => {
        return (
          <div
            key={pokemon.id}
            className={`pokemon-card ${POKEMON_COLORS[pokemon.species_detail!.color.name]}`}
            onClick={() => router.push(`/detail/${pokemon.name}`)}
          >
            {/* Pokemon ID */}
            <div className="flex justify-end">
              <div className="pokemon-id">#{withPadStart(pokemon.id)}</div>
            </div>

            {/* Card Content */}
            <div className="card-content">
              <h2 className="pokemon-name">{capitalFirst(pokemon.name)}</h2>

              <div className="pokemon-type-container">
                {pokemon.types.map((type, index) => (
                  <div className="pokemon-type" key={index}>
                    <span className="pokemon-type-name">{capitalFirst(type.type.name)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Container */}
            <div className="pokemon-image-container">
              <Image
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                width={500}
                height={500}
                loading='eager'
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PokeCard