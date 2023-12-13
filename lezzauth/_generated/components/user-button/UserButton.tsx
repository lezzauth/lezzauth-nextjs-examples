import { useLezzAuth, useLezzAuthContext } from "lezzauth/nextjs/hooks";
import { useUserButton } from "lezzauth/nextjs/hooks/components";
import { BsFillGearFill } from 'react-icons/bs';
import { MdAccountCircle } from "react-icons/md";
import { PiSignOutBold } from 'react-icons/pi';
import appConfig from '../../../config';
import { UserProfile } from "../user-profile";

export function UserButton() {
    const {
        dropdownClass,
        buttonRef,
        handleDropdownToggle,
    } = useUserButton()

    const { state } = useLezzAuthContext()
    const { signOut } = useLezzAuth();

    const isLoadingDone = state.currentUser.id && (!state.lezzAuthLoading.loadInitialData && !state.lezzAuthLoading.verifyJwt)

    return (
        <>
            {isLoadingDone &&
                (
                    <>
                        <div className={`dropdown ${dropdownClass}`}>
                            <button
                                className="avatar rounded-full focus:ring focus:ring-primary focus:ring-offset-base-100 focus:ring-offset-2 active:ring active:ring-primary active:ring-offset-base-100 active:ring-offset-2"
                                tabIndex={0}
                                ref={buttonRef}
                                onClick={handleDropdownToggle}
                            >
                                <div className="rounded-full w-[30px] h-[30px]">
                                    {state.currentUser.profileImage ? <img src={state.currentUser.profileImage} alt="profile" /> : <MdAccountCircle style={{ width: '100%', height: '100%' }} color={appConfig.theme.color} />}
                                </div>
                            </button>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-[375px] text-gray-400 p-5 mx-5">
                                <div className="flex space-x-3 items-center mb-5">
                                    <div
                                        className="avatar rounded-full ml-[7px]"
                                    >
                                        <div className="rounded-full w-[45px] h-[45px]">
                                            {state.currentUser.profileImage ? <img src={state.currentUser.profileImage} alt="profile" /> : <MdAccountCircle style={{ width: '100%', height: '100%' }} color={appConfig.theme.color} />}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <h1 className="font-bold text-black ml-[5px]">{(state.currentUser.firstName || state.currentUser.lastName) ? `${state.currentUser.firstName ?? ""} ${state.currentUser.lastName ?? ""}` : ""}</h1>
                                        <h1 className="ml-[5px]">{state.currentUser.email}</h1>
                                    </div>
                                </div>
                                <li>
                                    <button onClick={() => {
                                        if (document) {
                                            (document.getElementById('userProfileModal') as HTMLFormElement).showModal();
                                        }
                                    }} className="px-5 py-3 flex">
                                        <BsFillGearFill />
                                        <h1 className="ml-[27px]">Manage account</h1>
                                    </button>
                                </li>
                                <li>
                                    <button className="px-5 py-3 flex" onClick={signOut}>
                                        <PiSignOutBold />
                                        <h1 className="ml-[27px]">Sign out</h1>
                                    </button>
                                </li>
                                <div className="flex mt-5 space-x-1">
                                    <h1 className='text-md'>Secured by </h1>
                                    <h1 className='text-md font-bold'>Lezzauth</h1>
                                </div>
                            </ul>
                        </div>

                        <dialog id="userProfileModal" className="modal overflow-scroll">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <UserProfile />
                        </dialog>
                    </>
                )
            }
        </>
    )

}