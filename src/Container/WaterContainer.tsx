import { FC, useContext, useEffect, useState } from 'react';
import { SWRConfig } from 'swr'
import * as ModelDef from '../Model/Model'
import Helper from '../Model/Helper'
import GalleryContextHOC, { IGalleryContextHOC } from "../Context/GalleryContext";
import WaterUI from '../UI/WaterUI'

const WaterContainer: FC = (p) => {

    return (
        <GalleryContextHOC {...p}>
            <WaterUI />
        </GalleryContextHOC>
    )
};

export default WaterContainer;