import { HashRouter as ReactHashRouter, Route as ReactRoute, Switch as ReactSwitch, withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router';
import Helper from './Model/Helper'
import * as ModelDef from './Model/Model'
import { IMyRouteMatchParams } from './Context/GalleryContext'

// Components
import App from './App'
import GalleryContainer from './Container/GalleryContainer'
import WaterContainer from './Container/WaterContainer'

const AppRoutes = () => {

    //const globalConfig = Helper.GetGlobalConfig()

    return (
        <App>
            <ReactHashRouter>
                <ReactSwitch>
                    <ReactRoute path="/waterfall/:routeId?" component={(routeProps: RouteComponentProps<IMyRouteMatchParams>) => <WaterContainer />} exact />
                    <ReactRoute path="/:routeId?" component={(routeProps: RouteComponentProps<IMyRouteMatchParams>) => <GalleryContainer/>} exact />
                </ReactSwitch>
            </ReactHashRouter>
        </App>
    )
}

export default AppRoutes