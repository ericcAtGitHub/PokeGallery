import { useContext, useState, useRef, useEffect, Suspense } from 'react'

import * as ModelDef from '../Infra/ModelDef'
import * as MyHook from '../Infra/MyHook'
import * as AppContext from '../Context/_AppContext'
import * as GalleryCard from "./GalleryCardCom"
import * as GalleryCardSkeleton from "./GalleryCardSkeletonCom"
import { CH, MH, DH, NH } from '../Infra/Helper/_Helper'

const slice_length = 30
const init_slice_no = 2

export const UI = () => {

	const {
		ctxDispPokesCol
	} = useContext(AppContext.Data.Def)

	const [stateIsLoadAll, setStateIsLoadAll] = useState(false)

	const stRouteId = MyHook.useRouteId()

	useEffect(() => { // page feature reload when routeId changed
		setStateIsLoadAll(false)
	}, [stRouteId])

	const isShowLoadMoreBtn =
		(ctxDispPokesCol.length > (init_slice_no * slice_length)) && !stateIsLoadAll

	const stLastSliceInd = Math.floor(ctxDispPokesCol.length / slice_length)

	if (!ctxDispPokesCol) {
		return null
	}

	return (
		<>
			{MH.getArray0ToMax(init_slice_no - 1).map(sliceInd =>
			(<DispSlice key={sliceInd} start={sliceInd * slice_length} end={(sliceInd + 1) * slice_length}
			/>))}

			{isShowLoadMoreBtn ?
				(<button onClick={() => setStateIsLoadAll(true)}
					className="btn btn-primary mx-auto d-block mt-3">
					Load more
				</button>) : null
			}

			{stateIsLoadAll && (stLastSliceInd >= init_slice_no) ? (<>{
				MH.getArrayMinToMax(init_slice_no, stLastSliceInd).map(sliceInd =>
				(<DispSlice key={sliceInd} start={sliceInd * slice_length} end={(sliceInd + 1) * slice_length}
				/>))
			}</>) : null}

		</>)
}

type TDispSliceProps = {
	start: number
	end: number
}

const DispSlice = ({ start, end }: TDispSliceProps) => {

	const {
		ctxDispPokesCol
	} = useContext(AppContext.Data.Def)

	return (<Suspense fallback={<LoadingUI />}>
		{ctxDispPokesCol.slice(start, end).map((apiRes: ModelDef.TNamedAPIResource) =>

			<Suspense key={"GalleryUI" + apiRes.name}
				fallback={<GalleryCardSkeleton.UI pokeSpecApiRes={apiRes} />}>
				<GalleryCard.UI key={apiRes.name} pokeSpecApiRes={apiRes} />
			</Suspense>
		)}
	</Suspense>)
}

const LoadingUI = () => (<p>Loading...</p>)