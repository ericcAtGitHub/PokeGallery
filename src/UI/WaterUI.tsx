import { FC, useContext, useEffect, useState, Suspense } from 'react';

import { ProGallery } from 'pro-gallery'
import 'pro-gallery/dist/statics/main.css';
import ReactImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import * as ModelDef from '../Model/Model'
import Helper, { PokeHelper } from '../Model/Helper'

import { GalleryContext } from "../Context/GalleryContext";
import WaterUIback from './WaterUIback';
import useSWR from 'swr';

const target_poke_desc_loading = "loading..."

const WaterUI: FC = () => {

    const {
        appIsShowHandler,
    } = useContext(GalleryContext)

    const [stateIsShowReactImgGal, setStateIsShowReactImgGal] = useState<boolean>(false)
    const [stateReactImgGalIndex, setStateReactImgGalIndex] = useState<number>(0)
    const [stateToBeTargetPokeId, setStateToBeTargetPokeId] = useState<number>(-1)
    const [stateTargetPoke, setStateTargetPoke] = useState<ModelDef.TPokemonSpecies|null>(null)

    const {
        appProceededData,
    } = useContext(GalleryContext)

    const pokeHelper = PokeHelper()

    const proGalItems = appProceededData.map((apiRes: ModelDef.TNamedAPIResource) => {

        const pokeId = pokeHelper.GetPokeIdFromPokeSpecApiRes(apiRes)
        //console.log(pokemonId)
            return {
                itemId: pokeId + "",
                url: `sprites/pokemon/other/dream-world/${pokeId}.svg`,
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
                //console.log(eventData)
                if (eventData.type === 'image') {

                    setStateReactImgGalIndex(eventData.idx)

                    setStateTargetPoke(null)
                    setStateToBeTargetPokeId(parseInt(eventData.id))
                    setStateIsShowReactImgGal(true)
                }
                break;
        }
    }

    const setDisplayHandler = (pokeSpec: ModelDef.TPokemonSpecies) => {
        setStateTargetPoke(pokeSpec)
    }

    return (
        <>
            <link rel="stylesheet" type="text/css" href={`${process.env.PUBLIC_URL}/pageCss/water-ui.css`} />

            {appProceededData.length !== 0 &&
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
            {appProceededData.map((apiRes: ModelDef.TNamedAPIResource) =>
                    <WaterUIback key={"WaterUIback1" + apiRes.name} pokeSpecApiRes={apiRes}
                        appIsTargetNow={pokeHelper.GetPokeIdFromPokeSpecApiRes(apiRes) === (stateToBeTargetPokeId)}
                        appSetDisplayHandler={setDisplayHandler} />
                )}
            </Suspense>

            {
                stateIsShowReactImgGal &&
                <div className="target-poke-desc">
                    <h1 className="target-poke-desc-top-left">{stateTargetPoke != null ? "#" + stateTargetPoke.id : target_poke_desc_loading}</h1>
                    <h1 className="target-poke-desc-bottom-center">{stateTargetPoke != null ? pokeHelper.GetNameDesc(stateTargetPoke) : target_poke_desc_loading}</h1>
                </div>
            }

        </>)
};

export default WaterUI;