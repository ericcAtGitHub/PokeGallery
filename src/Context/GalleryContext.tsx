import { NavLink as ReactLink, Route, withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router';
import { ChangeEvent, FC, ReactElement, useEffect, useRef, useState, createContext, Children } from 'react';
import * as ModelDef from '../Model/Model'
import Helper, { PokeHelper } from '../Model/Helper'

export interface IMyRouteMatchParams {
    routeId: string
}

export interface IGalleryContextHOC extends RouteComponentProps<IMyRouteMatchParams> {
    //appGen: ModelDef.TGeneration,
    //children: ReactElement
}

interface IGalleryContext {
    appProceededData: ModelDef.TNamedAPIResource[],
    appIsShowHandler: any,
    appRouteCtx?: RouteComponentProps<IMyRouteMatchParams>
}

export const GalleryContext = createContext<IGalleryContext>({
    appProceededData: [],
    appIsShowHandler: null
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
    
    const globalConfig = Helper.GetGlobalConfig()
    const pokeHelper = PokeHelper()
    //console.log(routeParams.match.params.routeId)

    const getTargetData = (checkHandler: (g: ModelDef.TConfigGallaryData) => boolean): ModelDef.TConfigGallaryData => {
        let rtn = globalConfig.Gallary.Data[0]

        const appGallary = globalConfig.Gallary.Data.filter(g => checkHandler(g))
        if (appGallary.length > 0) {
            rtn = appGallary[0]
        }
        return rtn
    }

    const targetData = getTargetData(g => g.routeId === routeParams.match.params.routeId)
    const sortedAppGen = pokeHelper.GetSortedGen(targetData.obj)

    //const [stateAppData, setStateAppData] = useState<ModelDef.TNamedAPIResource[]>(sortedAppGen.pokemon_species);
    const [stateAppData, setStateAppData] = useState<ModelDef.TNamedAPIResource[]>([]);

    const [stateSearchKey, setStateSearchKey] = useState<string>('');
    const [stateIsShowSpecialOnly, setStateIsShowSpecialOnly] = useState<boolean>(false)
    const scrollToThisEleRef = useRef(null)

    const shuffleHandler = () => {
        let newData = shuffleArray([...stateAppData]);
        setStateAppData(newData);
    }

    useEffect(() => { // re-load at appropriate time
        setStateAppData(sortedAppGen.pokemon_species)
    }, [routeParams.match.params, sortedAppGen.pokemon_species])

    const [stateScrollBtnCssClass, setStateScrollBtnCssClass] = useState<string>(scrollBtnCssClassHide)
    const scrollHandler = () => setStateScrollBtnCssClass(scrollBtnCssClassShow)
    useEffect(() => {
        document.addEventListener('scroll', scrollHandler, { once: true })
        return () => {
            document.removeEventListener('scroll', scrollHandler)
        };
    })

    const isShowHandler = (pokeSpec: ModelDef.TPokemonSpecies) => {
        let rtn = true
        if (stateIsShowSpecialOnly && !pokeSpec.is_legendary && !pokeSpec.is_mythical) {
            rtn = false
        }
        return rtn
    }

    const search = () => {
        let filteredData = [] as ModelDef.TNamedAPIResource[];
        stateAppData.forEach((apiRes: ModelDef.TNamedAPIResource) => {
            if (apiRes.name.toLowerCase().includes(stateSearchKey.toLocaleLowerCase())) {
                filteredData = [...filteredData, apiRes];
            }
        });

        return filteredData
    }

    const filteredStateAppData = search();

    const selectGallaryHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        const toBeDisplayedData = getTargetData(g => g.desc === e.target.value);
        //console.log(routeParams)
        routeParams.history.push(routeParams.match.path.replace(":routeId?", toBeDisplayedData.routeId))
    }

    const contextValues: IGalleryContext = {
        appProceededData: filteredStateAppData,
        appIsShowHandler: isShowHandler,
        appRouteCtx: routeParams
	}

    return (
        <>
            <link rel="stylesheet" type="text/css" href={`${process.env.PUBLIC_URL}/pageCss/gallery-context.css`} />

            <div ref={scrollToThisEleRef}>&nbsp;</div>

            <span className="nav-menu">
                <ReactLink activeClassName={"currently-viewing"} to={`/${targetData.routeId}`} exact={true}>List view</ReactLink>{' '}|{' '}
                <ReactLink activeClassName={"currently-viewing"} to={`/waterfall/${targetData.routeId}`}>Waterfall gallery</ReactLink>
            </span>

            <div>
                <select onChange={selectGallaryHandler} defaultValue={targetData.desc}>
                    {globalConfig.Gallary.Data.map(d =>
                        <option key={d.desc} value={d.desc}>{d.desc}</option>
                    )
                    }
                </select>

                <h5 style={{ display: "inline-block" }} className="ms-2">
                    {pokeHelper.GetGenNameDesc(sortedAppGen)}
                </h5>

                <br />
                <button onClick={shuffleHandler}>Shuffle</button>
                &nbsp;
                <input type="text" value={stateSearchKey} placeholder="Search by Eng name"
                    onChange={(e) => setStateSearchKey(e.target.value)} />
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