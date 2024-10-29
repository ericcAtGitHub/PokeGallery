import * as ModelDef from '../ModelDef'
import * as DH from './DataHelper'

export const descGn = (gn: ModelDef.TGeneration): string => {
	let verNames: ModelDef.TName[] = gn.names.filter((name: ModelDef.TName) => ["en", "ja"].indexOf(name.language.name) >= 0)
	return `${verNames[0]?.name} / ${verNames[1]?.name}`
}

export const isSpecialPoke = (pokeSpec: ModelDef.TPokemonSpecies) => {
    return pokeSpec.is_legendary || pokeSpec.is_mythical
}

export const descGenus = (pokeSpec: ModelDef.TPokemonSpecies): string => (
	pokeSpec.genera.filter((g: ModelDef.TGenus) => ["en", "zh-Hant"].indexOf(g.language.name) >= 0)
		.map((g: ModelDef.TGenus) => g.genus.replace("Pokémon", "").replace("寶可夢", ""))
		.reverse()
		.join(" ")
)

export const descName = (pokeSpec: ModelDef.TPokemonSpecies): string => {
	const toBeDisplayedNames: ModelDef.TName[] = pokeSpec.names.filter((name: ModelDef.TName) => ["en", "zh-Hant", "ja"].indexOf(name.language.name) >= 0)
	return `${toBeDisplayedNames[1].name} ${toBeDisplayedNames[0].name} ${toBeDisplayedNames[2].name}`
}