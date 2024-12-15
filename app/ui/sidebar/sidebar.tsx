'use client';

import { BiLogOut } from "react-icons/bi";
import SidebarLogo from "@/app/ui/sidebar/sidebar-logo";
import SidebarLinks from "@/app/ui/sidebar/sidebar-links";
import ChirpButton from "@/app/ui/sidebar/chirp-button";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Sidebar() {
    const { data: session, status } = useSession();

    return (
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <SidebarLogo />
                    <SidebarLinks />
                    {status === 'authenticated' && (
                        <button
                            onClick={() => void signOut()}
                            className="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer"
                        >
                            <BiLogOut size={24} color="white" />
                            <div className="hidden lg:block text-white text-xl">
                                Log out
                            </div>
                        </button>
                    )}
                    <ChirpButton />
                </div>
            </div>
        </div>
    );
}