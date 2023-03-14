import useSWR from 'swr'
import { FC, ChangeEvent, useContext, useEffect, useState, Suspense } from 'react'

import { ProGallery } from 'pro-gallery'
import 'pro-gallery/dist/statics/main.css'
import ReactImageGallery, { ReactImageGalleryItem } from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import * as ModelDef from '../Model/Model'
import Helper, { PokeHelper } from '../Model/Helper'
import { GalleryContext } from "../Context/GalleryContext"
import WaterUIback from './WaterUIback'
import useImgRepo from '../Hook/useImgRepo'
import OptionRollUI from '../UI/OptionRollUI'


const TARGET_POKE_DESC_LOADING = "loading..."

const WaterUI: FC = () => {

    const {
        appIsShowSpecialHandler,
    } = useContext(GalleryContext)

    const globalConfig = Helper.GetGlobalConfig()
    const pokeHelper = PokeHelper()

    const [stateIsShowReactImgGal, setStateIsShowReactImgGal] = useState<boolean>(false)
    const [stateReactImgGalIndex, setStateReactImgGalIndex] = useState<number>(0)
    const [stateToBeTargetPokeId, setStateToBeTargetPokeId] = useState<number>(-1)
    const [stateTargetPoke, setStateTargetPoke] = useState<ModelDef.TPokemonSpecies | null>(null)

    const [appImgRepo, appSetImgRepo] = useImgRepo()

    const {
        appDisplayGalleryItems,
    } = useContext(GalleryContext)

    const styleChangeHandler = (newOptValue: string) => {
        const targetImgRepo = globalConfig.Gallery.ImgRepo.find(ir => ir.optValue === newOptValue)
        appSetImgRepo(targetImgRepo!!)
    }

    const proGalItems = appDisplayGalleryItems.map((apiRes: ModelDef.TNamedAPIResource) => {

        const pokeId = pokeHelper.GetPokeIdFromPokeSpecApiRes(apiRes)

        return {
            itemId: pokeId + "",
            mediaUrl: `${appImgRepo.basePath}${pokeId}.${appImgRepo.ext}`, // without this the change style func does not work...
            url: `${appImgRepo.basePath}${pokeId}.${appImgRepo.ext}`,
            metadata: {
                type: "image",
                alt: ' '
            }
        }
    })

    const reactImgGalItems = proGalItems.map((proItem: any) => ({
        pokeId: proItem.itemId,
        original: proItem.url
    }))

    const proGalContainer = {
        width: window.innerWidth - 60, // minus some margin
        height: window.innerHeight
    };

    const proGalOptions = {
        imageHoverAnimation: 'ZOOM_IN',
        hoveringBehaviour: 'NEVER_SHOW',
        //gallerySizeType: 'px',
        //gallerySizePx: 200,
        gallerySize: 30,
        itemBorderWidth: 2,
        //itemEnableShadow: true,
        //imageMargin: 2,
        //minItemSize: 30,
    };

    const proGalEventsListener = (eventName: string, eventData: any) => {

        switch (eventName) {
            case 'ITEM_ACTION_TRIGGERED':
                if (eventData.type === 'image') {

                    setStateReactImgGalIndex(eventData.idx)

                    setStateTargetPoke(null)
                    setStateToBeTargetPokeId(parseInt(eventData.id))
                    setStateIsShowReactImgGal(true)
                }
                break;
        }
    }

    const displayPokeDetailHandler = (pokeSpec: ModelDef.TPokemonSpecies) => {
        setStateTargetPoke(pokeSpec)
    }

    return (
        <>
            <OptionRollUI
                Desc={"Style: "}
                OptionLabels={globalConfig.Gallery.ImgRepo.map(ir => ir.desc)}
                OptionValues={globalConfig.Gallery.ImgRepo.map(ir => ir.optValue)}
                InitSelectedInd={globalConfig.Gallery.ImgRepo.findIndex(ir => ir.optValue === appImgRepo.optValue)}
                OptionChangeHandler={(newOptValue) => styleChangeHandler(newOptValue)} />
            <br /><br />

            {appDisplayGalleryItems.length !== 0 &&
                <ProGallery items={proGalItems} container={proGalContainer}
                    options={proGalOptions} eventsListener={proGalEventsListener} />
            }

            {stateIsShowReactImgGal &&
                <div className="react-image-gallery-container-container">
                    <div className="react-image-gallery-container">
                    <ReactImageGallery items={reactImgGalItems}
                        onErrorImageURL={'water-default.png'}
                        showBullets={false}
                        showIndex={true}
                        showThumbnails={true}
                        lazyLoad={true}
                        showPlayButton={false}
                        startIndex={stateReactImgGalIndex}
                        slideDuration={0}
                        showFullscreenButton={false}
                        onClick={() => setStateIsShowReactImgGal(false)}
                        onSlide={(currentIndex: number) => {
                            setStateTargetPoke(null)
                            setStateToBeTargetPokeId(parseInt(reactImgGalItems[currentIndex].pokeId))
                        }}
                        /></div></div>
            }

            <Suspense fallback={null}>
            {appDisplayGalleryItems.map((apiRes: ModelDef.TNamedAPIResource) =>
                    <WaterUIback key={"WaterUIback1" + apiRes.name} pokeSpecApiRes={apiRes}
                        appIsTargetNow={pokeHelper.GetPokeIdFromPokeSpecApiRes(apiRes) === (stateToBeTargetPokeId)}
                        appDisplayPokeDetailHandler={displayPokeDetailHandler} />
                )}
            </Suspense>

            {
                stateIsShowReactImgGal &&
                <div className="target-poke-desc">
                    <h1 className="target-poke-desc-top-left">{stateTargetPoke != null ? "#" + stateTargetPoke.id : TARGET_POKE_DESC_LOADING}</h1>
                    <h1 className="target-poke-desc-bottom-center">{stateTargetPoke != null ? pokeHelper.GetNameDesc(stateTargetPoke) : TARGET_POKE_DESC_LOADING}</h1>
                </div>
            }
        </>)
}

export default WaterUI