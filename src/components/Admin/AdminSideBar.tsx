'use client'
import { signOut } from 'next-auth/react'
import Image from 'next/image'

const AdminSideBar = () => {
    return (<div className="min-w-72 border-t hidden xl:flex flex-col p-6 gap-6">
        <div className="text-xs opacity-50">MAIN MENU</div>

        <div className="flex gap-2 items-center bg-blue-600 text-white px-2 py-3 rounded-lg">
            <Image className="size-6" src='/home.png' alt="home-icon" width={100} height={100} />
            Dashboard
        </div>
        <div className="flex gap-2 text-[#90A3BF] text-sm items-center px-2 ">
            <Image className="size-6" src='/caricon.png' alt="car-icon" width={100} height={100} />
            Car Rent
        </div>
        <div className="flex gap-2 text-[#90A3BF] text-sm items-center px-2 ">
            <Image className="size-6" src='/insight.png' alt="car-icon" width={100} height={100} />
            Insight
        </div>
        <div className="flex gap-2 text-[#90A3BF] text-sm items-center px-2 ">
            <Image className="size-6" src='/wallet.png' alt="car-icon" width={100} height={100} />
            Reimburse
        </div>
        <div className="flex gap-2 text-[#90A3BF] text-sm items-center px-2 ">
            <Image className="size-6" src='/inbox.png' alt="car-icon" width={100} height={100} />
            Inbox
        </div>
        <div className="flex gap-2 text-[#90A3BF] text-sm items-center px-2 ">
            <Image className="size-6" src='/calender.png' alt="car-icon" width={100} height={100} />
            Calender
        </div>

        <div className="text-xs opacity-50">PREFERENCES</div>
        <div className="text-xs opacity-50">MAIN MENU</div>

        <div className="flex gap-2 text-[#90A3BF] text-sm items-center px-2 hover:invert smooth cursor-pointer">
            <Image className="size-6" src='/settingicon.png' alt="settings-icon" width={100} height={100} />
            Settings
        </div>
        <div className="flex gap-2 text-[#90A3BF] text-sm items-center px-2 hover:invert smooth cursor-pointer">
            <Image className="size-6" src='/help.png' alt="help-icon" width={100} height={100} />
            Help & Center
        </div>
        <div className="flex justify-between text-[#90A3BF] text-sm items-center px-2 ">
            <div className="flex gap-2">
                <Image className="size-6" src='/inbox.png' alt="car-icon" width={100} height={100} />
                Dark Mode
            </div>
            <Image className="w-14 h-6" src='/darkmod.png' alt="darkmode-icon" width={100} height={100} />
        </div>


        <button onClick={() => signOut()} className="flex gap-2 hover:invert smooth text-[#90A3BF] mt-20 text-sm items-center px-2 ">
            <Image className="size-6" src='/logout.png' alt="logout-icon" width={100} height={100} />
            Log Out
        </button>
    </div>
    )
}

export default AdminSideBar