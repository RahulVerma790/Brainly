import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Content {
    _id: string;
    title: string;
    link: string;
    type: "Twitter" | "Youtube" | "Document"
}

export const useContent = (): [Content[], React.Dispatch<React.SetStateAction<Content[]>>, () => void] => {
    const [contents, setContents] = useState<Content[]>([]);

    const fetchContent = () => {
    axios
       .get<{content:Content[]}>(`${BACKEND_URL}/api/v1/content`, {
        headers: {
            "Authorization": localStorage.getItem("token")}
       })
        .then((res) => {setContents(res.data.content)})
        .catch(console.error);
    };

    useEffect(fetchContent,[]);

    return [contents, setContents, fetchContent];
}