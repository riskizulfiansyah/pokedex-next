import { BasicResource } from "./type";

export type GrowthRate = {
    name: string;
    url: string;
};

export type PokedexNumber = {
    entry_number: number;
    pokedex: BasicResource;
};

export type EvolutionChain = {
    url: string;
};

export type Name = {
    name: string;
    language: BasicResource;
};

export type FlavorTextEntry = {
    flavor_text: string;
    language: BasicResource;
    version: BasicResource;
};

export type FormDescription = {
    description: string;
    language: BasicResource;
};

export type Genera = {
    genus: string;
    language: BasicResource;
};

export type Variety = {
    is_default: boolean;
    pokemon: BasicResource;
};

export type PokemonSpecies = {
    id: number;
    name: string;
    order: number;
    gender_rate: number;
    capture_rate: number;
    base_happiness: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    hatch_counter: number;
    has_gender_differences: boolean;
    forms_switchable: boolean;
    growth_rate: GrowthRate;
    pokedex_numbers: PokedexNumber[];
    egg_groups: BasicResource[];
    color: BasicResource;
    shape: BasicResource;
    evolves_from_species: BasicResource;
    evolution_chain: EvolutionChain;
    habitat: any;
    generation: BasicResource;
    names: Name[];
    flavor_text_entries: FlavorTextEntry[];
    form_descriptions: FormDescription[];
    genera: Genera[];
    varieties: Variety[];
};