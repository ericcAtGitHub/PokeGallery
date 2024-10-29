import * as ModelDef from '../../Infra/ModelDef'
import * as ApiUrl from '../../Infra/Const/ApiUrl'
import * as RouteUrl from '../../Infra/Const/RouteUrl'
import { Route } from 'react-router-dom'

/**
 * Get the content of the file "public/GlobalConfig.cs"
 */
export const getGlobalConfig = () => {
    return (window as any).GlobalConfig as ModelDef.TGlobalConfig
}

//export const AppCache = async () => await caches.open('new-cache');

export const getFetcher = (url: string) => {
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
}



export const getGnData = (globalConfig: ModelDef.TGlobalConfig, predicate: (g: ModelDef.TConfigGeData) => boolean): ModelDef.TConfigGeData => {
    return globalConfig.Gallery.GnData.find(g => predicate(g)) || globalConfig.Gallery.GnData[0]
}

export const getPokeIdBySpecApiRes = (pokeSpecApiRes: ModelDef.TNamedAPIResource): number => {
    return parseInt(pokeSpecApiRes.url.replace(ApiUrl.get_poke_species, "").slice(0, -1))
}

/**
 * It returns a shallow copy of the input
 */
export const sortPokeSpec = (refGn: ModelDef.TGeneration): ModelDef.TGeneration => {
    return {
        ...refGn,
        pokemon_species: refGn.pokemon_species.sort((a, b) => getPokeIdBySpecApiRes(a) - getPokeIdBySpecApiRes(b))
    }
}

export const getPokeUrl = (pokeSpecApiRes: ModelDef.TNamedAPIResource) => {
    return `${ApiUrl.get_poke}${getPokeIdBySpecApiRes(pokeSpecApiRes)}`
}

export const getSpritePokemonSrc = (poke: ModelDef.TPokemon) => {
    return `${RouteUrl.sprites_pokemon}${poke.id}.png`
}

export const getSpritePokeBallSrc = () => {
    return RouteUrl.sprites_poke_ball
}

export const getImgUrl = (imgRepo: ModelDef.TConfigImgRepo, pokeSpecApiRes: ModelDef.TNamedAPIResource) => {
    const pokeId = getPokeIdBySpecApiRes(pokeSpecApiRes)
    return `${RouteUrl.base_url}${imgRepo.basePath}${pokeId}.${imgRepo.ext}`
}

