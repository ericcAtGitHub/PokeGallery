export const home_page = "/:routeId?"
export const waterfall_page = "/waterfall/:routeId?"

type TMyRouteMatchParams = {
    routeId: string
}

export const base_url = import.meta.env.BASE_URL

export const sprites_pokemon = `${base_url}sprites/pokemon/`

export const sprites_poke_ball = `${base_url}sprites/items/dream-world/poke-ball.png`