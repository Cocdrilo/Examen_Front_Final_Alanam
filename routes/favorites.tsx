import {Character} from "../types.ts";
import {favCharSignal} from "../signals.ts";
import { useEffect } from "preact/hooks";
import { Handlers, PageProps } from "$fresh/server.ts";
import Show_Characters from "../islands/Show_Characters.tsx";
import axios from "axios";
import { FunctionalComponent } from "preact/src/index.d.ts";


export const handler: Handlers = {
    async GET(req, ctx) {
        const headers = req.headers
        const cookies = headers.get("cookie")
        const favoriteChars = cookies?.split("; ").find((cookie)=>cookie.trim().startsWith("favoriteCharacter=")).split("=")[1]

        const favoriteCharsArray = favoriteChars.split(",")

        const characters = await axios.get("https://hp-api.onrender.com/api/characters")
        const charData = characters.data

        const filteredChars = charData.filter((char)=> favoriteCharsArray.includes(char.name))

        console.log(filteredChars)

        return ctx.render(filteredChars)
    },
}

export default function Favorite_List(props:PageProps) {
    console.log(props.data)
    return (
        <div>
            <Show_Characters character={props.data}/>
        </div>
    );
}
