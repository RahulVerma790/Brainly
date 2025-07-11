import { useNavigate } from "react-router-dom"
import { DocumentIcon } from "../icons/Document"
import { LinkIcon } from "../icons/Link"
import { LogoIcon } from "../icons/Logo"
import { TagIcon } from "../icons/Tag"
import { TwitterIcon } from "../icons/Twiiter"
import { UserIcon } from "../icons/User"
import { YoutubeIcon } from "../icons/Youtube"
import { Button } from "./Button"
import { MainHeading, SideBarItems } from "./SidebarItems"

 export const SideBar = () => {
    const navigate = useNavigate();

    return <div className={`h-screen bg-white-800 border-r w-64 fixed inset-0`}>
        <div>
            <MainHeading title="Brainly" icon={<LogoIcon color={"text-purple-500"} size="xl"/>} onHome={() => {
                navigate("/dashboard");
            }}/>
        </div>
        <div>
            <SideBarItems title="Twitter" icon={<TwitterIcon size="sm"/>} onClick ={() => {
                navigate("/tweets");
            }} />
            <SideBarItems title="Youtube" icon={<YoutubeIcon size="sm"/>} onClick={() => {
                navigate("/youtube");
            }} />
            <SideBarItems title="Document" icon={<DocumentIcon size="sm"/>}/>
            <SideBarItems title="Links" icon={<LinkIcon size="sm"/>}/>
            <SideBarItems title="Tags" icon={<TagIcon size="sm"/>}/>
        </div>
        <div className={`fixed bottom-0 left-0 w-64 p-5`}>
            <Button variant="secondary" text={"Logout"} startIcon={<UserIcon size="md"/>} fullWidth />
        </div>
    </div>
 }