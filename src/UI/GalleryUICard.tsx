// Dependencies
import { useEffect, useContext, Suspense } from 'react'
import { FC } from 'react'
import useSWR from 'swr'

//import { AppCache } from '../Model/Helper'
import * as ModelDef from '../Model/Model'
import Helper, { PokeHelper } from '../Model/Helper'
import { GalleryContext } from "../Context/GalleryContext"
import { StyledGalleryUICard, StyledPokeType } from './Styled'

type Props = {
    pokeSpecApiRes: ModelDef.TNamedAPIResource
}

const pokeHelper = PokeHelper()
const urlPoke = (pokeSpecApiRes: ModelDef.TNamedAPIResource) => `https://pokeapi.co/api/v2/pokemon/${pokeHelper.GetPokeIdFromPokeSpecApiRes(pokeSpecApiRes)}`
const genTFindicator = (tf: boolean) => (tf ? "Yes" : "--" )

const GalleryUICard: FC<Props> = ({ pokeSpecApiRes }) => {

    const {
        appIsShowSpecialHandler,
    } = useContext(GalleryContext)

    const { data: dataPoke, error: errorPoke } = useSWR(urlPoke(pokeSpecApiRes))
    const { data: dataPokeSpec, error: errorPokeSpec }: { data?: any, error?: any } = useSWR(pokeSpecApiRes.url)

    let poke: ModelDef.TPokemon
    let pokeSpec: ModelDef.TPokemonSpecies

    // recall the error we set on the fetcher
    if (errorPoke || errorPokeSpec || dataPoke.error || dataPokeSpec.error) {
        return <div />
    } else {
        poke = dataPoke as ModelDef.TPokemon
        pokeSpec = dataPokeSpec as ModelDef.TPokemonSpecies
    }

    const flavorText1Obj: ModelDef.TFlavorText|undefined = pokeSpec.flavor_text_entries.find((ft: ModelDef.TFlavorText) => ft.language.name === "en")
    const flavorText2Obj: ModelDef.TFlavorText | undefined = pokeSpec.flavor_text_entries.find((ft: ModelDef.TFlavorText) => ft.language.name === "zh-Hant") ??
        pokeSpec.flavor_text_entries.find((ft: ModelDef.TFlavorText) => ft.language.name === "ja")

    const flavorText1 = flavorText1Obj?.flavor_text.replace('\u000c', ' ')
    const flavorText2 = flavorText2Obj?.flavor_text.replace('\u000c', ' ').replaceAll('\n','')

    const pokemonTypes = poke.types.map((pokemonType: any) => pokemonType.type.name)

    return (appIsShowSpecialHandler(pokeSpec) &&
        <StyledGalleryUICard pokeColor={pokeSpec.color.name} className="border-bottom">
            <h2>#{pokeSpec.id} {pokeHelper.GetNameDesc(pokeSpec)}</h2>
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        {
                            pokemonTypes.map((pokemonType: string) =>
                                <StyledPokeType key={pokemonType} pokemonType={pokemonType}><span key={poke!.name + pokemonType}>{pokemonType}</span></StyledPokeType>)
                        }

                        <img alt={poke.name} src={
                            //poke.sprites.front_default
                            `sprites/pokemon/${poke.id}.png`
                        } />
                        
                        <ul className="ul-poke-desc">
                            <li>{flavorText1}</li>
                            <li>{flavorText2}</li>
                        </ul>

                    </div>
                    <div className="col-sm my-auto">
                        <div className="row">
                            <h5 className="h-weight-height-desc">Height: {poke.height * 10} cm
                                &nbsp;
                                &nbsp;
                                Weight: {poke.weight / 10} kg</h5>
                            <div className="col-sm">
                                <ul className="ul-poke-spec">
                                    <li title="The happiness when caught by a normal Pokéball; up to 255. The higher the number, the happier the Pokémon.">
                                        Base happiness: {pokeSpec.base_happiness}
                                    </li>
                                    <li title="The base capture rate; up to 255. The higher the number, the easier the catch.">
                                        Capture rate: {pokeSpec.capture_rate}
                                    </li>
                                    <li title="The chance of this Pokémon being female, in eighths; or -1 for genderless.">
                                        Gender rate: {pokeSpec.gender_rate}
                                    </li>
                                    <li title="The color of this Pokémon for Pokédex search.">
                                        Color: {pokeSpec.color.name}
                                    </li>
                                    <li title="The genus of this Pokémon species listed in multiple languages.">
                                        Genera: {pokeHelper.GetGenusDesc(pokeSpec)}
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm">
                                <ul className="ul-poke-spec">
                                    <li title="Whether or not this is a baby Pokémon.">
                                        Is baby? {genTFindicator(pokeSpec.is_baby)}
                                    </li>
                                    <li title="Whether or not this Pokémon has multiple forms and can switch between them.">
                                        Forms switchable? {genTFindicator(pokeSpec.forms_switchable)}
                                    </li>
                                    <li title="Whether or not this Pokémon has visual gender differences.">
                                        Has gender differences? {genTFindicator(pokeSpec.has_gender_differences)}
                                    </li>
                                    <li title="Whether or not this is a legendary Pokémon.">
                                        Is legendary? {genTFindicator(pokeSpec.is_legendary)}
                                    </li>
                                    <li title="Whether or not this is a mythical Pokémon.">
                                        Is mythical? {genTFindicator(pokeSpec.is_mythical)}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StyledGalleryUICard>
    )
}

export default GalleryUICard
