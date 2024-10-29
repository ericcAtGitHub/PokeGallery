import { ChangeEvent, ReactElement, createContext, useEffect, useRef, useState, useContext } from 'react'
import * as ReRouter from 'react-router-dom'

import * as AppContext from '../Context/_AppContext'
import { CH, MH, DH, NH } from '../Infra/Helper/_Helper'
import * as ModelDef from '../Infra/ModelDef'
import * as MyHook from '../Infra/MyHook'

type TProps = {
    children: ReactElement
}

type TGalleryContext = {
    ctxDispPokesCol: ModelDef.TNamedAPIResource[],
    ctxIsShowPokeSpecHandler: any
}

export const Def = createContext<TGalleryContext>({
    ctxDispPokesCol: [],
    ctxIsShowPokeSpecHandler: null
})

// refering "public/.../app-data-context.css"
const scroll_btn_css_class_hide = "my-scroll-top my-scroll-top-hide"
const scroll_btn_css_class_show = "my-scroll-top my-scroll-top-show"

// refering "public/.../app-data-context.css"
const _getNavLinkCls = ({ isActive }: ReRouter.NavLinkRenderProps) => {
    return (isActive ? "my-currently-viewing" : "")
}

const global_config = DH.getGlobalConfig()

export const HOC = ({ children }: TProps) => {

    const {
        ctxSearchTerm, setCtxSearchTerm
    } = useContext(AppContext.UserInput.Def)

    const stRouteId = MyHook.useRouteId()
    const navigate = ReRouter.useNavigate()
    const stCurrentPath = MyHook.useCurrPath()

    const dispGnData: ModelDef.TConfigGeData = DH.getGnData(global_config, g => g.routeId === stRouteId)
    const sortedTargetGn: ModelDef.TGeneration = DH.sortPokeSpec(dispGnData.obj)

    const [stateSortedGalleryItems, setStateSortedGalleryItems] = useState<ModelDef.TNamedAPIResource[]>([])
    const [stateIsShowSpecialOnly, setStateIsShowSpecialOnly] = useState(false)
    const refScrollToThisEle = useRef(null) // for the scroll-to-top btn

    const shuffleHandler = () => {
        let newData = MH.getShuffle(Math.random, stateSortedGalleryItems)
        setStateSortedGalleryItems(newData)
    }

    useEffect(() => { // re-load at appropriate time
        setStateSortedGalleryItems(sortedTargetGn.pokemon_species)
    }, [stRouteId, sortedTargetGn.pokemon_species])

    const [stateScrollBtnCssClass, setStateScrollBtnCssClass] = useState(scroll_btn_css_class_hide)

    // the scroll-to-top btn is hidden initally; it appears after first scroll
    const firstScrollHandler = () => setStateScrollBtnCssClass(scroll_btn_css_class_show)

    useEffect(() => {
        document.addEventListener('scroll', firstScrollHandler, { once: true })
        return () => {
            document.removeEventListener('scroll', firstScrollHandler)
        }
    })

    const isShowPokeSpecHandler = (pokeSpec: ModelDef.TPokemonSpecies) => {
        return !stateIsShowSpecialOnly || CH.isSpecialPoke(pokeSpec)
    }

    // filter the display items by search key
    const getDispGalleryItems = (): ModelDef.TNamedAPIResource[] => {
        let rtn = [] as ModelDef.TNamedAPIResource[]
        stateSortedGalleryItems.forEach((apiRes: ModelDef.TNamedAPIResource) => {
            if (apiRes.name.toLowerCase().includes(ctxSearchTerm.toLocaleLowerCase())) {
                rtn = [...rtn, apiRes];
            }
        })

        return rtn
    }

    const toBeDispGalleryItems = getDispGalleryItems()

    // handle the <select> of "Pokemon Generation" by url redirection
    const selectGnDataHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        const targetGnDataObj = DH.getGnData(global_config, g => g.desc === e.target.value)
        NH.switchGn(navigate, stCurrentPath, targetGnDataObj.routeId, NH.ENavType.replace)
    }

    const contextValues: TGalleryContext = {
        ctxDispPokesCol: toBeDispGalleryItems,
        ctxIsShowPokeSpecHandler: isShowPokeSpecHandler,
    }

    return (
        <div>
            <div ref={refScrollToThisEle}>&nbsp;</div>

            <div>
                <div>
                    <select onChange={selectGnDataHandler} defaultValue={dispGnData.desc}>
                        {global_config.Gallery.GnData.map(d =>
                            (<option key={d.desc} value={d.desc}>{d.desc}</option>)
                        )
                        }
                    </select>

                    <h5 style={{ display: "inline-block" }} className="ms-2">
                        {CH.descGn(sortedTargetGn)}
                    </h5>

                    <span className="my-nav-menu">

                        <ReRouter.NavLink className={_getNavLinkCls}
                            to={NH.getGalleryPageUrl(dispGnData.routeId) }>
                            List view
                        </ReRouter.NavLink>

                        {' '}|{' '}

                        <ReRouter.NavLink className={_getNavLinkCls}
                            to={NH.getWaterfallPageUrl(dispGnData.routeId)}>
                            Waterfall gallery
                        </ReRouter.NavLink>
                    </span>
                </div>

                <button onClick={shuffleHandler}>Shuffle</button>
                &nbsp;
                <input type="text" value={ctxSearchTerm} placeholder="Search by Eng name"
                    onChange={(e) => setCtxSearchTerm(e.target.value)} />
                &nbsp; &nbsp;
                {/* pending due to waterfall
                <label style={{cursor:"pointer"}}>
                    <input type="checkbox" defaultChecked={stateIsShowSpecialOnly} onChange={(e) => { setStateIsShowSpecialOnly(e.target.checked) }} />
                    <span> Only show legendary or mythical Pokémon</span>
                </label>
                */}
            </div>
            <br />

            <Def.Provider value={contextValues}>
                {children}
            </Def.Provider>

            <button className={stateScrollBtnCssClass} onClick={() => {
                // no longer need to scroll to a specific element...?
                /*let ele = refScrollToThisEle.current as unknown as HTMLElement
                ele.scrollIntoView()*/

                window.scrollTo({ top: 0, behavior: 'smooth' })
            }}>
                {'Top'}
            </button>
        </div>)
}