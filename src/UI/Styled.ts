import styled from 'styled-components'
import * as ModelDef from '../Model/Model'

// Type colors
const type: any = {
  bug: 'rgb(81,204,90)',
  dark: 'rgb(104,129,213)',
  dragon: 'rgb(254,136,88)',
  electric: 'rgb(232,212,1)',
  fairy: 'rgb(253,119,154)',
  fighting: 'rgb(239,105,106)',
  fire: 'rgb(255,167,103)',
  flying: 'rgb(100,166,240)',
  ghost: 'rgb(177,110,180)',
  grass: 'rgb(154,195,13)',
  ground: 'rgb(200,168,65)',
  ice: 'rgb(96,232,244)',
  normal: 'rgb(174, 174, 174)',
  poison: 'rgb(171,122,203)',
  psychic: 'rgb(236,127,244)',
  rock: 'rgb(251,199,38)',
  steel: 'rgb(128,138,165)',
  water: 'rgb(100,198,247)'
}

type TStyledGalleryUICardProps = {
    pokeColor: string
}

export const StyledGalleryUICard = styled.div<TStyledGalleryUICardProps>`
  position: relative;
  
  ${({ pokeColor }) => `
    background-image: linear-gradient(60deg, rgb(45, 45, 45) 30%, ${pokeColor} 100%);
  `}

  .ul-poke-desc {
    ${({ pokeColor }) => `border-left: 5px solid ${pokeColor};`}
    list-style-type: none;
    padding: 3px 10px;
  }

  .ul-poke-desc li:first-child {
     padding-bottom: 10px;
  }

    .ul-poke-spec li {
        padding-bottom: 5px;
        white-space:nowrap;
        color: #ffffff;
    }

    .h-weight-height-desc{
        margin-left:15px;
        margin-top:5px;
    }

`

type TStyledPokeTypeProps = {
    pokemonType: string
}

export const StyledPokeType = styled.span<TStyledPokeTypeProps>`
  position: relative;
  
  ${({ pokemonType }) => `
    background: ${type[pokemonType]};
    background-size: 65%;
    background-position: center;
  `}

  display: inline-block;
  border-radius: 20px;
  font-weight: bold;
  padding: 6px;
  color: #444444;
  margin-right: 4px;
  opacity: 1;
  text-transform: capitalize;
`