import { useEffect, useContext } from 'react'
import { FC } from 'react'
import useSWR from 'swr'

import * as ModelDef from '../Infra/ModelDef'
import { CH, MH, DH, NH } from '../Infra/Helper/_Helper'

type TProps = {
    pokeSpecApiRes: ModelDef.TNamedAPIResource
    isFocusNow: boolean
    dispPokeDetailHandler(pokeSpec: ModelDef.TPokemonSpecies): any
    proGalIdx: number
    forceUpdateId: number
}

export const Com: FC<TProps> = ({ pokeSpecApiRes, isFocusNow, dispPokeDetailHandler,
    proGalIdx, forceUpdateId }) => {

    const rtn = null //always return null since this component renders nothing but do the useSWR job only

    // We can reduce the no. of fetch by conditional fetching
    // https://swr.vercel.app/docs/conditional-fetching
    // But performance suffers when "react-image-gallery" is "onSlide"
    //const { data: dataPokeSpec, error: errorPokeSpec } = useSWR(isFocusNow? pokeSpecApiRes.url : null)
    const { data: dataPokeSpec, error: errorPokeSpec } = useSWR(pokeSpecApiRes.url)

    if (errorPokeSpec || !dataPokeSpec) {
        return rtn //<div key={"WaterUIback2" + pokeSpecApiRes.name}>Still loading</div>
    }

    const pokeSpec = dataPokeSpec as ModelDef.TPokemonSpecies

    useEffect(() => {
        if (isFocusNow) {
            dispPokeDetailHandler(pokeSpec)
        }
    }, [isFocusNow])

    useEffect(() => { // img background coloring

        const pokeSpec = dataPokeSpec as ModelDef.TPokemonSpecies
        
        if (pokeSpec) {

            const colorRand = Math.random

            const mainColor = pokeSpec.color.name
            const weakenColor = `color-mix(in srgb, ${mainColor} 60%, transparent)`
            const gradColor1 = mainColor
            //const gradColor2 = MH.getProbInd(colorRand, [0.5, 0.5]) === 0? `#dddddd` : `#222222`
            //const gradColor2 = `#ffffff` //`#000000`
            const gradColor2 = `#222222`

            const targetImgEle = document.querySelector(`.pro-gallery img[data-idx='${proGalIdx}']`)
            const targetContainerEle = document.querySelector(`.gallery-item-container.item-container-regular[data-idx='${proGalIdx}']`)

            if (targetImgEle) {
                /*
                targetEle.setAttribute("style",
                    `background-image: ` +
                    `linear-gradient(${MH.getRandInt(colorRand, 360)}deg, ${gradColor1}, ${gradColor2});`)*/
                
                targetImgEle.setAttribute("style",
                    targetImgEle.getAttribute("style") +
                    `background-image: linear-gradient( ${gradColor2} 4%, ${gradColor1}, ${gradColor2} 96%);`)
                    
                if (targetContainerEle) {
                    targetContainerEle.setAttribute("style",
                        targetContainerEle.getAttribute("style") +
                        `border-color: ${weakenColor}; border-width: 2px;`)
                }

            } else {
                //console.log("Cannot find")
            }
        }
        

    }, [dataPokeSpec, forceUpdateId])

    return rtn //<span key={"WaterUIback3" + pokeSpecApiRes.name}></span>
    
}