import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { Users } from 'lucide-react';

const Sidebar = () => {
    const { contacts, getContacts, selectedContact, setSelectedContact, isContactsLoading } = useChatStore();

    const onlineContacts = [];

    useEffect(() => {
        getContacts()
    }, [getContacts]);

    if (isContactsLoading) return <SidebarSkeleton />

    return (
        <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
            <div className='border-b border-base-300 w-full p-5'>
                <div className='flex items-center gap-2'>
                    <Users className='size-6'/>
                    <span className='font-medium hidden lg:block'>Contacts</span>
                </div>
                {/* TODO: Online toggle */}

                
            </div>
            <div className='overflow-y-auto w-full py-3'>
                    { contacts.map((user) => (
                        <button key={user._id}
                                onClick={() => setSelectedContact(user)}
                                className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors cursor-pointer
                                            ${selectedContact?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}>
                            <div className='relative mx-auto lg:mx-0'>
                                <img src={user.profilePic || "/avatar.png"}
                                    className='size-12 object-cover rounded-full'/>
                                {onlineContacts.includes(user._id) && (
                                    <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900'/>
                                )}
                            </div>
                            <div className="hidden lg:block text-left min-w-0">
                                <div className="font-medium truncate">{user.fullName}</div>
                                <div className="text-sm text-zinc-400">
                                    {onlineContacts.includes(user._id) ? "Online" : "Offline"}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
        </aside>
    )
}

export default Sidebar