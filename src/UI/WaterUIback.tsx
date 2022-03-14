// Dependencies
import { useEffect, useContext } from 'react'
import { FC } from 'react'
import useSWR from 'swr'

//import { AppCache } from '../Model/Helper'
import * as ModelDef from '../Model/Model'
import Helper, { PokeHelper } from '../Model/Helper'
import { GalleryContext } from "../Context/GalleryContext"

type TProps = {
    appIsTargetNow: boolean
    pokeSpecApiRes: ModelDef.TNamedAPIResource
    appDisplayPokeDetailHandler: any
}

const pokeHelper = PokeHelper()

const WaterUIback: FC<TProps> = ({ pokeSpecApiRes, appIsTargetNow, appDisplayPokeDetailHandler }) => {

    let rtn = null //always return null since this component renders nothing but do the useSWR job only

    //console.log(appIsTargetNow)
    /*
    if (!appIsTargetNow) {
        return null
    }
    */

    const {
        appIsShowSpecialHandler,
    } = useContext(GalleryContext)

    const { data: dataPokeSpec, error: errorPokeSpec }: { data?: any, error?: any } = useSWR(pokeSpecApiRes.url)
    //console.log(pokeSpecApiRes.url)
    //console.log(dataPokeSpec)
    let pokeSpec: ModelDef.TPokemonSpecies

    useEffect(() => { abc() })

    if (errorPokeSpec || dataPokeSpec.error) {
        return rtn //<div key={"WaterUIback2" + pokeSpecApiRes.name}>Still loading</div>
    }

    pokeSpec = dataPokeSpec as ModelDef.TPokemonSpecies

    const abc = () => {
        //console.log(123)
        if (appIsTargetNow) {
            appDisplayPokeDetailHandler(pokeSpec)
        }
    }

    

    //return <span>{rtnMsg}</span>

    return rtn //<span key={"WaterUIback3" + pokeSpecApiRes.name}></span> //null // <span key={"WaterUIback3" + pokeSpecApiRes.name}></span>
    
}

export default WaterUIback
