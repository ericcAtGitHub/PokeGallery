/***** Type definition based on PokeApi ******/

export type TGeneration = {
	id: number, // The identifier for this resource.
	name: string, // The name for this resource.
	abilities: any[], //A list of abilities that were introduced in this generation. list NamedAPIResource(Ability)
	names: TName[], //The name of this resource listed in different languages. list Name
	main_region: any,//The main region travelled in this generation. NamedAPIResource(Region)
	moves: any[], //A list of moves that were introduced in this generation. list NamedAPIResource(Move)
	pokemon_species: TNamedAPIResource[], //A list of Pokémon species that were introduced in this generation. list NamedAPIResource(PokemonSpecies)
	types: any[], //A list of types that were introduced in this generation. list NamedAPIResource(Type)
	version_groups: TNamedAPIResource[] //A list of version groups that were introduced in this generation. list NamedAPIResource (VersionGroup)
}

export type TNamedAPIResource = {
	name: string //The name of the referenced resource.
	url: string //The URL of the referenced resource.
}

export type TName = {
	name: string //The localized name for an API resource in a specific language.
	language: TNamedAPIResource //The language this name is in. NamedAPIResource(Language)
}

export type TFlavorText = {
	flavor_text: string //The localized flavor text for an API resource in a specific language.
	language: TNamedAPIResource //The language this name is in. NamedAPIResource(Language)
	version: TNamedAPIResource//The game version this flavor text is extracted from. NamedAPIResource(Version)
}

export type TPokemonSpecies = {
	id: number //The identifier for this resource.
	name: string //The name for this resource.
	order: number //The order in which species should be sorted.Based on National Dex order, except families are grouped together and sorted by stage.
	gender_rate: number //The chance of this Pokémon being female, in eighths; or - 1 for genderless.
	capture_rate: number // The base capture rate; up to 255. The higher the number, the easier the catch.
	base_happiness: number //The happiness when caught by a normal Pokéball; up to 255. The higher the number, the happier the Pokémon.
	is_baby: boolean //Whether or not this is a baby Pokémon.
	is_legendary: boolean //Whether or not this is a legendary Pokémon.
	is_mythical: boolean //Whether or not this is a mythical Pokémon.
	hatch_counter: number //Initial hatch counter: one must walk 255 × (hatch_counter + 1) steps before this Pokémon's egg hatches, unless utilizing bonuses like Flame Body's.
	has_gender_differences: boolean //Whether or not this Pokémon has visual gender differences.
	forms_switchable: boolean //Whether or not this Pokémon has multiple forms and can switch between them.
	growth_rate: any[] //The rate at which this Pokémon species gains levels. NamedAPIResource(GrowthRate)
	pokedex_numbers: any[] //A list of Pokedexes and the indexes reserved within them for this Pokémon species. list PokemonSpeciesDexEntry
	egg_groups: any[] //A list of egg groups this Pokémon species is a member of. list NamedAPIResource(EggGroup)
	color: TNamedAPIResource //The color of this Pokémon for Pokédex search. NamedAPIResource(PokemonColor)
	shape: any //The shape of this Pokémon for Pokédex search. NamedAPIResource(PokemonShape)
	evolves_from_species: TPokemonSpecies //The Pokémon species that evolves into this Pokemon_species.
	evolution_chain: any //The evolution chain this Pokémon species is a member of. APIResource(EvolutionChain)
	habitat: any //The habitat this Pokémon species can be encountered in.
	generation: TGeneration //The generation this Pokémon species was introduced in.
	names: TName[] // The name of this resource listed in different languages. list Name
	pal_park_encounters: any[] //A list of encounters that can be had with this Pokémon species in pal park. list PalParkEncounterArea
	flavor_text_entries: TFlavorText[] // A list of flavor text entries for this Pokémon species. list FlavorText
	form_descriptions: any[] //Descriptions of different forms Pokémon take on within the Pokémon species. list Description
	genera: any[] // The genus of this Pokémon species listed in multiple languages. list Genus
	varieties: any[] // A list of the Pokémon that exist within this Pokémon species. list PokemonSpeciesVariety
}

export type TPokemon = {
	id: number //The identifier for this resource.
	name: string //The name for this resource.
	base_experience: number //The base experience gained for defeating this Pokémon.
	height: number //The height of this Pokémon in decimetres.
	is_default: boolean //Set for exactly one Pokémon used as the default for each species.
	order: number //Order for sorting.Almost national order, except families are grouped together.
	weight: number //The weight of this Pokémon in hectograms.
	abilities: any[] //A list of abilities this Pokémon could potentially have. list PokemonAbility
	forms: TNamedAPIResource[] //A list of forms this Pokémon can take on. list NamedAPIResource(PokemonForm)
	game_indices: any[]//A list of game indices relevent to Pokémon item by generation. list VersionGameIndex
	held_items: any[] //A list of items this Pokémon may be holding when encountered. list PokemonHeldItem
	location_area_encounters: string//A link to a list of location areas, as well as encounter details pertaining to specific versions.
	moves: any[] //A list of moves along with learn methods and level details pertaining to specific version groups. list PokemonMove
	past_types: any[]//A list of details showing types this pokémon had in previous generations list PokemonTypePast
	sprites: TPokemonSprites//A set of sprites used to depict this Pokémon in the game.A visual representation of the various sprites can be found at PokeAPI / sprites
	species: TNamedAPIResource//The species this Pokémon belongs to. NamedAPIResource(PokemonSpecies)
	stats: any[] //A list of base stat values for this Pokémon. list PokemonStat
	types: {
		slot: number, type: { name: TPokeTypeStr, url: string }
	}[] //A list of details showing types this Pokémon has. list PokemonType
}

export type TPokeTypeStr =
	"bug" |
	"dark" |
	"dragon" |
	"electric" |
	"fairy" |
	"fighting" |
	"fire" |
	"flying" |
	"ghost" |
	"grass" |
	"ground" |
	"ice" |
	"normal" |
	"poison" |
	"psychic" |
	"rock" |
	"steel" |
	"water"

export type TType = {
	id: number //The identifier for this resource.
	name: string //The name for this resource.
	damage_relations: any //A detail of how effective this type is toward others and vice versa. TypeRelations
	past_damage_relations: any[]//A list of details of how effective this type was toward others and vice versa in previous generations list TypeRelationsPast(Type)
	game_indices: any[] //A list of game indices relevent to this item by generation. list GenerationGameIndex
	generation: TNamedAPIResource //The generation this type was introduced in. NamedAPIResource(Generation)
	move_damage_class: TNamedAPIResource //The class of damage inflicted by this type. NamedAPIResource(MoveDamageClass)
	names: TName[] //The name of this resource listed in different languages. list Name
	pokemon: TPokemon[] //A list of details of Pokémon that have this type. list TypePokemon
	moves: TNamedAPIResource[] //A list of moves that have this type. list NamedAPIResource(Move)
}

export type TPokemonColor = {
	id: number //The identifier for this resource.
	name: string //The name for this resource.
	names: TName[] //The name of this resource listed in different languages. list Name
	pokemon_species: TNamedAPIResource[] //A list of the Pokémon species that have this color. list NamedAPIResource(PokemonSpecies)
}

export type TPokemonSprites = {
	front_default: string //The default depiction of this Pokémon from the front in battle.
	front_shiny: string //The shiny depiction of this Pokémon from the front in battle.
	front_female: string //The female depiction of this Pokémon from the front in battle.
	front_shiny_female: string //The shiny female depiction of this Pokémon from the front in battle.
	back_default: string //The default depiction of this Pokémon from the back in battle.
	back_shiny: string //The shiny depiction of this Pokémon from the back in battle.
	back_female: string //The female depiction of this Pokémon from the back in battle.
	back_shiny_female: string //The shiny female depiction of this Pokémon from the back in battle.
}

export type TGenus = {
	genus: string //The localized genus for the referenced Pokémon species
	language: TNamedAPIResource //The language this genus is in. NamedAPIResource(Language)
}

/****** Cust Type Def ******/

export enum EViewPage {
	Default,
	Water
}

export type TGlobalConfig = {
	Gallery: TConfigGallery
}

type TConfigGallery = {
	GnData: TConfigGeData[],
	ImgRepo: TConfigImgRepo[]
}

export type TConfigGeData = {
	obj: any
	desc: string
	routeId: string
}

export type TConfigImgRepo = {
	basePath: string
	ext: string
	desc: string
	optValue: string
}

