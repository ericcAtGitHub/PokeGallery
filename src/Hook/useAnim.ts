import { useTransition, config } from "react-spring"

import * as ModelDef from '../Model/Model'

const getSpringStyles = (enumViewPageName: ModelDef.EViewPage) => {

    if (enumViewPageName === ModelDef.EViewPage.Default) {
        return {
            from: { opacity: 0 },
            enter: { opacity: 1 },
            leave: { opacity: 0 }
        }
    } else {
        return {
            from: { opacity: 0 },
            enter: { opacity: 1 },
            leave: { opacity: 0 }
        }
    }
    
}

export default function useAnim(enumViewPageName: ModelDef.EViewPage) {

    const componentRepresentation = enumViewPageName 
    const compRepMapKey = (compRep: typeof enumViewPageName) => { return enumViewPageName }

    return useTransition( // animation will play if and only if the first argument of "useTransition" changes
        componentRepresentation, {
            keys: compRepMapKey,
            ...getSpringStyles(enumViewPageName),
            config: config.slow
    })
}