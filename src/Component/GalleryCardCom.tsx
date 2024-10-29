import { useEffect, useContext } from 'react'
import * as StyledGalleryCard from '../Style/StyledGalleryCardCom'
import useSWR from 'swr'

import * as ModelDef from '../Infra/ModelDef'
import * as AppContext from '../Context/_AppContext'
import { DH, CH } from '../Infra/Helper/_Helper'

type TProps = {
    pokeSpecApiRes: ModelDef.TNamedAPIResource
}

const descBool = (tf: boolean) => (tf ? "Yes" : "--")

export const UI = ({ pokeSpecApiRes }: TProps) => {

    const {
        ctxIsShowPokeSpecHandler,
    } = useContext(AppContext.Data.Def)

    const { data: dataPoke, error: errorPoke } = useSWR(DH.getPokeUrl(pokeSpecApiRes))
    const { data: dataPokeSpec, error: errorPokeSpec } = useSWR(pokeSpecApiRes.url)

    let poke: ModelDef.TPokemon
    let pokeSpec: ModelDef.TPokemonSpecies

    if (errorPoke || errorPokeSpec || !dataPoke || !dataPokeSpec) {
        return <div />
    } else {
        poke = dataPoke as ModelDef.TPokemon
        pokeSpec = dataPokeSpec as ModelDef.TPokemonSpecies
    }

    const flavorTextEntries = pokeSpec.flavor_text_entries

    const flavorTextObj_en = flavorTextEntries.find((ft: ModelDef.TFlavorText) => ft.language.name === "en")
    const flavorTextObj_zh = flavorTextEntries.find((ft: ModelDef.TFlavorText) => ft.language.name === "zh-Hant") ??
        flavorTextEntries.find((ft: ModelDef.TFlavorText) => ft.language.name === "ja")

    const flavorText_en = flavorTextObj_en?.flavor_text.replace('\u000c', ' ')
    const flavorText_zh = flavorTextObj_zh?.flavor_text.replace('\u000c', ' ').replaceAll('\n', '')

    const pokemonTypes = poke.types.map((pokemonType) => pokemonType.type.name)

    if (!ctxIsShowPokeSpecHandler(pokeSpec)) {
        return null
    }

    return (<StyledGalleryCard.Container $mainColor={pokeSpec.color.name} className="border-bottom">

        <h2>{`#${pokeSpec.id} ${CH.descName(pokeSpec)}`}</h2>

        <div className="container">
            <div className="row">
                <div className="col-sm">
                    {
                        pokemonTypes.map((pokemonType: ModelDef.TPokeTypeStr) =>
                        (<StyledGalleryCard.PokeTypeDesc key={pokemonType} $pokemonType={pokemonType}>
                            <span key={poke!.name + pokemonType}>{pokemonType}</span>
                        </StyledGalleryCard.PokeTypeDesc>))
                    }

                    <img alt={poke.name} src={
                        //poke.sprites.front_default
                        DH.getSpritePokemonSrc(poke)
                    } />

                    <ul className="ul-poke-desc">
                        <li>{flavorText_en}</li>
                        <li>{flavorText_zh}</li>
                    </ul>

                </div>
                <div className="col-sm my-auto">
                    <div className="row">

                        <h5 className="h-weight-height-desc">Height: {poke.height * 10} cm
                            &nbsp;
                            &nbsp;
                            Weight: {poke.weight / 10} kg
                        </h5>

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
                                    Genera: {CH.descGenus(pokeSpec)}
                                </li>
                            </ul>
                        </div>

                        <div className="col-sm">
                            <ul className="ul-poke-spec">
                                <li title="Whether or not this is a baby Pokémon.">
                                    Is baby? {descBool(pokeSpec.is_baby)}
                                </li>
                                <li title="Whether or not this Pokémon has multiple forms and can switch between them.">
                                    Forms switchable? {descBool(pokeSpec.forms_switchable)}
                                </li>
                                <li title="Whether or not this Pokémon has visual gender differences.">
                                    Has gender differences? {descBool(pokeSpec.has_gender_differences)}
                                </li>
                                <li title="Whether or not this is a legendary Pokémon.">
                                    Is legendary? {descBool(pokeSpec.is_legendary)}
                                </li>
                                <li title="Whether or not this is a mythical Pokémon.">
                                    Is mythical? {descBool(pokeSpec.is_mythical)}
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </StyledGalleryCard.Container>
    )
}
