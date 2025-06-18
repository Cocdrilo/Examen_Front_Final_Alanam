import { Handlers, PageProps } from "$fresh/server.ts";
import axios from "axios";
import Show_Characters from "../../islands/Show_Characters.tsx";
import Show_Characters_Big from "../../islands/Show_Characters_Big.tsx";


export const handler: Handlers = {
    async GET(req, ctx) {

        const id = ctx.params.id
        console.log(id)

        const characters = await axios.get("https://hp-api.onrender.com/api/character/" + id)
        const charData = characters.data

        return ctx.render(charData)

    },
}


export default function Show_Character_WithID(props:PageProps) {
    return (
        <div>
            <Show_Characters_Big character={props.data}/>
        </div>
    );
}
