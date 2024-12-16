'use client';

// import { usePathname } from "next/navigation";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IconType } from "react-icons";
import Link from "next/link";
// import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLoginModal } from "@/app/hooks/use-login-modal";
import { useCallback } from "react";
import { useSession } from "next-auth/react";

const links = [
    {
        name: "Home",
        href: "/",
        icon: BsHouseFill,
        auth: false,
    },
    // {
    //     name: "Notifications",
    //     href: "/notifications",
    //     icon: BsBellFill,
    //     auth: true,
    // },
    {
        name: "Profile",
        href: "/profile",
        icon: FaUser,
        auth: true,
    }
];

export default function SidebarLinks() {
    
    // const handleClick = useCallback ((href: any) => {
        
    //     return router.push(href);
    
    // }, [router]);
    
    const router = useRouter();
    const loginModal = useLoginModal();
    const { data: session } = useSession();

    const handleClick = useCallback((link: any) => {
        if (!session) {
            loginModal.onOpen();
        }
        else {
            router.push(link.href);
        }
    }, [loginModal, session, router]);

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon as IconType;
                return (
                    <div key={link.name} onClick={() => handleClick(link)} className="flex flex-row items-center">
                    {/* <div key={link.name} className="flex flex-row items-center"> */}
                        {/* Mobile Layout */}
                        {/* <Link
                            key={link.name}
                            href={link.href}
                            className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden"    
                        >
                            <LinkIcon size={28} color="white" />
                            <p className="hidden md:block">{link.name}</p>
                        </Link> */}
                        {/* Desktop Layout */}
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer"
                        >
                            <LinkIcon size={24} color="white" />
                            <p className="hidden lg:block text-white text-xl">
                                {link.name}
                            </p>
                        </Link>
                    </div>
                );
            })}
        </>
    );
}