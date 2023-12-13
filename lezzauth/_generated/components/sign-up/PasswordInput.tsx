import { useLezzAuthContext } from 'lezzauth/nextjs';
import * as React from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import { InputError } from '.';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    name?: string;
    label?: string;
}

export function PasswordInput({ onChange, id, name, label, style, className, ...props }: Props) {
    const { state } = useLezzAuthContext();
    const [showPassword, setShowPassword] = React.useState(false);
    const error = state.signUpForm?.input?.password?.error;
    const touched = state.signUpForm?.input?.password?.touched;
    const handleChange = state.signUpForm?.input?.handleChange

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    name={name || "password"} id={id || "password"}
                    onChange={onChange || handleChange as React.ChangeEventHandler<HTMLInputElement>}
                    className={twMerge(`text-sm focus:shadow- focus:outline-none bg-white ${error ? "border border-red-400 focus:border-red-600" : "border border-white-400 focus:border-white-600"} text-gray-900 rounded-lg block w-full p-2.5`, className)}
                    style={{ ...style }}
                    {...props}
                />
                <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                    {showPassword ? (
                        <AiFillEyeInvisible className="text-[#b5b3b3] hover:text-[#858585] w-[20px] h-[20px]" />
                    ) : (
                        <AiFillEye className="text-[#b5b3b3] hover:text-[#858585] w-[20px] h-[20px]" />
                    )}
                </button>
            </div>
            {error && touched && <InputError message={error} />}
        </>
    )
}