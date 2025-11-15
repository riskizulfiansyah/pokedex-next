import { BasicResource } from "./type";
import { PokemonSpecies } from "./species";

export type PokemonPastAbility = {
    generation: BasicResource;
    abilities: PokemonAbility[];
}

export type PokemonAbility = {
    is_hidden: boolean;
    slot: number;
    ability: BasicResource;
};

export type PokemonType = {
    slot: number;
    type: BasicResource;
};

export type PokemonTypePast = {
    generation: BasicResource;
    types: PokemonType[];
};

export type PokemonStat = {
    base_stat: number;
    effort: number;
    stat: BasicResource;
};

export type PokemonMoveVersion = {
    move_learn_method: BasicResource;
    version_group: BasicResource;
    level_learned_at: number;
};

export type PokemonMove = {
    move: BasicResource;
    version_group_details: PokemonMoveVersion[];
};

export type PokemonSprites = {
    front_default: string | null;
    front_shiny: string | null;
    front_female: string | null;
    front_shiny_female: string | null;
    back_default: string | null;
    back_shiny: string | null;
    back_female: string | null;
    back_shiny_female: string | null;
    other: {
        'official-artwork': {
            front_default: string;
            front_shiny?: string;
        };
        dream_world?: {
            front_default: string | null;
            front_female: string | null;
        };
        home?: {
            front_default: string | null;
            front_female: string | null;
            front_shiny: string | null;
            front_shiny_female: string | null;
        };
    };
};

export type PokemonCries = {
    latest: string;
    legacy: string;
};

export type PokemonGameIndices = {
    game_index: number;
    version: BasicResource;
}

export type PokemonListResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: BasicResource[];
};

export interface PokemonDetail {
    abilities: PokemonAbility[]
    base_experience: number
    cries: PokemonCries
    forms: BasicResource[]
    game_indices: PokemonGameIndices[]
    height: number
    held_items: any[]
    id: number
    is_default: boolean
    location_area_encounters: string
    moves: PokemonMove[]
    name: string
    order: number
    past_abilities: PokemonPastAbility[]
    past_types: any[]
    species: BasicResource
    sprites: PokemonSprites
    stats: PokemonStat[]
    types: PokemonType[]
    weight: number
}


export type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    is_default: boolean;
    order: number;
    abilities: PokemonAbility[];
    forms: BasicResource[];
    game_indices: {
        game_index: number;
        version: BasicResource;
    }[];
    held_items: {
        item: BasicResource;
        version_details: {
            rarity: number;
            version: BasicResource;
        }[];
    }[];
    location_area_encounters: string;
    moves: PokemonMove[];
    species: BasicResource;
    sprites: PokemonSprites;
    stats: PokemonStat[];
    types: PokemonType[];
    past_types: PokemonTypePast[];
    cries?: PokemonCries;
    color?: string;
    species_detail?: PokemonSpecies;
};