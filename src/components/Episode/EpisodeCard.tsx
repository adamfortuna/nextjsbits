import { EpisodeType } from "@/types";

export default function EpisodeCard({episode}:{episode:EpisodeType}) {


  return <p>{episode.title}</p>
}