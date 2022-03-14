import { NavLink as ReactLink, Route, withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { ChangeEvent, FC, ReactElement, useEffect, useRef, useState, createContext, Children } from 'react'
import * as ModelDef from '../Model/Model'
import Helper, { PokeHelper } from '../Model/Helper'

const globalConfig = Helper.GetGlobalConfig()

interface IUserInputContext {
    appSearchKey: string,
    appSetSearchKey: any,
    appImgRepo: ModelDef.TConfigImgRepo,
    appSetImgRepo: any,
}

export const UserInputContext = createContext<IUserInputContext>({
    appSearchKey: '',
    appSetSearchKey: {},
    appImgRepo: globalConfig.Gallery.ImgRepo[0],
    appSetImgRepo: {}
})

const UserInputContextHOC: FC = ({ children }): ReactElement => {

    const [stateSearchKey, setStateSearchKey] = useState<string>('')
    const [stateImgRepo, setStateImgRepo] = useState<ModelDef.TConfigImgRepo>(globalConfig.Gallery.ImgRepo[0])

    const contextValues: IUserInputContext = {
        appSearchKey: stateSearchKey,
        appSetSearchKey: setStateSearchKey,
        appImgRepo: stateImgRepo,
        appSetImgRepo: setStateImgRepo
    }

    return (
            <UserInputContext.Provider value={contextValues}>
                {children}
            </UserInputContext.Provider>)
}

export default UserInputContextHOC