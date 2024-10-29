import { ReactElement, useEffect, useRef, useState, createContext } from 'react'

import * as ModelDef from '../Infra/ModelDef'
import { DH } from '../Infra/Helper/_Helper'

const global_config = DH.getGlobalConfig()

type TUserInputContext = {
    ctxSearchTerm: string,
    setCtxSearchTerm(searchTerm: string): any,
    ctxImgRepo: ModelDef.TConfigImgRepo,
    setCtxImgRepo(imgRepo: ModelDef.TConfigImgRepo): any,
}

export const Def = createContext<TUserInputContext>({
    ctxSearchTerm: '',
    setCtxSearchTerm: () => { },
    ctxImgRepo: global_config.Gallery.ImgRepo[0],
    setCtxImgRepo: () => { },
})

type TProps = {
    children: ReactElement
}

export const HOC = ({ children }: TProps) => {

    const [stateSearchTerm, setStateSearchTerm] = useState<string>('')
    const [stateImgRepo, setStateImgRepo] = useState<ModelDef.TConfigImgRepo>(global_config.Gallery.ImgRepo[0])

    const contextValues: TUserInputContext = {
        ctxSearchTerm: stateSearchTerm,
        setCtxSearchTerm: setStateSearchTerm,
        ctxImgRepo: stateImgRepo,
        setCtxImgRepo: setStateImgRepo
    }

    return (
            <Def.Provider value={contextValues}>
                {children}
            </Def.Provider>)
}