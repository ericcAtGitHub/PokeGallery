import myDevConfig from './devConfig.json'
import myProdConfig from './prodConfig.json'

type TEnvConfig = { 
    EnvName: string
    //DeclarHeight: number
}

// configurations by environment
const myEnvConfig: TEnvConfig = {
    ...(import.meta.env.PROD ? myProdConfig : myDevConfig)
}

export default myEnvConfig
