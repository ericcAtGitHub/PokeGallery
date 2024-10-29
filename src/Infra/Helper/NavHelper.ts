import * as ReRouter from 'react-router-dom'
import * as RouteUrl from '../../Infra/Const/RouteUrl'

export const enum ENavType {
    navigate = "navigate",
    replace = "replace"
}

export const getGalleryPageUrl = (routeId: string) => {
    return ReRouter.generatePath(RouteUrl.home_page, { routeId: routeId })
}

export const getWaterfallPageUrl = (routeId: string) => {
    return ReRouter.generatePath(RouteUrl.waterfall_page, { routeId: routeId })
}

export const switchGn = (navigation: ReRouter.NavigateFunction, currentPath: string,
    routeId: string, navType: ENavType) => {

    const navOpt = navType === ENavType.replace ? { replace: true } : undefined

    navigation(ReRouter.generatePath(currentPath, { routeId: routeId }), navOpt)
}

