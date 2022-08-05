interface IDefaultUrl {
  name: string;
  url: string;
}

interface IAbilities {
  ability: IDefaultUrl[];
  is_hidden: boolean;
  slot: number;
}

interface IGameIndices {
  game_index: number;
  version: IDefaultUrl;
}

interface IVersionGroupDetails {
  level_learned_at: number;
  move_learn_method: IDefaultUrl;
  version_group: IDefaultUrl;
}

interface IMoves {
  move: IDefaultUrl;
  version_group_details: IVersionGroupDetails[];
}

interface ISprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

interface IStats {
  base_stat: number;
  effort: number;
  stat: IDefaultUrl;
}

interface IType {
  slot: number;
  type: IDefaultUrl;
}

export interface IPokemon {
  abilities: IAbilities[];
  base_experience: number;
  forms: IDefaultUrl[];
  game_indices: IGameIndices[];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: IMoves[];
  name: string;
  order: number;
  past_types: [];
  species: IDefaultUrl;
  sprites: ISprites;
  stats: IStats[];
  types: IType[];
  weight: number;
  quantity?: number;
}
