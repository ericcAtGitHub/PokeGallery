import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import * as ModelDef from '../Infra/ModelDef'
import { DH } from '../Infra/Helper/_Helper'

type TProps = {
    pokeSpecApiRes: ModelDef.TNamedAPIResource
}

export const UI = ({ pokeSpecApiRes }: TProps) => {

    return (
        <div>
            <h2>#{DH.getPokeIdBySpecApiRes(pokeSpecApiRes)} {pokeSpecApiRes.name}</h2>
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
