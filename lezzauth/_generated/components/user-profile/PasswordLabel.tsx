import * as React from 'react'

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
    htmlFor?: string;
    chldren?: React.ReactNode
}

export function PasswordLabel({ htmlFor, children, ...props }: Props) {
    return (
        <label
            htmlFor={htmlFor || "password"}
            className="block mb-2 text-sm font-medium text-gray-900 text-left"
            {...props}
        >
            {children || "Password"}
        </label>
    )
}