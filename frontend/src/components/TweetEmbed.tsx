import { useEffect } from "react"

export interface TweetProps {
    tweetUrl: string
}
export const TweetEmbed = (props: TweetProps) => {
    
    useEffect(() => {
        const interval = setInterval(() => {
            if((window as any).twtter && (window as any).twtter.widgets){
                (window as any).twtter.widgets.load();
                clearInterval(interval);
            }
        },300);

        return () => clearInterval(interval);
    },[])

    return ( 
    <blockquote className="twitter-tweet">
        <a href={props.tweetUrl.replace("x.com", "twitter.com")}></a>
    </blockquote>
    );
}