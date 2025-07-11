import type { ReactElement } from "react";

type Variants = "primary" |  "secondary";

export interface ButtonProps {
    variant: Variants;
    text: String;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
 }

 const variantTypes = {
    "primary": "bg-purple-600 text-purple-200",
    "secondary": "bg-purple-200 text-purple-400"
 }

 const defaultStyles = "cursor-pointer rounded-md font-light flex items-center";

export const Button = (props: ButtonProps) => {
    return <button onClick={props.onClick} className={`${variantTypes[props.variant]} ${defaultStyles}
    ${props.fullWidth ? "w-full flex justify-center items-center px-4 py-2" : "px-4 py-2"} ${props.loading ? "opacity-45" : "" }`} disabled={props.loading}>
        {props.startIcon ? <div className={`pr-2`}>{props.startIcon}</div> : null} 
        <div>{props.text}</div>
    </button>
}