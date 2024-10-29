import '../Style/DeclarCom.css'
import MyEnvConfig from '../EnvConfig/_MyEnvConfig'

const app_ver = __POKE_GALLERY_VER__ // obtained from "vite.config.ts" / "vite-env.d.ts"

export const UI = () => {
    return (
        <div className="mt-4 px-2 w-50 pt-4 declar-com" style={{ fontSize: 15 }}>

                <p>
                    Inspired by the {' '}
                    <a target="_blank" rel="noreferrer" href="https://github.com/PacktPublishing/React-17-Design-Patterns-and-Best-Practices-Third-Edition">
                        work of Carlos Santana Roldán
                    </a>, this page is all about Pokemon!
                </p>

                <p>
                    Powered by {' '}
                    <a target="_blank" rel="noreferrer" href="https://pokeapi.co/">
                        PokéAPI
                    </a>. 
                </p>


                <p>
                    Developed by Chan Ching Yin.
                    <span style={{ float: 'right' }}>
                        {`v${app_ver}.${MyEnvConfig.EnvName}`}
                    </span>
                </p>

        </div>
    )
}