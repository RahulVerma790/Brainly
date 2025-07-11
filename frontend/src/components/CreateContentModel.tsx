import { useEffect, useRef, useState } from "react";
import { CrossIcon } from "../icons/Cross";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface ContentProps {
    open: boolean;
    onClose: () => void
    onAdd?: () => void
}

const ContentType = {
    Youtube: "Youtube",
    Twitter: "Twitter",
    Document: "Document"
} as const;

type ContentType = typeof ContentType[keyof typeof ContentType]

export const CreateContentModel = (props: ContentProps) => {
    if(!props.open) return null;

    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState<ContentType>(ContentType.Youtube);

    function getEmbeddedLink(originalLink: string): string | null{
        try {
            const url = new URL(originalLink);

            if(url.hostname === "youtu.be"){
                return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
            }


            if (url.hostname.includes("youtube.com") && url.searchParams.get("v")) {
                return `https://www.youtube.com/embed/${url.searchParams.get("v")}`;
            }

            return originalLink;
        } catch(e){
            return originalLink;
        }
    }

    async function addContent() {
        try {
            const title = titleRef.current?.value.trim();
            const link = linkRef.current?.value.trim();

            let embedLink: string | null = null;

            if(link){
                embedLink = getEmbeddedLink(link);
            }

            await axios.post(`${BACKEND_URL}/api/v1/content`, {
                link: embedLink,
                type,
                title
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })

            props.onClose();
            alert("Content is added successfully");

            if(titleRef.current) titleRef.current.value = "";
            if(linkRef.current) linkRef.current.value = "";

            props.onAdd?.();

        }catch(e){
            alert("Content is not getting added.")
        }
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === "Escape") {
                props.onClose?.();
            }
        }
        if(props.open){
        document.addEventListener("keydown", handleKeyDown);
        }

        return ()=> { //Cleanup
            document.removeEventListener("keydown", handleKeyDown);
        };
    },[props.open, props.onClose]);

    const modalRef = useRef<HTMLDivElement>(null);

    const handleBackdropClick = (e:React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)){
            props.onClose?.();
        }
    }
    
    return (
        <>
            <div className={`fixed inset-0 z-50 flex justify-center items-center`} onClick={handleBackdropClick}>
                <div className={`absolute inset-0 bg-slate-500 opacity-60`}></div>
                <div ref={modalRef} onClick={(e) => e.stopPropagation} className={`relative z-10 bg-white-800 p-4 rounded shadow-lg`}>
                    <div className={`flex justify-end`}>
                        <div onClick={props.onClose} className={`cursor-pointer hover:bg-gray-200`}>
                            <CrossIcon size="md" />
                        </div>
                    </div>
                    <br/>
                    <div>
                        <Input ref={titleRef} placeholder="Title"/>
                        <Input ref={linkRef} placeholder="Link"/>
                    </div>
                    <div className="mt-4">
                        <div className={`flex gap-2 m-2`}>
                            <Button text="Youtube" variant= {type === ContentType.Youtube ? "primary" : "secondary"}
                            onClick = {() => {
                                setType(ContentType.Youtube);
                            }}/>
                            <Button text="Twitter" variant= {type === ContentType.Twitter ? "primary" : "secondary"}
                            onClick={() => {
                                setType(ContentType.Twitter)
                            }}/>
                            <Button text="Document" variant= {type === ContentType.Document ? "primary" : "secondary"}
                            onClick={() => {
                                setType(ContentType.Document)
                            }}/>
                        </div>
                    </div>
                    <div className={`flex justify-center m-2`}>
                        <Button onClick={addContent} variant="primary" text="Submit"/>
                    </div>
                </div>
            </div>
        </>
    )
}