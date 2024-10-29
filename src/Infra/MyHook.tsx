import { useContext, useState, useRef, useEffect, useMemo, MutableRefObject } from 'react'
import * as ReRouter from 'react-router-dom'

import * as RouteUrl from '../Infra/Const/RouteUrl'
import * as AppContext from '../Context/_AppContext'

export function useRouteId() {

    //const stateUrlMatch = ReRouter.useMatches()
    //return stateUrlMatch[0]?.params.routeId    

    const stateUrlParams = ReRouter.useParams()
    return stateUrlParams.routeId
}

// https://stackoverflow.com/questions/66265608/react-router-v6-get-path-pattern-for-current-route
export function useCurrPath() {
    const stLoc = ReRouter.useLocation()
    const params = ReRouter.useParams()

    // the following gives e.g.
    // "/waterfall/ge1" -> "/waterfall/:routeId"
    // But when there is no param, we have e.g. "/waterfall" -> "/waterfall"
    const stTidyLoc = Object.entries(params).reduce((path: any, [key, value]) => {
        return path.replace(`/${value}`, `/:${key}`)
    }, stLoc.pathname)

    let rtn = [RouteUrl.home_page, RouteUrl.waterfall_page].find((r: string) => r.indexOf(stTidyLoc) >= 0)
    return (rtn ?? RouteUrl.home_page)

}

export function useForceUpdate(): [number, any] {
    const [stateValue, setStateValue] = useState(0)
    return [stateValue, () => setStateValue(stateValue + 1)]
}