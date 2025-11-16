export const POKEAPI_BASE_URL = process.env.NEXT_PUBLIC_POKE_API || 'https://pokeapi.co/api/v2';
export const PAGINATION_LIMIT = 16;

// Map of Pokémon colors to hex codes
export const POKEMON_COLORS: Record<string, string> = {
    black: 'bg-black-400',
    blue: 'bg-blue-400',
    brown: 'bg-yellow-700',
    gray: 'bg-gray-400',
    green: 'bg-green-500',
    pink: 'bg-pink-400',
    purple: 'bg-purple-400',
    red: 'bg-red-400',
    white: 'bg-slate-300',
    yellow: 'bg-yellow-500',
    default: 'bg-slate-300' // Default color if no color is found
}