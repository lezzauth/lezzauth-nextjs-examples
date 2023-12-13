import { useFormik } from 'formik'
import { changePasswordSchema, setPasswordSchema } from 'lezzauth/libs'
import { useLezzAuthContext } from 'lezzauth/nextjs/hooks'
import { UserProfilePanel, useUserProfile } from 'lezzauth/nextjs/hooks/components'
import * as React from 'react'
import { AiFillFolder, AiOutlineArrowRight, AiOutlinePlus } from 'react-icons/ai'
import {
    MdAccountCircle,
    MdAdd,
    MdEdit,
    MdSecurity
} from 'react-icons/md'
import { PiWarningCircleFill } from 'react-icons/pi'
import { ClipLoader } from 'react-spinners'
import { toFormikValidate } from 'zod-formik-adapter'
import appConfig from '../../../config'
import { Button } from './Button'
import { OutlineButton } from './OutlineButton'
import { PasswordInput } from './PasswordInput'
import { PasswordLabel } from './PasswordLabel'
import { TextInput } from './TextInput'
import { TextLabel } from './TextLabel'

export function UserProfile() {
    const {
        // Scroll references
        accountScrollRef,
        securityScrollRef,

        // Panel state and actions
        activePanelNextAction,
        setActivePanelNextAction,

        // Email address accordion
        setIsEmailAddressAccordionShow,
        isEmailAddressAccordionShow,

        // Active device accordion
        setIsActiveDeviceAccordionShow,
        isActiveDeviceAccordionShow,

        // Action process success
        isActionProcessSuccess,
        setIsActionProcessSuccess,

        updateProfileTemporaryUploadedImage,
        setIsUpdateProfileDragFilePanelShow,
        isUpdateProfileDragFilePanelShow,
        handleRemoveProfilePicture,
        isUpdateProfileImageLoading,
        updateProfileUploadImageRef,
        handleUpdateProfilePicture,
        handleUpdateProfile,

        changePasswordErrorMessage,
        handleChangePassword,

        handleSetPassword,
        setPasswordErrorMessage,
    } = useUserProfile()

    const { state } = useLezzAuthContext()

    const isLoadingDone = state.currentUser.id && (!state.lezzAuthLoading.loadInitialData && !state.lezzAuthLoading.verifyJwt)

    return (
        <>
            {isLoadingDone &&
                (
                    <div className='flex'>
                        <WatermarkSection>
                            <Watermark />
                        </WatermarkSection>
                        <MainContainer>
                            <SideContent />
                            <ContentContainer>
                                {
                                    !activePanelNextAction ?
                                        <Content />
                                        :
                                        <EditContent />
                                }
                            </ContentContainer>
                        </MainContainer>
                    </div>
                )
            }
        </>
    )

    function EditContent() {
        return (
            <div>
                <BreadCrumb />

                <div className='my-5'>
                    <HeaderText>{activePanelNextAction.split(':')[1]}</HeaderText>
                    <>
                        {activePanelNextAction === 'Account:Update profile' && (
                            <>
                                {!isActionProcessSuccess ? <UpdateProfilePanel /> : <SuccessPanel message='Your password has been updated.' />}
                            </>
                        )}

                        {activePanelNextAction === 'Security:Change password' && (
                            <>
                                {!isActionProcessSuccess ? <ChangePasswordPanel /> : <SuccessPanel message='Your password has been updated.' />}
                            </>
                        )}

                        {activePanelNextAction === 'Security:Set password' && (
                            <>
                                {!isActionProcessSuccess ? <SetPasswordPanel /> : <SuccessPanel message='Your password has been updated.' />}
                            </>
                        )}
                    </>
                </div>
            </div>
        )
    }

    function BreadCrumb() {
        return (
            <div className='max-w-xs text-sm breadcrumbs'>
                <ul>
                    <li className='cursor-pointer hover:underline' onClick={() => setActivePanelNextAction('')}>{activePanelNextAction.split(':')[0]}</li>
                    <li>{activePanelNextAction.split(':')[1]}</li>
                </ul>
            </div>
        )
    }

    function SuccessPanel({ message }: { message: string }) {
        return (
            <div className='mt-5'>
                <h1>{message}</h1>
                <div className='flex justify-end w-full'>
                    <div className='flex space-x-2 w-fit mt-8'>
                        <Button onClick={() => {
                            setActivePanelNextAction('')
                            setIsActionProcessSuccess(false)
                        }}>
                            FINISH
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    function ChangePasswordPanel() {
        const { handleSubmit, handleChange, setFieldTouched, touched, errors, isSubmitting } = useFormik({
            initialValues: {
                oldPassword: '',
                newPassword: '',
                newPasswordConfirm: '',
            },
            validate: toFormikValidate(changePasswordSchema),
            onSubmit: (values, { setSubmitting }) => {
                handleChangePassword(values, setSubmitting);
            },
        });

        return (
            <div className='mt-5'>
                <form onSubmit={handleSubmit}>
                    <div className='mt-8'>
                        <PasswordLabel>Current Password</PasswordLabel>
                        <PasswordInput
                            id='oldPassword'
                            name='oldPassword'
                            onKeyDown={() => {
                                setFieldTouched('oldPassword', true, true)
                            }}
                            onChange={handleChange}
                            touched
                            error={changePasswordErrorMessage}
                            autoFocus
                        />
                    </div>

                    <div className='mt-8'>
                        <PasswordLabel>New Password</PasswordLabel>
                        <PasswordInput
                            id='newPassword'
                            name='newPassword'
                            onChange={handleChange}
                            onKeyDown={() => {
                                setFieldTouched('newPassword', true, true)
                            }}
                            touched={touched.newPassword}
                            error={errors.newPassword}
                        />
                    </div>

                    <div className='mt-8'>
                        <PasswordLabel>Confirmation Password</PasswordLabel>
                        <PasswordInput
                            id='newPasswordConfirm'
                            name='newPasswordConfirm'
                            onChange={handleChange}
                            onKeyDown={() => {
                                setFieldTouched('newPasswordConfirm', true, true)
                            }}
                            touched={touched.newPasswordConfirm}
                            error={errors.newPasswordConfirm}
                        />
                    </div>

                    {/* <div className='flex space-x-2 mt-3'>
                        <input type='checkbox' className='checkbox checkbox-primary' />
                        <h1>Sign out of all other devices</h1>
                    </div> */}

                    <div className='flex justify-end w-full'>
                        <div className='flex space-x-2 w-[200px] mt-8'>
                            <OutlineButton onClick={() => setActivePanelNextAction('')}>
                                CANCEL
                            </OutlineButton>
                            <Button disabled={isSubmitting || Object.keys(errors).length > 0 || !touched.oldPassword || !touched.newPassword || !touched.newPasswordConfirm ? true : false}>
                                {isSubmitting ? <ClipLoader color='white' size={'20px'} /> : 'CONTINUE'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    function SetPasswordPanel() {
        const { handleSubmit, handleChange, setFieldTouched, touched, errors, isSubmitting } = useFormik({
            initialValues: {
                newPassword: '',
                newPasswordConfirm: '',
            },
            validate: toFormikValidate(setPasswordSchema),
            onSubmit: (values, { setSubmitting }) => {
                handleSetPassword(values, setSubmitting);
            },
        });

        return (
            <div className='mt-5'>
                <form onSubmit={handleSubmit}>

                    <div className='mt-8'>
                        <PasswordLabel>New Password</PasswordLabel>
                        <PasswordInput
                            id='newPassword'
                            name='newPassword'
                            onChange={handleChange}
                            onKeyDown={() => {
                                setFieldTouched('newPassword', true, true)
                            }}
                            touched={touched.newPassword}
                            error={errors.newPassword}
                        />
                    </div>

                    <div className='mt-8'>
                        <PasswordLabel>Confirmation Password</PasswordLabel>
                        <PasswordInput
                            id='newPasswordConfirm'
                            name='newPasswordConfirm'
                            onChange={handleChange}
                            onKeyDown={() => {
                                setFieldTouched('newPasswordConfirm', true, true)
                            }}
                            touched={touched.newPasswordConfirm}
                            error={errors.newPasswordConfirm}
                        />
                    </div>

                    {setPasswordErrorMessage && (
                        <span className="flex text-sm font-medium rounded-2xl space-x-2 h-fit w-fit mt-2">
                            <PiWarningCircleFill style={{ color: "red", width: "20px", height: "20px" }} />
                            <p className="text-[15px] text-left text-red-400">{setPasswordErrorMessage}</p>
                        </span>
                    )}

                    <div className='flex justify-end w-full'>
                        <div className='flex space-x-2 w-[200px] mt-8'>
                            <OutlineButton onClick={() => setActivePanelNextAction('')}>
                                CANCEL
                            </OutlineButton>
                            <Button disabled={isSubmitting || Object.keys(errors).length > 0 || !touched.newPassword || !touched.newPasswordConfirm ? true : false}>
                                {isSubmitting ? <ClipLoader color='white' size={'20px'} /> : 'CONTINUE'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    function UpdateProfilePanel() {
        const { handleSubmit, handleChange, values, isSubmitting } = useFormik({
            initialValues: {
                firstName: state.currentUser.firstName,
                lastName: state.currentUser.lastName,
            },
            onSubmit: (values, { setSubmitting }) => {
                handleUpdateProfile(values, setSubmitting)
            },
        });

        return (
            <div className='mt-5'>
                <div className='flex space-x-2'>
                    <div className='avatar rounded-full' >
                        <div className='rounded-full w-[45px] h-[45px]'>
                            {updateProfileTemporaryUploadedImage ? <img src={updateProfileTemporaryUploadedImage} alt="temp_profile" /> : state.currentUser.profileImage ? <img src={state.currentUser.profileImage} alt="profile" /> : <MdAccountCircle style={{ width: '100%', height: '100%' }} color={appConfig.theme.color} />}
                        </div>
                    </div>

                    <div className='flex flex-col'>
                        <h1 className='text-sm'>Profile image</h1>
                        <div className='flex space-x-2'>
                            <h1 onClick={() => {
                                setIsUpdateProfileDragFilePanelShow(!isUpdateProfileDragFilePanelShow)
                            }} className='text-sm text-[#6C47FF] cursor-pointer hover:underline' style={{
                                color: appConfig.theme.color
                            }}>{!isUpdateProfileDragFilePanelShow ? 'Upload image' : 'Cancel'}
                            </h1>
                            {state.currentUser.profileImage && (
                                <h1 onClick={handleRemoveProfilePicture} className='text-sm text-red-400 cursor-pointer hover:underline'>{!isUpdateProfileDragFilePanelShow ? 'Remove image' : null}
                                </h1>
                            )}
                        </div>
                    </div>
                </div>

                {isUpdateProfileDragFilePanelShow && (
                    <div className='flex flex-col space-y-3 rounded-lg bg-gray-100 h-fit w-full p-3 items-center justify-center mt-5'>
                        <div className='flex justify-center items-center rounded-full bg-gray-300 w-[70px] h-[70px]'>
                            <AiFillFolder className='w-[20px] h-[20px]' />
                        </div>
                        {!isUpdateProfileImageLoading ? (
                            <div className='flex flex-col space-y-2 items-center justify-center'>
                                <h1 className='text-sm text-gray-500'>
                                    Drag file here, or...
                                </h1>
                                <input type='file' className='hidden' ref={updateProfileUploadImageRef} accept='image/*' onChange={handleUpdateProfilePicture} />
                                <OutlineButton onClick={() => updateProfileUploadImageRef?.current?.click()}>
                                    Select file
                                </OutlineButton>
                            </div>
                        )
                            :
                            <h1 className='text-sm text-gray-500'>
                                Uploading...
                            </h1>}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className='mt-8'>
                        <TextLabel>First name</TextLabel>
                        <TextInput type='text' name='firstName' id='firstName' onChange={handleChange} value={values.firstName} autoFocus />
                    </div>

                    <div className='mt-8'>
                        <TextLabel>Last name</TextLabel>
                        <TextInput type='text' name='lastName' id='lastName' onChange={handleChange} value={values.lastName} />
                    </div>

                    <div className='flex justify-end w-full'>
                        <div className='flex space-x-2 w-[200px] mt-8'>
                            <OutlineButton onClick={() => setActivePanelNextAction('')}>
                                CANCEL
                            </OutlineButton>
                            <Button>
                                {isSubmitting ? <ClipLoader color='white' size={'20px'} /> : 'CONTINUE'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div >
        )
    }

    function Content() {
        return (
            <div>
                <div ref={accountScrollRef}>
                    <HeaderText>Account</HeaderText>
                    <SubHeaderText>Manage your account information</SubHeaderText>
                    <div className='mt-5'>
                        <HeaderMenuText>Profile</HeaderMenuText>
                        <hr />
                        <MenuButton panel='Account:Update profile'>
                            <div className='flex items-center justify-center space-x-2'>
                                <div className='avatar rounded-full' >
                                    <div className='rounded-full w-[45px] h-[45px]'>
                                        {state.currentUser.profileImage ? <img src={state.currentUser.profileImage} alt="profile" /> : <MdAccountCircle style={{ width: '100%', height: '100%' }} color={appConfig.theme.color} />}
                                    </div>
                                </div>
                                <h1 className='text-black ml-[5px]'>{(state.currentUser.firstName || state.currentUser.lastName) ? `${state.currentUser.firstName ?? ''} ${state.currentUser.lastName ?? ''}` : ''}</h1>
                            </div>
                        </MenuButton>
                    </div>

                    <div className='mt-5'>
                        <HeaderMenuText>Email address</HeaderMenuText>
                        <hr />
                        <div className='collapse collapse-arrow bg-white flex-col mt-3 items-center'>
                            <input type='radio' name='emailAddressAccordion' checked={isEmailAddressAccordionShow} readOnly />
                            <button className='collapse-title text-xl font-medium flex space-x-1 z-10 bg-white hover:brightness-[0.95]' onClick={() => {
                                setIsEmailAddressAccordionShow(!isEmailAddressAccordionShow)
                            }}>
                                <h1 className='text-sm'>
                                    {state.currentUser.email}
                                </h1>
                                <div className='badge badge-primary text-xs'>Primary</div>
                                <div className='badge badge-secondary text-xs'>Unverified</div>
                            </button>
                            <div className='collapse-content flex flex-col space-y-2 mt-1 mx-3'>
                                <h1 className='text-md font-medium'>Primary email address</h1>
                                <h1 className='text-sm'>This email address is the primary email address</h1>
                                <h1 onClick={() => setActivePanelNextAction('Account:Add email address')} className='text-sm text-[#6C47FF] hover:underline cursor-pointer'>Complete verification</h1>
                                <h1 className='text-md font-medium'>Remove</h1>
                                <h1 className='text-sm'>Delete this email address and remove it from your account</h1>
                                <h1 onClick={() => setActivePanelNextAction('Account:Remove email address')} className='text-sm text-red-500 hover:underline cursor-pointer'>Remove email address</h1>
                            </div>
                            <MenuButton panel='Account:Add email address'>
                                <div className='flex items-center space-x-2 text-[#6C47FF] text-sm'>
                                    <AiOutlinePlus />
                                    <h1>Add an email address</h1>
                                </div>
                            </MenuButton>
                        </div>
                    </div>

                    <div className='mt-5'>
                        <HeaderMenuText>Connected accounts</HeaderMenuText>
                        <hr />
                        <MenuButton panel='Account:Add connected account'>
                            <div className='flex items-center space-x-2 text-[#6C47FF] text-sm'>
                                <AiOutlinePlus />
                                <h1>Connect account</h1>
                            </div>
                        </MenuButton>
                    </div>
                </div>

                <div ref={securityScrollRef}>
                    <HeaderText>Security</HeaderText>
                    <SubHeaderText>Manage your security preferences</SubHeaderText>

                    {state.currentUser.__firstFactor === "password" ?
                        <div className='mt-5'>
                            <HeaderMenuText>Password</HeaderMenuText>
                            <hr />
                            <h1 className='text-black text-sm mx-5 mt-3 font-bold'>********</h1>
                            <MenuButton panel='Security:Change password'>
                                <div className='flex items-center space-x-2 text-[#6C47FF] text-sm'>
                                    <MdEdit />
                                    <h1>Change password</h1>
                                </div>
                            </MenuButton>
                        </div>
                        :
                        <div className='mt-5'>
                            <MenuButton panel='Security:Set password'>
                                <div className='flex items-center space-x-2 text-[#6C47FF] text-sm'>
                                    <MdAdd />
                                    <h1>Set Password</h1>
                                </div>
                            </MenuButton>
                        </div>
                    }

                    <div className='mt-5'>
                        <HeaderMenuText>Active devices</HeaderMenuText>
                        <hr />
                        <div className='collapse collapse-arrow bg-white flex-col mt-3 items-center'>
                            <input type='radio' name='activeDeviceAccordion' checked={isActiveDeviceAccordionShow} readOnly />
                            <button className='collapse-title text-xl font-medium flex space-x-1 z-10 bg-white hover:brightness-[0.95]' onClick={() => {
                                setIsActiveDeviceAccordionShow(!isActiveDeviceAccordionShow)
                            }}>
                                <div className='flex items-center w-full text-left'>
                                    <img src='https://i.ibb.co/dtC8hdS/yupiramos181111193-removebg-preview.png' className='w-[100px] h-[100px] object-contain' />
                                    <div className='flex flex-col ml-5'>
                                        <div className='flex items-center space-x-2'>
                                            <h1 className='text-sm'>Windows </h1>
                                            <div className='badge badge-primary text-xs'>This device</div>
                                        </div>
                                        <h1 className='text-sm'>Chrome 118.0.0.0 </h1>
                                        <h1 className='text-sm'>118.99.107.109 (Jakarta, ID)</h1>
                                        <h1 className='text-sm'>Today at 09.03 AM</h1>
                                    </div>
                                </div>
                            </button>
                            <div className='collapse-content flex flex-col space-y-2 mt-1 mx-3'>
                                <h1 className='text-md font-medium'>Current device</h1>
                                <h1 className='text-sm'>This is the device you are currently using</h1>
                            </div>
                        </div>

                    </div>

                    <div>
                        <HeaderMenuText>Danger</HeaderMenuText>
                        <hr />
                        <div className='flex justify-between mx-5 mt-3'>
                            <div className='flex flex-col'>
                                <h1 className='text-md font-medium'>Delete account</h1>
                                <h1 className='text-sm'>Delete your account and all its associated data</h1>
                            </div>
                            <Button onClick={() => setActivePanelNextAction('Security:Delete account')} style={{
                                backgroundColor: 'red', color: 'white'
                            }}>
                                DELETE ACCOUNT
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function MainContainer({ children }: { children: React.ReactNode }) {
        return (
            <div className='flex w-full phone:w-fit bg-white rounded-3xl shadow-2xl border'>
                {children}
            </div>
        )
    }

    function HeaderText({ children }: { children: React.ReactNode }) {
        return <h1 className='font-bold text-black text-3xl'>{children}</h1>
    }

    function SubHeaderText({ children }: { children: React.ReactNode }) {
        return <h1 className='text-gray-400 text-lg'>{children}</h1>

    }

    function HeaderMenuText({ children }: { children: React.ReactNode }) {
        return <h1 className='text-black text-lg'>{children}</h1>
    }

    function MenuButton({ children, panel }: { children: React.ReactNode, panel: UserProfilePanel }) {
        return (
            <button onClick={() => setActivePanelNextAction(panel)} className='flex justify-between space-x-3 items-center mb-5 p-5 w-full group bg-white hover:brightness-[0.95] rounded-lg mt-2'>
                {children}
                <AiOutlineArrowRight className='opacity-0 transform translate-x-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 ease-in-out' />
            </button>
        )
    }

    function ContentContainer({ children }: { children: React.ReactNode }) {
        return (
            <div className='flex flex-col w-[640px] min-h-[500px] p-10'>
                {children}
            </div>
        )
    }

    function SideContent() {
        return (
            <div className='flex flex-col w-[240px] space-y-2 border-r-2 p-10 h-full'>
                <button onClick={() => {
                    accountScrollRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    setActivePanelNextAction('')
                }} className='flex hover:brightness-[0.95] items-center space-x-2 w-full text-black bg-white focus:ring-4 focus:outline-none focus:ring-[#6C47FF] font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                    <MdAccountCircle />
                    <h1>Account</h1>
                </button>
                <button onClick={() => {
                    securityScrollRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    setActivePanelNextAction('')
                }} className='flex hover:brightness-[0.95] items-center space-x-2 w-full text-black bg-white focus:ring-4 focus:outline-none focus:ring-[#6C47FF] font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                    <MdSecurity />
                    <h1>Security</h1>
                </button>
            </div>
        )
    }
}

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