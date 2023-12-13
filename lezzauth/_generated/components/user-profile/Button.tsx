import * as React from 'react';
import appConfig from '../../../config'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
}

export function Button({ children, ...props }: Props) {
    return (
        <button
            type="submit"
            className='w-fit text-white bg-[#6C47FF] hover:bg-[#664ad5] focus:ring-4 focus:outline-none focus:ring-[#6C47FF] font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-75 disabled:brightness-150'
            style={{ color: appConfig.theme.textColor, backgroundColor: appConfig.theme.color }}
            {...props}
        >
            {children}
        </button>
    )
}