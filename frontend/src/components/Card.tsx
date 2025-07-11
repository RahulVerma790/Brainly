import { DeleteIcon } from "../icons/Delete";
import { DocumentIcon } from "../icons/Document";
import { ShareIcon } from "../icons/Share";
import { TwitterIcon } from "../icons/Twiiter";
import { YoutubeIcon } from "../icons/Youtube";
import { TweetEmbed } from "./TweetEmbed";
import { YoutubeEmbed } from "./YoutubeEmbed";

const cardStyles = "bg-white-800 rounded-xl shadow-sm outline-slate-100 p-6 max-w-80 border min-w-72";

interface CardProps {
    key: string;
    id: string;
    title: string;
    link: string;
    type: "Twitter" |  "Youtube" | "Document";
    onDelete: (id: string) => void
}

export const Card = (props: CardProps) => {
    return <div className={`${cardStyles}`}>
        <div className={`flex justify-between`}>
            <div className={`flex items-center text-md font-normal`}>
                <div>
                    {props.type === "Youtube" ? <div><YoutubeIcon size="sm" /></div>
                     : props.type === "Twitter" ? <div><TwitterIcon size= "sm"/></div> 
                     : props.type === "Document" ? <div><DocumentIcon size="sm"/></div> 
                     : null}
                </div>
                <div className={`pl-2`}>
                    {props.title}
                </div>
            </div>
            <div className={`flex items-center`}>
                <div className={`pr-4 text-gray-100`}>
                    <a href = {props.link} target="_blank">
                        <ShareIcon size="sm"/>
                    </a>
                </div>
                <div className={`text-gray-100 cursor-pointer`} onClick={() => props.onDelete(props.id)}>
                    <DeleteIcon size="sm"/>
                </div>
            </div>
        </div>
        <div className={` pt-6`}>
            {props.type === "Youtube" && <YoutubeEmbed youtubeUrl={props.link}/>}
            
            {props.type === "Twitter" && <TweetEmbed tweetUrl={props.link}/>}
        </div>
    </div>
}