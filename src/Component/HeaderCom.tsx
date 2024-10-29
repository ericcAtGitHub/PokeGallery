import '../Style/HeaderCom.css'

import { DH } from '../Infra/Helper/_Helper'

export const UI = () => {

    return (<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'end' }} >
        <img src={DH.getSpritePokeBallSrc()} />
        <h1 className="header-com-title" style={{ marginLeft: 8 }}>{`PokeGallery`}</h1>
    </div>)
}