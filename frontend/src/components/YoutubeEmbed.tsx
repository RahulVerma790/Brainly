export interface YoutubeProps {
    youtubeUrl: string
}

export const YoutubeEmbed = (props: YoutubeProps) => {
    return (
        <iframe className={`w-full aspect-video`} src={props.youtubeUrl.replace("watch", "embed")} 
            title="YouTube video player" frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    )
}