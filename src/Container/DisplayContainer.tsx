import { FC, useContext, useEffect, useState } from 'react'
import { SWRConfig } from 'swr'
import { animated } from "react-spring"

import * as ModelDef from '../Model/Model'
import Helper from '../Model/Helper'
import GalleryContextHOC, { IGalleryContextHOC } from "../Context/GalleryContext"
import useAnim from '../Hook/useAnim'
import GalleryUI from '../UI/GalleryUI'
import WaterUI from '../UI/WaterUI'

const DisplayContainer = (enumViewPage: ModelDef.EViewPage) => {

    const stateAnim = useAnim(enumViewPage)

    const getContent = (eViewPage: ModelDef.EViewPage) => {
        switch (eViewPage) {
            case ModelDef.EViewPage.Water:
                return <WaterUI />
            default:
                return <GalleryUI />
        }
    }

    return (
        <GalleryContextHOC>
            {stateAnim((styles, custItem) => (
                <animated.div style={{
                    ...styles,
                }}>
                    {getContent(custItem)}
				</animated.div>
            ))
        }
        </GalleryContextHOC>
    )
};

export default DisplayContainer