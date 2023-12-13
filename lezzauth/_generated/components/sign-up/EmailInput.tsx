import { useLezzAuthContext } from 'lezzauth/nextjs';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { InputError } from '.';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    name?: string;
    label?: string;
}

export function EmailInput({ onChange, id, name, label, style, className, ...props }: Props) {
    const { state } = useLezzAuthContext();
    const error = state.signUpForm?.input?.email?.error
    const touched = state.signUpForm?.input?.email?.touched
    const handleChange = state.signUpForm?.input?.handleChange
    const setFieldTouched = state.signUpForm?.input?.setFieldTouched

    return (
        <>
            <input
                type={"email"}
                name={name || "email"}
                id={id || "email"}
                onChange={onChange || handleChange as React.ChangeEventHandler<HTMLInputElement>}
                onKeyDown={() => { setFieldTouched && setFieldTouched("email", true) }}
                className={twMerge(`text-sm focus:shadow- focus:outline-none bg-white ${error ? "border border-red-400 focus:border-red-600" : "border border-white-400 focus:border-white-600"} text-gray-900 rounded-lg block w-full p-2.5`, className)}
                style={{ ...style }}
                {...props}
            />
            {error && touched && <InputError message={error} />}
        </>
    )
}