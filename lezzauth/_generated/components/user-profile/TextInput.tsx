import * as React from 'react';
import { PiWarningCircleFill } from 'react-icons/pi';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    name?: string;
    label?: string;
    touched?: boolean
    error?: string;
}

export function TextInput({ onChange, id, name, label, touched, error, ...props }: Props) {
    return (
        <>
            <input
                type="text"
                name={name || "text"}
                id={id || "text"}
                className={`text-sm focus:shadow- focus:outline-none bg-white ${error && touched ? "border border-red-400 focus:border-red-600" : "border border-white-400 focus:border-white-600"} text-gray-900 rounded-lg block w-full p-2.5`}
                onChange={onChange}
                {...props}
            />
            {error && touched && (
                <span className="flex text-sm font-medium rounded-2xl space-x-2 h-fit w-fit mt-2">
                    <PiWarningCircleFill style={{ color: "red", width: "20px", height: "20px" }} />
                    <p className="text-[15px] text-left text-red-400">{error}</p>
                </span>
            )}
        </>
    )
}