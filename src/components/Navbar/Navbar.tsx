'use client'
import Image from "next/image"
import SearchBar from "./SearchBar"
import IconButton from "./IconButton"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { useState } from "react"

const Navbar = () => {
  const path = usePathname().replace('/', '');
  const { data: session } = useSession()
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="md:h-[124px] flex justify-between items-center md:px-16 p-6 gap-6">
      <div className="flex gap-11 flex-col md:flex-row w-full items-center">

        {path === 'category' && <div className="flex justify-between w-full md:w-fit">
          <Image src={'/menu.svg'} alt="menu-icon" width={100} height={100} className="size-8" />
          <div className="block md:hidden">
            <IconButton icon="/user.png" redDot={false} />
          </div>
        </div>}

        <div className="flex justify-between w-full md:w-fit">
          <Link href={'/'}><Image src={'/logo.svg'} alt="logo" width={200} height={200} /></Link>
          <div className="block md:hidden">
            {path !== 'category' && <IconButton icon="/user.png" redDot={false} />}
          </div>
        </div>
        <SearchBar />
      </div>
      <div className="gap-5 hidden md:flex relative">
        <Link href={'/hearted'} className="lg:block hidden">
          <IconButton icon="/like.png" redDot={false} />
        </Link>

        <div className="lg:block hidden">
          <IconButton icon="/bell.png" redDot />
        </div>

        <div className="lg:block hidden">
          <IconButton icon="/setting.png" redDot={false} />
        </div>

        <button
          onBlur={() => { setTimeout(() => { setShowProfile(false) }, 100) }}
          onFocus={() => setShowProfile(true)}
          className="hidden md:block">
          <IconButton icon={session?.user?.image || "/user.png"} redDot={false} />
        </button>

        {/* popup div */}
        {showProfile && <div className="bg-[#f6f7f9] p-6 flex flex-wrap gap-6 shadow-xl rounded-xl max-h-[27rem] top-16 right-0 z-50 absolute overflow-y-auto">
          <button onClick={() => signOut()} className="text-center w-full bg-white py-2 px-5 hover:ring cursor-pointer rounded-lg  text-nowrap">Logout</button>
          <Link href={'/pending'} className="text-center w-full bg-white py-2 px-5 hover:ring cursor-pointer rounded-lg  text-nowrap">Pending Cars</Link>
        </div>}
      </div>
    </div>
  )
}

export default Navbar