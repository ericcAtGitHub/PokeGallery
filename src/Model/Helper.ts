import { useState } from 'react'

import * as ModelDef from '../Model/Model'

function extract<T>(properties: Record<keyof T, true>) {
	return function <TActual extends T>(value: TActual) {
		let result = {} as T;
		for (const property of Object.keys(properties) as Array<keyof T>) {
			result[property] = value[property];
		}
		return result;
	}
}

//export const AppCache = async () => await caches.open('new-cache');

export const Helper = {

	nameof: <T>(name: keyof T) => name,

	nameofFactory: <T>() => (name: keyof T) => name,

	Sleep: (ms: number) => {
		return new Promise(callback => setTimeout(callback, ms));
	},

	CopySelectedText: () => {
		try {
			let isSuccess = document.execCommand('copy');
			if (!isSuccess) {
				alert('Testing code was copied unsuccessfully');
			}
		} catch (err) {
			alert('Oops, unable to copy');
		}
	},

	GetGlobalConfig: () => {
		return (window as any).GlobalConfig as ModelDef.TGlobalConfig
	},

	Fetcher: (url: string) => {
		return fetch(url).then((response: Response) => {
			if (response.ok) {
				//let cloneResponse: Response = response.clone()
				//console.log(cloneResponse)
				//AppCache().then((appCache: Cache) => appCache.put(url, cloneResponse))
				
				return response.json()
			}
			return {
				error: true
			}
		})
	},
}

export const PokeHelper = () => {

	const getPokeIdFromPokeSpecApiRes = (apiRes: ModelDef.TNamedAPIResource): number =>
		parseInt(apiRes.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").slice(0, -1))

	return {

		GetGenNameDesc:(gen: ModelDef.TGeneration): string => {
			let rtn = ""
			let verNames: ModelDef.TName[] = gen.names.filter((name: ModelDef.TName) => ["en", "ja"].indexOf(name.language.name) >= 0)
			rtn = `${verNames[0]?.name} / ${verNames[1]?.name}`
			return rtn
		},

		GetGenVerDesc: (gen: ModelDef.TGeneration): string =>
			(`ver: ${gen.version_groups[0].name}, ${gen.version_groups[1].name}`),

		GetSortedGen: (gen: ModelDef.TGeneration):ModelDef.TGeneration => {
			return {
				...gen,
				pokemon_species: gen.pokemon_species.sort((a, b) => getPokeIdFromPokeSpecApiRes(a) - getPokeIdFromPokeSpecApiRes(b))
			}
		},

		GetPokeIdFromPokeSpecApiRes: getPokeIdFromPokeSpecApiRes,

		GetGenusDesc: (pokeSpec: ModelDef.TPokemonSpecies): string => (
			pokeSpec.genera.filter((g: ModelDef.TGenus) => ["en", "zh-Hant"].indexOf(g.language.name) >= 0)
				.map((g: ModelDef.TGenus) => g.genus.replace("Pokémon", "").replace("寶可夢", ""))
				.reverse()
				.join(" ")
		),

		GetNameDesc: (pokeSpec: ModelDef.TPokemonSpecies): string => {
			const toBeDisplayedNames: ModelDef.TName[] = pokeSpec.names.filter((name: ModelDef.TName) => ["en", "zh-Hant", "ja"].indexOf(name.language.name) >= 0)
			return `${toBeDisplayedNames[1].name} ${toBeDisplayedNames[0].name} ${toBeDisplayedNames[2].name}`
		}
	}
}



export default Helper