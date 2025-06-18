import {Character} from "../types.ts";
import {favCharSignal} from "../signals.ts";
import { useEffect } from "preact/hooks";


export default function Show_Characters_Big({character}: {character:Character[]}) {

    const AddToFavorites = (charName:string) =>{
        const cookies = document.cookie.split("; ")
        const favCharacters = cookies.find((cookie)=>cookie.startsWith("favoriteCharacter="))
        if(!favCharacters || favCharacters === "favoriteCharacter="){
            document.cookie = `favoriteCharacter=${charName};path=/;max-age=3153600`
            favCharSignal.value = charName
        }
        else{
            const favCharactersJoin:String[] = favCharacters.split("=")[1].split(",")
            if(!favCharactersJoin.includes(charName)){
                favCharactersJoin.push(charName)
                document.cookie = `favoriteCharacter=${favCharactersJoin.join(",")};path=/;max-age=3153600`
                favCharSignal.value.push(charName)
            }else{
                const filteredFavs = favCharactersJoin.filter((c)=>c!==charName)
                document.cookie = `favoriteCharacter=${filteredFavs};path=/;max-age=3153600`
                favCharSignal.value = filteredFavs
            }
        }
    }

    useEffect(()=>{
        const cookies = document.cookie.split("; ")
        const favCharacters = cookies.find((cookie)=>cookie.startsWith("favoriteCharacter="))
        if(favCharacters || favCharacters === "favoriteCharacter="){
            const favCharactersAll = favCharacters.split("=")[1].split(",")
            favCharSignal.value = favCharactersAll
        }
    })

    return (
        <div>
            {character.map((char)=>(
                <div className="detail">
                    <img src={char.image !== ""? char.image: "https://ordinaria-limonera.deno.dev/no-image.jpg?__frsh_c=34f676c81b05e1f573aa6867cbfe80be3288b355"}/>
                    <h2>{char.name} <span className={favCharSignal.value.includes(char.name) ? "starfav" : "star"} onClick={(e) => AddToFavorites(char.name)}>★</span></h2>
                    <span>Casa: {char.house !== ""? char.house : "Desconocido"}</span>
                    <span>{char.alive ? "Vivo" : "Muerto"}</span>
                    <a href="/"> <span> Volver </span></a>
                </div>
            ))}
        </div>
    );
}
