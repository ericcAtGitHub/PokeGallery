import { HashRouter as ReactHashRouter, Route as ReactRoute, Switch as ReactSwitch, withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router';
import Helper from './Model/Helper'
import * as ModelDef from './Model/Model'
import { IMyRouteMatchParams } from './Context/GalleryContext'

// Components
import App from './App'
import DisplayContainer from './Container/DisplayContainer'

const AppRoutes = () => {

    //const globalConfig = Helper.GetGlobalConfig()

    return (
        <App>
            <ReactHashRouter>
                <ReactSwitch>
                    <ReactRoute path="/waterfall/:routeId?" component={(routeProps: RouteComponentProps<IMyRouteMatchParams>) => DisplayContainer(ModelDef.EViewPage.Water)} exact />
                    <ReactRoute path="/:routeId?" component={(routeProps: RouteComponentProps<IMyRouteMatchParams>) => DisplayContainer(ModelDef.EViewPage.Default)} exact />
                </ReactSwitch>
            </ReactHashRouter>
        </App>
    )
}

export default AppRoutes