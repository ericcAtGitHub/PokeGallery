import * as ReRouter from 'react-router-dom'

import * as ModelDef from './Infra/ModelDef'
import DisplayContainer from './Container/DisplayContainer'
import * as RouteUrl from './Infra/Const/RouteUrl'

const routerDef = ReRouter.createBrowserRouter([
    {
        path: RouteUrl.home_page,
        element: (<DisplayContainer enumViewPage={ModelDef.EViewPage.Default} />),
    },

    {
        path: RouteUrl.waterfall_page,
        element: (<DisplayContainer enumViewPage={ModelDef.EViewPage.Water} />),
    },

])

const AppRoutes = () => {
    return (<ReRouter.RouterProvider router={routerDef} />)
}

export default AppRoutes