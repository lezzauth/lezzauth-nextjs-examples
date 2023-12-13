import * as React from 'react';
import appConfig from '../../../config'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
}


export function OutlineButton({ children, ...props }: Props) {
    return (
        <button
            type="submit"
            className='w-fit text-[#6C47FF] hover:bg-[#DAD0FF] focus:ring-4 focus:outline-none focus:ring-[#6C47FF] font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-[#b29fff]'
            style={{ color: appConfig.theme.color }}
            {...props}
        >
            {children}
        </button>
    )
}