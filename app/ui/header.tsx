'use client';

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

export default function Header({
    name,
    showBackArrow
}: {
    name: string,
    showBackArrow?: boolean
}) {
    const router = useRouter();

    const handleBack = useCallback(() => {
        router.back();
    }, [router]);

    return (
        <div className="border-b-[1px] border-neutral-800 p-5">
            <div className="flex flex-row items-center gap-2">
                {
                    showBackArrow && (
                        <BiArrowBack
                            size={20}
                            color="white"
                            onClick={handleBack}
                            className="cursor-pointer hover:opacity-70 transition"
                        />
                    )
                }
                <h1 className="text-white text-xl font-semibold">{name}</h1>
            </div>
        </div>
    );
}