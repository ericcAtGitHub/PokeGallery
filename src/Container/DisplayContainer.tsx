import * as ModelDef from '../Infra/ModelDef'
import * as AppContext from '../Context/_AppContext'
import * as Gallery from '../Component/GalleryCom'
import * as Waterfall from '../Component/WaterfallCom'
import * as Declar from '../Component/DeclarCom'
import * as Header from '../Component/HeaderCom'

const getContent = (eViewPage: ModelDef.EViewPage) => {
    switch (eViewPage) {
        case ModelDef.EViewPage.Water:
            return (<Waterfall.UI />)
        default:
            return (<Gallery.UI />)
    }
}

type TProps = {
    enumViewPage: ModelDef.EViewPage
}

const DisplayContainer = ({ enumViewPage }: TProps) => {

    return (
        <>
            <Header.UI/>

            <AppContext.Data.HOC>
                {getContent(enumViewPage)}
            </AppContext.Data.HOC>

            <Declar.UI />
        </>
    )
};

export default DisplayContainer