import { useFormik } from 'formik'
import { signUpSchema } from 'lezzauth/libs'
import { SIGN_IN_URL } from "lezzauth/nextjs/constants"
import { useLezzAuthContext } from "lezzauth/nextjs/hooks"
import { useSignUp } from "lezzauth/nextjs/hooks/components"
import Link from "next/link"
import React from "react"
import { PiWarningCircleFill } from 'react-icons/pi'
import { toFormikValidate } from 'zod-formik-adapter'
import appConfig from '../../../config'
import { Button as SignUpButton } from './Button'
import { EmailInput } from './EmailInput'
import { EmailLabel } from './EmailLabel'
import { GoogleButton } from './GoogleButton'
import { PasswordInput } from './PasswordInput'
import { PasswordLabel } from './PasswordLabel'


export const SignUp: React.FC = React.memo(() => {
    const { step, isLoadingDone } = useSignUp()

    return (
        <>
            {step !== "verify-email-address" ?
                isLoadingDone ? <SignUpFormContainer /> : null
                :
                isLoadingDone ? <SignUpVerifyForm /> : null
            }
        </>
    )
})

const SignUpForm: React.FC = React.memo(() => {
    const { state, dispatch } = useLezzAuthContext()
    const { handleSignUp } = useSignUp();
    const __serverError = state?.signUpForm?.input?.__serverError

    const {
        handleSubmit,
        handleChange,
        isSubmitting,
        errors,
        values,
        touched,
        setFieldTouched,
    } = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
        },
        validate: toFormikValidate(signUpSchema),
        onSubmit: (values, { setSubmitting, setFieldError }) => {
            if (!values.email && !values.username) {
                setFieldError('email', 'Email or username is required');
                setFieldError('username', 'Email or username is required');
            }

            handleSignUp(values, setSubmitting);
        },
    });

    React.useEffect(() => {
        dispatch({
            type: "SIGN_UP_FORM",
            payload: {
                signUpForm: {
                    input: {
                        setFieldTouched,
                        handleChange,
                        values,
                        firstName: { error: errors.firstName, touched: touched.firstName },
                        lastName: { error: errors.lastName, touched: touched.lastName },
                        username: { error: errors.username, touched: touched.username },
                        email: { error: errors.email, touched: touched.email },
                        password: { error: errors.password, touched: touched.password }
                    },
                    button: { isSubmitting },
                }
            }
        })

    }, [values, touched, isSubmitting, errors])

    return (
        <form className='space-y-4' onSubmit={handleSubmit}>

            <div>
                <EmailLabel />
                <EmailInput autoFocus />
            </div>

            <div>
                <PasswordLabel />
                <PasswordInput />
            </div>

            {__serverError && <InputError message={__serverError} />}

            <SignUpButton />
            <SignUpRedirectText />
        </form>
    );
});


export const SignUpContainer: React.FC<{ children: React.ReactNode }> = React.memo(({ children }: { children: React.ReactNode }) => (
    <MainContainer>
        <WatermarkSection>
            <Watermark />
        </WatermarkSection>
        <FormSection>
            <HeaderText>Sign up</HeaderText>
            <SubHeaderText>to continue to {appConfig.name}</SubHeaderText>
            {children}
            <SignUpRedirectText />
        </FormSection>
    </MainContainer>
));

export const SignUpProvider: React.FC<{ children: React.ReactNode }> = React.memo(({ children }: { children: React.ReactNode }) => {
    const { handleSignUp } = useSignUp();
    const { state, dispatch } = useLezzAuthContext();

    const {
        handleSubmit,
        handleChange,
        isSubmitting,
        errors,
        values,
        touched,
        setFieldTouched,
    } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
        },
        validate: toFormikValidate(signUpSchema),
        onSubmit: (values, { setSubmitting, setFieldError }) => {
            if (!values.email && !values.username) {
                setFieldError("email", "Email or username is required");
                setFieldError("username", "Email or username is required");
            }

            handleSignUp(values, setSubmitting);
        },
    });

    React.useEffect(() => {
        dispatch({
            type: "SIGN_UP_FORM",
            payload: {
                signUpForm: {
                    input: {
                        setFieldTouched,
                        handleChange,
                        values,
                        firstName: { error: errors.firstName, touched: touched.firstName },
                        lastName: { error: errors.lastName, touched: touched.lastName },
                        username: { error: errors.username, touched: touched.username },
                        email: { error: errors.email, touched: touched.email },
                        password: { error: errors.password, touched: touched.password },
                    },
                    button: { isSubmitting },
                },
            },
        });

    }, [values, touched, isSubmitting, errors]);

    return (
        <>
            <form className='space-y-4' onSubmit={state.signUpForm.button.onSubmit || handleSubmit}>
                {children}
            </form>
        </>
    )
})

export const InputError: React.FC<{ message: string }> = React.memo(({ message }: { message: string }) => {
    return (
        <div className="flex text-sm font-normal rounded-2xl space-x-1 h-fit w-fit mt-2">
            <PiWarningCircleFill style={{ color: "red", width: "15px", height: "15px" }} />
            <p className="text-[12px] text-left text-red-400">{message}</p>
        </div>
    )
})

const SignUpFormContainer: React.FC = React.memo(() => {
    return (
        <MainContainer>
            <WatermarkSection>
                <Watermark />
            </WatermarkSection>
            <FormSection>
                <HeaderText>
                    Sign up
                </HeaderText>
                <SubHeaderText>
                    to continue to {appConfig.name}
                </SubHeaderText>
                <OAuthButtons />
                <OrDivider />
                <SignUpForm />
            </FormSection>
        </MainContainer>
    )
})

const SignUpVerifyForm: React.FC = React.memo(() => <></>);

const FormSection: React.FC<{ children: React.ReactNode }> = React.memo(({ children }: { children: React.ReactNode }) => (
    <div className="w-full phone:w-[400px] bg-white rounded-3xl shadow-2xl border" style={{ color: appConfig.theme.textBackgroundColor, backgroundColor: appConfig.theme.backgroundColor }}>
        <div className="p-10 space-y-2">
            {children}
        </div>
    </div>
));

const HeaderText: React.FC<{ children: React.ReactNode }> = React.memo(({ children }: { children: React.ReactNode }) => (
    <p className="text-xl text-left font-bold text-[#141414]" style={{ color: appConfig.theme.textBackgroundColor }}>
        {children}
    </p>
));

const SubHeaderText: React.FC<{ children: React.ReactNode }> = React.memo(({ children }: { children: React.ReactNode }) => (
    <p className="text-[15px] text-left text-gray-400">
        {children}
    </p>
));

const LinkText: React.FC<{ href: string, children: React.ReactNode }> = React.memo(({ href, children }: { href: string, children: React.ReactNode }) => (
    <Link
        href={href}
        className="text-sm font-light text-primary-600 hover:underline text-[#8465FF]"
        style={{ color: appConfig.theme.color }}
    >
        {children}
    </Link>
));

const SignUpRedirectText: React.FC = React.memo(() => (
    <p className="text-sm font-light text-gray-500 text-left">
        Have an account? <LinkText href={SIGN_IN_URL}>Sign in</LinkText>
    </p>
));

const OAuthButtons: React.FC = React.memo(() => (
    <div className='flex flex-col space-x-2'>
        {appConfig.socialConnections.oauth_google.enabled ?
            <div className="flex items-center justify-center">
                <GoogleButton />
            </div>
            : null}
        {/* ... by github, apple, etc */}
    </div>
));

const MainContainer: React.FC<{ children: React.ReactNode }> = React.memo(({ children }: { children: React.ReactNode }) => (
    <div className="flex w-[400px]">
        {children}
    </div>
));

const OrDivider: React.FC = React.memo(() => (
    <div className='mt-4'>
        <div className="divider text-gray-400">OR</div>
    </div>
));

const WatermarkSection: React.FC<{ children: React.ReactNode }> = React.memo(({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-fit relative top-[50px]' style={{
            writingMode: 'vertical-lr',
            transform: 'rotate(180deg)',
            whiteSpace: 'nowrap',
            display: 'inline-block',
            overflow: 'visible',
        }}>
            {children}
        </div>
    )
})

const Watermark: React.FC = React.memo(() => {
    return (
        <div
            className="bg-[#6C47FF] text-white text-center flex justify-center items-center w-full space-y-1 p-2 rounded-bl-[5px] rounded-br-[5px] rounded-tr-[0px] rounded-tl-[0px]  sm:rounded-bl-[0px] sm:rounded-br-[5px] sm:rounded-tl-[0px] sm:rounded-tr-[5px]"
            style={{ backgroundColor: appConfig.theme.color }}
        >
            <p className='text-xs' style={{ color: appConfig.theme.textColor }}>Secured by </p>
            <p className='text-xs font-bold' style={{ color: appConfig.theme.textColor }}>Lezzauth</p>
        </div>
    )
})