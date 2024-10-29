import { ReactElement } from 'react'
import { SWRConfig } from 'swr'

import * as AppContext from './Context/_AppContext'
import { DH } from './Infra/Helper/_Helper'
import AppRoutes from './AppRoutes'

const App = () => {

    return (
        <AppContext.UserInput.HOC>
            <SWRConfig value={{
                fetcher: DH.getFetcher,
                suspense: true,
                revalidateOnFocus: false, //all options below is to let useSWR fetch only one time
                revalidateOnMount: false,
                revalidateOnReconnect: false,
                refreshWhenOffline: false,
                refreshWhenHidden: false,
                refreshInterval: 0
            }}>
                <div className="App">
                    <AppRoutes />
                </div>
            </SWRConfig>
        </AppContext.UserInput.HOC>
    )
}

export default App
