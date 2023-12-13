import { useLezzAuthContext } from 'lezzauth/nextjs';
import * as React from 'react';
import { ClipLoader } from 'react-spinners';
import { twMerge } from 'tailwind-merge';
import appConfig from '../../../config';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode,
    onSubmit?: () => void
}

export function Button({ children, type, onSubmit, style, className, ...props }: Props) {
    const { state, dispatch } = useLezzAuthContext()

    React.useEffect(() => {
        if (onSubmit) {
            dispatch({
                type: "SIGN_UP_FORM",
                payload: {
                    signUpForm: {
                        button: {
                            onSubmit: (e) => {
                                e?.preventDefault()
                                onSubmit()
                            }
                        }
                    }
                }
            })
        }
    }, [state.signUpForm?.input?.values])


    return (
        <button
            type={type || "submit"}
            className={twMerge(`w-full text-white bg-[#6C47FF] hover:bg-[#664ad5] focus:ring-4 focus:outline-none focus:ring-[#6C47FF] font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-[#b29fff]`, className)}
            style={{
                color: appConfig.theme.textColor,
                backgroundColor: appConfig.theme.color,
                ...style
            }}
            disabled={state.signUpForm?.button?.isSubmitting}
            {...props}
        >
            {state.signUpForm?.button?.isSubmitting ? <ClipLoader color="white" size={"20px"} /> : children || "CONTINUE"}
        </button>
    )
}