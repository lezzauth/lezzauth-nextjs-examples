import { useFormik } from 'formik'
import { SIGN_UP_URL } from "lezzauth/nextjs/constants"
import { useLezzAuthContext } from "lezzauth/nextjs/hooks"
import { useSignIn } from "lezzauth/nextjs/hooks/components"
import Link from "next/link"
import * as React from "react"
import { MdAccountCircle } from 'react-icons/md'
import { PiWarningCircleFill } from 'react-icons/pi'
import { TbEdit } from 'react-icons/tb'
import appConfig from '../../../config'
import { Button as SignInButton } from './Button'
import { EmailInput } from './EmailInput'
import { EmailLabel } from './EmailLabel'
import { GoogleButton } from './GoogleButton'
import { PasswordInput } from './PasswordInput'
import { PasswordLabel } from './PasswordLabel'

export const SignIn: React.FC = React.memo(() => {
    const { step, isLoadingDone } = useSignIn()

    return (
        <>
            {step !== "factor-one" ?
                isLoadingDone ? <SignInFormContainer /> : null
                :
                isLoadingDone ? <SignInFirstFactorContainer /> : null
            }
        </>
    )
})

const SignInForm: React.FC = React.memo(() => {
    const { handleSignIn } = useSignIn()
    const { state, dispatch } = useLezzAuthContext();
    const { handleSubmit, handleChange, values, isSubmitting, touched, errors } = useFormik({
        initialValues: {
            emailOrUsername: "",
            email: "",
            username: "",
            password: "",
        },
        onSubmit: (values, { setSubmitting }) => {
            handleSignIn(values, setSubmitting);
        },
    });

    React.useEffect(() => {
        dispatch({
            type: "SIGN_IN_FORM",
            payload: {
                signInForm: {
                    input: {
                        handleChange,
                        values
                    },
                    button: { isSubmitting },
                },
            },
        });

        console.log(state)

    }, [values, touched, isSubmitting, errors]);

    return (
        <form className='space-y-4' onSubmit={handleSubmit}>

            <div>
                <EmailLabel />
                <EmailInput autoFocus />
            </div>

            <SignInButton />
            <SignInRedirectText />

        </form>
    )
})


const SignInFirstFactorForm: React.FC = React.memo(() => {
    const { handleSignInFirstFactor, handleRemoveSignInTemp, tempEmail, tempUserId } = useSignIn()
    const { dispatch } = useLezzAuthContext();
    const { handleSubmit, handleChange, values, isSubmitting, touched, errors } = useFormik({
        initialValues: {
            password: "",
        },
        onSubmit: (values, { setSubmitting }) => {
            handleSignInFirstFactor(tempUserId, values.password, setSubmitting)
        },
    });

    React.useEffect(() => {
        dispatch({
            type: "SIGN_IN_FORM",
            payload: {
                signInForm: {
                    input: {
                        handleChange,
                        values,
                    },
                    button: { isSubmitting },
                },
            },
        });

    }, [values, touched, isSubmitting, errors]);

    return (
        <form className='space-y-4' onSubmit={handleSubmit}>
            <SignInTempEmailDisplay tempEmail={tempEmail} handleRemoveSignInTemp={handleRemoveSignInTemp} />

            <div>
                <PasswordLabel />
                <PasswordInput autoFocus />
            </div>

            <SignInButton />

            {/* {type === "email_code" && ()} */}

            {/* {type === "email_link" && ()} */}

            {/* {type === "sms_code" && ()}  */}

            <div className='mt-4'>
                <LinkText href="">
                    Get help
                </LinkText>
            </div>
        </form>
    )
})


export const SignInContainer: React.FC<{ children: React.ReactNode }> = React.memo(({ children }: { children: React.ReactNode }) => (
    <MainContainer>
        <WatermarkSection>
            <Watermark />
        </WatermarkSection>
        <FormSection>
            <HeaderText>
                Sign in
            </HeaderText>
            <SubHeaderText>
                to continue to {appConfig.name}
            </SubHeaderText>
            {children}
            <SignInRedirectText />
        </FormSection>
    </MainContainer>
));

export const SignInProvider: React.FC<{ children: React.ReactNode }> = React.memo(({ children }: { children: React.ReactNode }) => {
    const { handleSignIn } = useSignIn();
    const { state, dispatch } = useLezzAuthContext();

    const { handleSubmit, handleChange, values, isSubmitting, touched, errors } = useFormik({
        initialValues: {
            emailOrUsername: "",
            email: "",
            username: "",
            password: "",
        },
        onSubmit: (values, { setSubmitting }) => {
            handleSignIn(values, setSubmitting);
        },
    });

    React.useEffect(() => {
        dispatch({
            type: "SIGN_IN_FORM",
            payload: {
                signInForm: {
                    input: {
                        handleChange,
                        values,
                    },
                    button: { isSubmitting },
                },
            },
        });

    }, [values, touched, isSubmitting, errors]);

    return (
        <form className='space-y-4' onSubmit={state.signInForm.button.onSubmit || handleSubmit}>
            {children}
        </form>
    );
});

export const InputError: React.FC<{ message: string }> = React.memo(({ message }: { message: string }) => {
    return (
        <div className="flex text-sm font-normal rounded-2xl space-x-1 h-fit w-fit mt-2">
            <PiWarningCircleFill style={{ color: "red", width: "15px", height: "15px" }} />
            <p className="text-[12px] text-left text-red-400">{message}</p>
        </div>
    )
})

const SignInFormContainer: React.FC = React.memo(() => {
    return (
        <MainContainer>
            <WatermarkSection>
                <Watermark />
            </WatermarkSection>
            <FormSection>
                <HeaderText>
                    Sign in
                </HeaderText>
                <SubHeaderText>
                    to continue to {appConfig.name}
                </SubHeaderText>
                <OAuthButtons />
                <OrDivider />
                <SignInForm />
            </FormSection>
        </MainContainer>
    )
})

const SignInFirstFactorContainer: React.FC = React.memo(() => {
    return (
        <MainContainer>
            <WatermarkSection>
                <Watermark />
            </WatermarkSection>
            <FormSection>
                <HeaderText>
                    Sign in
                </HeaderText>
                <SubHeaderText>
                    to continue to {appConfig.name}
                </SubHeaderText>
                <SignInFirstFactorForm />
            </FormSection>
        </MainContainer>
    )
})

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

const SignInRedirectText: React.FC = React.memo(() => (
    <div className="text-sm font-light text-gray-500 text-left">
        No account? <LinkText href={SIGN_UP_URL}>Sign up</LinkText>
    </div>
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

const SignInTempEmailDisplay: React.FC<{ tempEmail: string, handleRemoveSignInTemp: () => void }> = React.memo(({ tempEmail, handleRemoveSignInTemp }: { tempEmail: string, handleRemoveSignInTemp: () => void }) => (
    <span className="flex bg-[#FAFAFA] text-[#FAFAFA]-800 text-sm font-normal mr-2 border border-white-300 rounded-2xl items-center p-[10px] space-x-2 h-fit w-fit">
        <MdAccountCircle style={{ width: '20px', height: '20px' }} color={appConfig.theme.color} />
        <p className="text-gray-400"> {tempEmail} </p>
        <TbEdit style={{ width: "20px", height: "20px", cursor: "pointer" }} color={appConfig.theme.color} onClick={handleRemoveSignInTemp} />
    </span>
))

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