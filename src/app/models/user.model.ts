import { Pokemon } from "../models/pokemon.model"

export interface User {
    id:number,
    username:string,
    pokemons: Pokemon[]
}