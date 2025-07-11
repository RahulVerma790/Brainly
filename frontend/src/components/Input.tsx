export interface InputProps {
    placeholder: string;
    ref?: any;
}

export const Input = (props: InputProps) => {
    return <div>
        <input ref={props.ref} placeholder={props.placeholder} type="text" className={`px-4 py-2 border rounded m-2`}></input>
    </div>
}