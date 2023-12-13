import * as React from 'react'

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
    htmlFor?: string;
    children?: React.ReactNode;
}

export function TextLabel({ htmlFor, children, ...props }: Props) {
    return (
        <label
            htmlFor={htmlFor || "Text"}
            className="block mb-2 text-sm font-medium text-gray-900 text-left"
            {...props}
        >
            {children || "Text"}
        </label>
    )
}