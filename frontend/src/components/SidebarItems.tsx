import type { ReactElement } from "react";

export interface ItemsProps {
    title: string;
    icon: ReactElement;
    onClick?: () => void;
    onHome?: () => void;
 }
export const SideBarItems = (props: ItemsProps ) => {
    return <div className={`flex pl-9 p-4 cursor-pointer items-center text-gray-300 hover:bg-gray-200 rounded max-w-64 transition-all 
    duration-500`} onClick={props.onClick}>
        <div>
            {props.icon}
        </div>
        <div className={`pl-3`}>
            {props.title}
        </div>
    </div>
 }

 export const MainHeading = (props: ItemsProps) => {
    return <div className={`flex items-center text-2xl p-3 cursor-pointer`} onClick={props.onHome}>
        <div>
            {props.icon}
        </div>
        <div className={`font-semibold p-3`}>
            {props.title}
        </div>
    </div>
 }