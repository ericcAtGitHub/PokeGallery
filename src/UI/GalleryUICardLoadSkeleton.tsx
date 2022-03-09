import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import * as ModelDef from '../Model/Model'
import Helper, { PokeHelper } from '../Model/Helper'

type Props = {
    pokeSpecApiRes: ModelDef.TNamedAPIResource
}

const GalleryUICardLoadSkeleton: FC<Props> = ({ pokeSpecApiRes }) => {

    const pokeHelper = PokeHelper()

    return (
        <div>
            <h2>#{pokeHelper.GetPokeIdFromPokeSpecApiRes(pokeSpecApiRes)} {pokeSpecApiRes.name}</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                        <Skeleton height={10} count={5} />
                        </div>
                        <div className="col-sm">
                        <Skeleton height={10} count={5} />
                        </div>
                        <div className="col-sm">
                        <Skeleton height={10} count={5} />
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default GalleryUICardLoadSkeleton
