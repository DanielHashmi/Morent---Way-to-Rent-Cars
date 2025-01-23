'use client'
import Image from "next/image"
import SearchBar from "./SearchBar"
import IconButton from "./IconButton"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { USER } from "@/types/types"
import { saveProfile } from "@/app/api/server/functions"

const Navbar = ({ disallowedPages, user }: { disallowedPages: string[]; user: USER }) => {
  const pathname = usePathname();
  const path = pathname.replace('/', '');
  const { data: session } = useSession()
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [image, setImage] = useState(user.image);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (!(e.target as HTMLElement).classList.contains('settings')) {
        setShowSettings(false);
      }
    })
  }, [])

  const save_profile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setImage(`${formData.get('image')}`);
    await saveProfile(formData);
  }

  if (!disallowedPages.some(page => pathname.startsWith(page))) {
    return (
      <div className="md:h-[124px] flex justify-between items-center md:px-16 p-6 gap-6 relative">
        <div className="flex gap-11 flex-col md:flex-row w-full items-center">

          {path === 'category' && <div className="flex justify-between w-full md:w-fit">
            <Image src={'/menu.svg'} alt="menu-icon" width={100} height={100} className="size-8" />
            <button
              onFocus={() => { setShowProfile(true) }}
              onBlur={() => { setTimeout(() => { setShowProfile(false) }, 100) }}
              className="block md:hidden">
              <IconButton icon="/user.png" redDot={false} />
            </button>
          </div>}

          <div className="flex justify-between w-full md:w-fit">
            <Link href={'/'}><Image src={'/logo.svg'} alt="logo" width={200} height={200} /></Link>
            <button
              onFocus={() => { setShowProfile(true) }}
              onBlur={() => { setTimeout(() => { setShowProfile(false) }, 100) }}
              className="block md:hidden">
              {path !== 'category' && <IconButton icon={session?.user?.image || "/user.png"} redDot={false} />}
            </button>
          </div>
          <SearchBar />
        </div>
        <div className="gap-5 flex absolute md:relative">
          <Link href={'/favorites'} className="md:block hidden">
            <IconButton icon="/like.png" redDot={false} />
          </Link>

          <div className="md:block hidden">
            <IconButton icon="/bell.png" redDot />
          </div>

          <button
            onFocus={() => setShowSettings(true)}
            className="md:block hidden rounded-full ring ring-transparent focus:ring-gray-100">
            <IconButton className="settings" icon="/setting.png" redDot={false} />
          </button>

          <button
            onBlur={() => { setTimeout(() => { setShowProfile(false) }, 100) }}
            onFocus={() => setShowProfile(true)}
            className="hidden md:block rounded-full ring ring-transparent focus:ring-gray-300">
            <IconButton icon={image || "/user.png"} redDot={false} />
          </button>

          {/* popup profile */}
          {showProfile && <div className={`bg-[#f6f7f9] p-6 flex flex-wrap justify-center gap-6 shadow-xl rounded-xl max-h-[27rem] ${path.includes('category') && '-top-12'} md:top-16 z-50 absolute overflow-y-auto`}>
            <div className="text-sm opacity-50">{session?.user?.email}</div>

            <Link href={'/favorites'} className="md:hidden block">
              <IconButton icon="/like.png" redDot={false} />
            </Link>

            <div className="md:hidden block">
              <IconButton icon="/bell.png" redDot />
            </div>
            <div className="md:hidden block">
              <IconButton icon="/setting.png" redDot={false} />
            </div>

            <button onClick={() => signOut()} className="text-center w-full bg-white py-2 px-5 hover:ring cursor-pointer rounded-lg  text-nowrap">Logout</button>
            <Link href={'/booking'} className="text-center w-full bg-white py-2 px-5 hover:ring cursor-pointer rounded-lg  text-nowrap">Bookings</Link>
            {user.role === "Admin" && <Link href={'/admin'} className="text-center w-full bg-white py-2 px-5 hover:ring cursor-pointer rounded-lg  text-nowrap">Admin</Link>}
          </div>}

          {/* popup settings */}
          <form onSubmit={save_profile} className={`${path.includes('category') && '-top-12'} ${!showSettings && 'hidden'} bg-[#f6f7f9] settings p-6 flex flex-wrap justify-center gap-6 shadow-xl rounded-xl md:top-16 z-50 absolute overflow-y-auto`}>
            <div className="text-sm opacity-50 settings">Setup Profile</div>

            <div className="flex flex-col gap-2 w-full settings">
              <label className="text-xs settings">Name</label>
              <input name="name" className="p-2 text-xs w-full settings outline-blue-300" type="text" placeholder="Enter your name!" defaultValue={user.name} />
            </div>
            <div className="flex flex-col gap-2 w-full settings">
              <label className="text-xs settings">Image</label>
              <input name="image" className="p-2 text-xs w-full settings outline-blue-300" type="url" placeholder="Add an image link!" defaultValue={`${user.image || ''}`} />
            </div>

            <button type="submit" className="text-center w-full bg-white py-2 px-5 hover:ring cursor-pointer rounded-lg text-sm text-nowrap">Save Changes</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Navbar