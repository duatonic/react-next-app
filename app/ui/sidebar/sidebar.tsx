import { BiLogOut } from "react-icons/bi";

import SidebarLogo from "./sidebar-logo";
import SidebarLinks from "./sidebar-links";
import ChirpButton from "./chirp-button";

export default function Sidebar() {
    return (
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <SidebarLogo />
                    <SidebarLinks />
                    <form
                        action={async () => {
                            'use server';
                            // await signOut();
                        }}
                    >
                        <button className="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
                            <BiLogOut size={24} color="white" />
                            <div className="hidden lg:block text-white text-xl">
                                Log out
                            </div>
                        </button>
                    </form>
                    <ChirpButton />
                </div>
            </div>
        </div>
    );
}