import myDevConfig from './devConfig.json'
import myProdConfig from './prodConfig.json'

interface IMyEnvConfig { 
    EnvName: string
    //DeclarHeight: number
}

const { NODE_ENV = 'development' } = process.env

// configurations by environment
const myEnvConfig: IMyEnvConfig = {
    ...(NODE_ENV === 'production' ? myProdConfig : myDevConfig)
}

export default myEnvConfig
