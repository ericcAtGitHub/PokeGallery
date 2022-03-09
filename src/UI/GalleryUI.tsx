import { FC, useContext, useState, useRef, useEffect, Suspense, lazy } from 'react';
//import { RouteComponentProps } from 'react-router';

import Helper from '../Model/Helper'
import * as ModelDef from '../Model/Model'
import { GalleryContext } from "../Context/GalleryContext"
import GallaryUICard from "./GalleryUICard"
import PokeCardLoadingSkeleton from "./GalleryUICardLoadSkeleton"

const GalleryUI: FC = () => {

	const {
		appProceededData,
		appRouteCtx
	} = useContext(GalleryContext)

	const [stateIsLoadMore, setStateIsLoadMore] = useState<boolean>(false)

	// just to avoid the following warning for the "useEffect" line below:
	// "React Hook useEffect has a complex expression in the dependency array. 
	// Extract it to a separate variable so it can be statically checked"
	const routeMatchParam = appRouteCtx!.match.params

	useEffect(() => { // re-load at appropriate time
		setStateIsLoadMore(false)
	}, [routeMatchParam])

	

	//const GallaryUICard = lazy(() => import("./GalleryUICard"))

	return (appProceededData == null ? <></> :
		<>
			<Suspense fallback={<p>Loading...</p>}>
			{appProceededData.slice(0, 30).map((apiRes: ModelDef.TNamedAPIResource) =>
				<Suspense key={"GallaryUIsuspense" + apiRes.name} fallback={<PokeCardLoadingSkeleton pokeSpecApiRes={apiRes}/>}>
					{/*<PokeCardLoadingSkeleton pokeSpecApiRes={apiRes}/>*/}
					<GallaryUICard key={apiRes.name} pokeSpecApiRes={apiRes} />
				</Suspense>
			)}
			</Suspense>

			<Suspense fallback={<p>Loading...</p>}>
				{appProceededData.slice(30, 60).map((apiRes: ModelDef.TNamedAPIResource) =>
					<Suspense key={"GallaryUIsuspense" + apiRes.name} fallback={<PokeCardLoadingSkeleton pokeSpecApiRes={apiRes} />}>
						{/*<PokeCardLoadingSkeleton pokeSpecApiRes={apiRes}/>*/}
						<GallaryUICard key={apiRes.name} pokeSpecApiRes={apiRes} />
					</Suspense>
				)}
			</Suspense>

			{appProceededData.length > 60 && !stateIsLoadMore &&
				<>
				<button onClick={() => setStateIsLoadMore(true)} className="btn btn-primary mx-auto d-block mt-3">
					Load more
				</button>
				</>
				
			}

			{stateIsLoadMore &&
				<>
				<Suspense fallback={<p>Loading...</p>}>
				{appProceededData.slice(60, 90).map((apiRes: ModelDef.TNamedAPIResource) =>
					<Suspense key={"GallaryUIsuspense" + apiRes.name} fallback={<PokeCardLoadingSkeleton pokeSpecApiRes={apiRes} />}>
						{/*<PokeCardLoadingSkeleton pokeSpecApiRes={apiRes}/>*/}
						<GallaryUICard key={apiRes.name} pokeSpecApiRes={apiRes} />
					</Suspense>
				)}
			</Suspense>

			<Suspense fallback={<p>Loading...</p>}>
				{appProceededData.slice(90, 120).map((apiRes: ModelDef.TNamedAPIResource) =>
					<Suspense key={"GallaryUIsuspense" + apiRes.name} fallback={<PokeCardLoadingSkeleton pokeSpecApiRes={apiRes} />}>
						{/*<PokeCardLoadingSkeleton pokeSpecApiRes={apiRes}/>*/}
						<GallaryUICard key={apiRes.name} pokeSpecApiRes={apiRes} />
					</Suspense>
				)}
			</Suspense>

			<Suspense fallback={<p>Loading...</p>}>
				{appProceededData.slice(120, 151).map((apiRes: ModelDef.TNamedAPIResource) =>
					<Suspense key={"GallaryUIsuspense" + apiRes.name} fallback={<PokeCardLoadingSkeleton pokeSpecApiRes={apiRes} />}>
						{/*<PokeCardLoadingSkeleton pokeSpecApiRes={apiRes}/>*/}
						<GallaryUICard key={apiRes.name} pokeSpecApiRes={apiRes} />
					</Suspense>
				)}
			</Suspense>
			</>}
			</>)
}

export default GalleryUI;