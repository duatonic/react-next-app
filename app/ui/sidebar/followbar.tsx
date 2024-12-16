'use client';

import useUsers from "@/app/hooks/use-users";
import Avatar from "@/app/ui/avatar";

export default function FollowBar() {
    const { data: users = [] } = useUsers();
    console.log("<followbar> da users:", users);

    if (users.length === 0) {
        return null;
    }

    return (
        <div className="px-6 py-4 hidden lg:block">
            <div className="bg-neutral-800 rounded-xl p-4">
                <h2 className="text-white text-xl font-semibold">Who to follow</h2>
                <div className="flex felx-col gap-6 mt-4">
                    {users.map((user: Record<string, any>) => (
                        <div key={user.id} className="flex items-center gap-4">
                            <Avatar userId={user.id} />
                            <div className="flex flex-col">
                                <p className="text-white font-semibold text-sm">
                                    {user.name}
                                </p>
                                <p className="text-neutral-400 text-sm">
                                    @{user.username}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};