import { useContext, useEffect, useState, Suspense } from 'react'

import { ProGallery } from 'pro-gallery'
import * as ProGalLib from 'pro-gallery-lib'
import 'pro-gallery/dist/statics/main.css'
import * as ReactImageGal from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import * as ModelDef from '../Infra/ModelDef'
import * as MyHook from '../Infra/MyHook'
import * as AppContext from '../Context/_AppContext'
import * as WaterfallBackData from './WaterfallBackDataCom'
import OptionRollUI from '../SysCom/OptionRollUI'
import { CH, MH, DH, NH } from '../Infra/Helper/_Helper'

const poke_desc_loading = "loading..."

// https://pro-gallery.surge.sh/
let pro_gallery_opts: ProGalLib.NestedOptions = {
    "behaviourParams": {
        "item": {
            "content": {
                "hoverAnimation": "ZOOM_IN"
            },
            overlay: {
                hoveringBehaviour: "NEVER_SHOW",
                "backgroundColor": "rgba(80,40,20,0)",
            },
        }
    },
    "layoutParams": {
        "structure": {
            "gallerySpacing": 2
        },
    },
    stylingParams: {
        itemBorderWidth: 1,
        itemBorderColor: '#888888',
    }
}

//https://github.com/wix-incubator/pro-gallery/issues/1125
pro_gallery_opts = ProGalLib.flattenObject(pro_gallery_opts)

const pro_gallery_container: ProGalLib.Container = {
    width: window.innerWidth - 60, // minus some margin
    height: window.innerHeight
}

const global_config = DH.getGlobalConfig()

export const UI = () => {

    const {
        ctxDispPokesCol
    } = useContext(AppContext.Data.Def)

    const {
        ctxImgRepo,
        setCtxImgRepo
    } = useContext(AppContext.UserInput.Def)

    const [stateIsShowReactImgGal, setStateIsShowReactImgGal] = useState(false)
    const [stateReactImgGalInd, setStateReactImgGalInd] = useState(0)
    const [stateToBeFocusPokeId, setStateToBeFocusPokeId] = useState(-1)
    const [stateFocusPoke, setStateFocusPoke] = useState<ModelDef.TPokemonSpecies | null>(null)

    const [stForceUpdateId, stForceUpdate] = MyHook.useForceUpdate()
    const refreshImgBgColor = () => {
        stForceUpdate()
    }

    const imgRepoChangeHandler = (newOptValue: string) => {
        const newImgRepo = global_config.Gallery.ImgRepo.find(ir => ir.optValue === newOptValue)
        setCtxImgRepo(newImgRepo!)
    }

    const proGalItemCol: ProGalLib.Item[] = ctxDispPokesCol.map((specApiRes: ModelDef.TNamedAPIResource) => {

        return {
            itemId: DH.getPokeIdBySpecApiRes(specApiRes) + "",
            mediaUrl: DH.getImgUrl(ctxImgRepo, specApiRes),
            metadata: {
                type: "image",
                alt: ' '
            }
        }
    })

    const reactImgGalItemCol: (ReactImageGal.ReactImageGalleryItem & { pokeId: string })[]
        = proGalItemCol.map((proItem: ProGalLib.Item) => ({
            pokeId: proItem.itemId,
            original: proItem.mediaUrl, //proItem.url
            originalClass: "my-react-image-gallery-img"
        }))

    const proGalEventsListener: ProGalLib.EventsListener = (eventName: string, eventData: any) => {

        switch (eventName) {
            case 'ITEM_ACTION_TRIGGERED':
                if (eventData.type === 'image') {

                    refreshImgBgColor() // as a plan B when all other triggers fail 

                    setStateReactImgGalInd(eventData.idx)

                    setStateFocusPoke(null)
                    setStateToBeFocusPokeId(parseInt(eventData.id))
                    setStateIsShowReactImgGal(true)
                }
                break

            // for adding img background coloring only 
            //https://github.com/wix-incubator/pro-gallery/blob/master/packages/lib/src/common/constants/events.ts
            case 'GALLERY_CHANGE':
            case 'NEED_MORE_ITEMS':
                //console.log(eventName)
                refreshImgBgColor()
                break
            default:
                //console.log(eventName)
                break
        }
    }

    const dispPokeDetailHandler = (pokeSpec: ModelDef.TPokemonSpecies) => {
        setStateFocusPoke(pokeSpec)
    }

    return (
        <>
            <OptionRollUI
                Desc={"Style: "}
                OptionLabels={global_config.Gallery.ImgRepo.map(ir => ir.desc)}
                OptionValues={global_config.Gallery.ImgRepo.map(ir => ir.optValue)}
                InitSelectedInd={global_config.Gallery.ImgRepo.findIndex(ir => ir.optValue === ctxImgRepo.optValue)}
                OptionChangeHandler={(newOptValue) => imgRepoChangeHandler(newOptValue)} />
            <br /><br />

            {ctxDispPokesCol.length !== 0 &&
                <ProGallery items={proGalItemCol} container={pro_gallery_container}
                    options={pro_gallery_opts} eventsListener={proGalEventsListener}
                />
            }

            {stateIsShowReactImgGal &&
                <div className="my-react-image-gallery-c2">
                    <div className="my-react-image-gallery-c1">
                        <ReactImageGal.default items={reactImgGalItemCol}
                            onErrorImageURL={'/waterfall-error.png'}
                            showBullets={false}
                            showIndex={true}
                            showThumbnails={true}
                            lazyLoad={true}
                            showPlayButton={false}
                            startIndex={stateReactImgGalInd}
                            slideDuration={0}
                            showFullscreenButton={false}
                            onClick={() => setStateIsShowReactImgGal(false)}
                            onSlide={(currentIndex: number) => {
                                setStateFocusPoke(null)
                                setStateToBeFocusPokeId(parseInt(reactImgGalItemCol[currentIndex].pokeId))
                            }}
                        /></div></div>
            }

            <Suspense fallback={null}>
                {ctxDispPokesCol.map((apiRes: ModelDef.TNamedAPIResource, ind: number) =>
                (<WaterfallBackData.Com key={"WaterfallBackData1" + apiRes.name} pokeSpecApiRes={apiRes}
                    proGalIdx={ind} forceUpdateId={stForceUpdateId}
                    isFocusNow={DH.getPokeIdBySpecApiRes(apiRes) === (stateToBeFocusPokeId)}
                    dispPokeDetailHandler={dispPokeDetailHandler} />)
                )}
            </Suspense>

            {
                stateIsShowReactImgGal &&
                <div className="my-target-poke-desc">
                    <h1 className="my-target-poke-desc-top-left">{stateFocusPoke !== null ? "#" + stateFocusPoke.id : poke_desc_loading}</h1>
                    <h1 className="my-target-poke-desc-bottom-center">{stateFocusPoke !== null ? CH.descName(stateFocusPoke) : poke_desc_loading}</h1>
                </div>
            }
        </>)
}