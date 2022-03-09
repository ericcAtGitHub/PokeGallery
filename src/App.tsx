import React, { FC } from 'react';
import { SWRConfig } from 'swr';

import Helper from './Model/Helper'

const App: FC = ({ children }) => {
    return (
        <SWRConfig value={{
            fetcher: Helper.Fetcher, suspense: true,
            revalidateOnFocus: false, //all options below is to use useSWR to fetch only one time
            revalidateOnMount: false,
            revalidateOnReconnect: false,
            refreshWhenOffline: false,
            refreshWhenHidden: false,
            refreshInterval: 0
        }}>
            <div className="App">
                {children}
            </div>
        </SWRConfig>
    );
}

export default App;
