import { FC, useContext, useEffect, useState } from 'react'
import { SWRConfig } from 'swr'

import * as ModelDef from '../Model/Model'
import Helper from '../Model/Helper'
import GalleryContextHOC, { IGalleryContextHOC } from "../Context/GalleryContext"
import GalleryUI from '../UI/GalleryUI'
import WaterUI from '../UI/WaterUI'

const getContent = (eViewPage: ModelDef.EViewPage) => {
    switch (eViewPage) {
        case ModelDef.EViewPage.Water:
            return (<WaterUI />)
        default:
            return (<GalleryUI />)
    }
}

const DisplayContainer = (enumViewPage: ModelDef.EViewPage) => {

    return (
        <GalleryContextHOC>
            {getContent(enumViewPage)}
        </GalleryContextHOC>
    )
};

export default DisplayContainer