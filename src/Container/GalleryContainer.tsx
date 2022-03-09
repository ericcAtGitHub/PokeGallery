import { ChangeEvent, FC, useEffect, useState } from 'react';
import { SWRConfig } from 'swr'

import * as ModelDef from '../Model/Model'
import GalleryContextHOC, { IGalleryContextHOC } from "../Context/GalleryContext";
import GalleryUI from '../UI/GalleryUI';

const GallaryContainer: FC = (p) => {
    
    return (
        <GalleryContextHOC {...p}>
                <GalleryUI />
        </GalleryContextHOC>
            )
};

export default GallaryContainer;