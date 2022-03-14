import { NavLink as ReactLink, Route, withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { ChangeEvent, FC, ReactElement, useEffect, useRef, useState, createContext, Children } from 'react'

import * as ModelDef from '../Model/Model'
import Helper, { PokeHelper } from '../Model/Helper'
import useSearchKey from '../Hook/useSearchKey'

export interface IMyRouteMatchParams {
    routeId: string
}

export interface IGalleryContextHOC extends RouteComponentProps<IMyRouteMatchParams> {
    //appGen: ModelDef.TGeneration,
    //children: ReactElement
}

interface IGalleryContext {
    appDisplayGalleryItems: ModelDef.TNamedAPIResource[],
    appIsShowSpecialHandler: any,
    appRouteCtx?: RouteComponentProps<IMyRouteMatchParams>
}

export const GalleryContext = createContext<IGalleryContext>({
    appDisplayGalleryItems: [],
    appIsShowSpecialHandler: null
})

const shuffleArray = function (array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const scrollBtnCssClassHide = "scroll-top scroll-top-hide"
const scrollBtnCssClassShow = "scroll-top scroll-top-show"

const GalleryContextHOC: FC<IGalleryContextHOC> = ({ children, ...routeParams }): ReactElement => {
    
    const globalConfig = Helper.GetGlobalConfig() // get the content of the file "public/GlobalConfig.cs"
    const pokeHelper = PokeHelper()
    //console.log(routeParams.match.params.routeId)

    const getGlobalConfigGenDataObj
        = (criteriaChecker: (g: ModelDef.TConfigGenData) => boolean): ModelDef.TConfigGenData => {
        return globalConfig.Gallery.GenData.find(g => criteriaChecker(g)) || globalConfig.Gallery.GenData[0]
    }

    const targetGlobalConfigGenDataObj: ModelDef.TConfigGenData
        = getGlobalConfigGenDataObj(g => g.routeId === routeParams.match.params.routeId)
    const sortedTargetGen: ModelDef.TGeneration = pokeHelper.GetSortedGen(targetGlobalConfigGenDataObj.obj)

    const [stateSortedGalleryItems, setStateSortedGalleryItems] = useState<ModelDef.TNamedAPIResource[]>([]);

    const [appSearchKey, appSetSearchKey] = useSearchKey()
    const [stateIsShowSpecialOnly, setStateIsShowSpecialOnly] = useState<boolean>(false)
    const scrollToThisEleRef = useRef(null) // for the scroll-to-top btn

    const shuffleHandler = () => {
        let newData = shuffleArray([...stateSortedGalleryItems])
        setStateSortedGalleryItems(newData)
    }

    useEffect(() => { // re-load at appropriate time
        setStateSortedGalleryItems(sortedTargetGen.pokemon_species)
    }, [routeParams.match.params, sortedTargetGen.pokemon_species])

    const [stateScrollBtnCssClass, setStateScrollBtnCssClass] = useState<string>(scrollBtnCssClassHide)

    // the scroll-to-top btn is hidden originally; it appears after first scroll
    const firstScrollHandler = () => setStateScrollBtnCssClass(scrollBtnCssClassShow)

    useEffect(() => {
        document.addEventListener('scroll', firstScrollHandler, { once: true })
        return () => {
            document.removeEventListener('scroll', firstScrollHandler)
        };
    })

    const isShowSpecialHandler = (pokeSpec: ModelDef.TPokemonSpecies) => {
        let rtn = true
        if (stateIsShowSpecialOnly && !pokeSpec.is_legendary && !pokeSpec.is_mythical) {
            rtn = false
        }
        return rtn
    }

    // filter the display items by search key
    const getDisplayGalleryItems = (): ModelDef.TNamedAPIResource[] => {
        let rtn = [] as ModelDef.TNamedAPIResource[]
        stateSortedGalleryItems.forEach((apiRes: ModelDef.TNamedAPIResource) => {
            if (apiRes.name.toLowerCase().includes(appSearchKey.toLocaleLowerCase())) {
                rtn = [...rtn, apiRes];
            }
        });

        return rtn
    }

    const toBeDisplayedGalleryItems = getDisplayGalleryItems();

    // handle the <select> of "Pokemon Generation" by url redirection
    const selectTargetGenDataObjHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        const targetGenDataObj = getGlobalConfigGenDataObj(g => g.desc === e.target.value)
        //console.log(routeParams)
        routeParams.history.push(routeParams.match.path.replace(":routeId?", targetGenDataObj.routeId))
    }

    const contextValues: IGalleryContext = {
        appDisplayGalleryItems: toBeDisplayedGalleryItems,
        appIsShowSpecialHandler: isShowSpecialHandler,
        appRouteCtx: routeParams
	}

    return (
        <>
            <link rel="stylesheet" type="text/css" href={`${process.env.PUBLIC_URL}/pageCss/gallery-context.css`} />

            <div ref={scrollToThisEleRef}>&nbsp;</div>

            

            <div>
                <div>
                <select onChange={selectTargetGenDataObjHandler} defaultValue={targetGlobalConfigGenDataObj.desc}>
                    {globalConfig.Gallery.GenData.map(d =>
                        <option key={d.desc} value={d.desc}>{d.desc}</option>
                    )
                    }
                </select>

                <h5 style={{ display: "inline-block" }} className="ms-2">
                    {pokeHelper.GetGenNameDesc(sortedTargetGen)}
                </h5>

                <span className="nav-menu">
                    <ReactLink activeClassName={"currently-viewing"} to={`/${targetGlobalConfigGenDataObj.routeId}`} exact={true}>List view</ReactLink>{' '}|{' '}
                    <ReactLink activeClassName={"currently-viewing"} to={`/waterfall/${targetGlobalConfigGenDataObj.routeId}`}>Waterfall gallery</ReactLink>
                </span>
                </div>

                <button onClick={shuffleHandler}>Shuffle</button>
                &nbsp;
                <input type="text" value={appSearchKey} placeholder="Search by Eng name"
                    onChange={(e) => appSetSearchKey(e.target.value)} />
                &nbsp; &nbsp;
                {/* pending due to waterfall
                <label style={{cursor:"pointer"}}>
                    <input type="checkbox" defaultChecked={stateIsShowSpecialOnly} onChange={(e) => { setStateIsShowSpecialOnly(e.target.checked) }} />
                    <span> Only show legendary or mythical Pokémon</span>
                </label>
                */}
            </div>
            <br/>

            <GalleryContext.Provider value={contextValues}>
                {children}
            </GalleryContext.Provider>

            <button className={stateScrollBtnCssClass} onClick={() => {
                //window.scrollTo({ top: Helper.GetGlobalConfig().DeclarHeight, behavior: 'smooth' })
                let ele = scrollToThisEleRef.current as unknown as HTMLElement
                ele.scrollIntoView();
            }}
                
            >
                Top
            </button>
        </>)
};

export default withRouter(GalleryContextHOC)