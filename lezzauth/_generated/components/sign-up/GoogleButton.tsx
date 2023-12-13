
import { useSignIn } from 'lezzauth/nextjs/hooks/components';
import * as React from 'react';
import { AiFillGoogleCircle, AiOutlineArrowRight } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import appConfig from '../../../config';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
}

export function GoogleButton({ children, style, className }: Props) {
    const { handleSignInGoogle } = useSignIn()

    return (
        <button
            onClick={handleSignInGoogle}
            className={twMerge('flex items-center justify-between bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-[#6C47FF] space-x-2 w-full group mt-5', className)}
            style={{ color: appConfig.theme.textBackgroundColor, backgroundColor: appConfig.theme.backgroundColor, ...style }}>
            <div className='flex items-center space-x-2'>
                <AiFillGoogleCircle size={"20px"} style={{ color: appConfig.theme.textBackgroundColor }} />
                <span style={{ color: appConfig.theme.textBackgroundColor }}> {children || "Continue with Google"}</span>
            </div>
            <AiOutlineArrowRight className="opacity-0 transform translate-x-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 ease-in-out" style={{ color: appConfig.theme.textBackgroundColor }} />
        </button>
    )
}
