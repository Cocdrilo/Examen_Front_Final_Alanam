import { Handlers, PageProps } from "$fresh/server.ts";
import axios from "axios"
import Show_Characters from "../islands/Show_Characters.tsx";


export const handler: Handlers = {
  async GET(_req, ctx) {

    const characters = await axios.get("https://hp-api.onrender.com/api/characters")
    const charData = characters.data

    return ctx.render(charData)

  },
}

export default function Home(props:PageProps) {
  return (
      <div>
        <Show_Characters character={props.data}/>
      </div>
  );
}
