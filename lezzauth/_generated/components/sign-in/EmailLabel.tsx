import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import appConfig from '../../../config';

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
    htmlFor?: string;
    label?: string
}

export function EmailLabel({ htmlFor, label, style, className, ...props }: Props) {
    return (
        <label
            htmlFor={htmlFor || "email"}
            className={twMerge('block mb-2 text-sm font-medium text-gray-900 text-left', className)}
            style={{ color: appConfig.theme.textBackgroundColor, ...style }}
            {...props}
        >
            {label || "Email address"}
        </label>
    )
}