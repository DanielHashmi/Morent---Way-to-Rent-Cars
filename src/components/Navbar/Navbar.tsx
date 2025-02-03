'use client'
import Image from "next/image"
import SearchBar from "./SearchBar"
import IconButton from "./IconButton"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { USER } from "@/types/types"
import { saveProfile } from "@/lib/server/actions"

const Navbar = ({ disallowedPages, user }: { disallowedPages: string[]; user: USER }) => {
  const pathname = usePathname();
  const path = pathname.replace('/', '');
  const { data: session } = useSession()
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [image, setImage] = useState(user.image);
  const [message, setMessage] = useState<number>();

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (!(e.target as HTMLElement).classList.contains('settings')) {
        setShowSettings(false);
      }
      if (!(e.target as HTMLElement).classList.contains('notification')) {
        setShowNotifications(false);
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
              className={`block md:hidden rounded-full ring-gray-200 ${showProfile && 'ring'}`}>
              <IconButton icon={image || "/user.png"} redDot={false} />
            </button>
          </div>}

          <div className="flex justify-between w-full md:w-fit">
            <Link href={'/'}><Image src={'/logo.svg'} alt="logo" width={200} height={200} /></Link>
            <button
              onFocus={() => { setShowProfile(true) }}
              onBlur={() => { setTimeout(() => { setShowProfile(false) }, 100) }}
              className={`block md:hidden rounded-full ring-gray-200 ${showProfile && 'ring'}`}>
              {path !== 'category' && <IconButton icon={image || "/user.png"} redDot={false} />}
            </button>
          </div>
          <SearchBar />
        </div>
        <div className="gap-5 flex absolute md:relative">
          <Link href={'/favorites'} className={`md:block hidden rounded-full ring-gray-200 ${pathname.startsWith('/favorites') && 'ring'}`} >
            <IconButton icon="/like.png" redDot={false} />
          </Link>

          <button
            onFocus={() => setShowNotifications(true)}
            className={`md:block hidden rounded-full notification ring-gray-200 ${showNotifications && 'ring'}`}>
            <IconButton className="notification" icon="/bell.png" redDot={!(user.notifications === null)} />
          </button>

          <button
            onFocus={() => setShowSettings(true)}
            className={`md:block hidden rounded-full ring-gray-200 ${showSettings && 'ring'}`}>
            <IconButton className="settings" icon="/setting.png" redDot={false} />
          </button>

          <button
            onBlur={() => { setTimeout(() => { setShowProfile(false) }, 100) }}
            onFocus={() => setShowProfile(true)}
            className={`hidden md:block rounded-full ring-gray-200 ${showProfile && 'ring'}`}>
            <IconButton icon={image || "/user.png"} redDot={false} />
          </button>

          {/* popup notifications */}
          <div className={`${path.includes('category') && '-top-12'} ${!showNotifications && 'hidden'} min-w-[236px] bg-[#f6f7f9] notification p-6 flex flex-wrap justify-center gap-6 shadow-xl rounded-xl md:top-16 z-50 absolute overflow-y-auto`}>
            <div className="text-sm opacity-50 notification">Notifications</div>

            <div className="flex flex-col gap-3 notification w-full">

              {user.notifications ? user.notifications.map((user, key) => {
                const limit = message === key ? user.text.length : 27;
                return <div onClick={() => setMessage(key)} key={key} className="notification hover:ring-1 ring-0 ring-blue-300 cursor-pointer bg-white text-xs p-2">
                  <span className="notification font-bold">{user.name}</span>
                  <p className="notification text-[11px] opacity-50">
                    {user.text.slice(0, limit)}{Number(user.text.length - user.text.slice(0, limit).length) <= 0 ? '' : '...'}
                  </p>
                </div>
              }) : <div className="notification text-[11px] opacity-50 text-center">You don&apos;t have any notifications!</div>}
            </div>
          </div>

          {/* popup settings */}
          <form onSubmit={save_profile} className={`${path.includes('category') && '-top-12'} ${!showSettings && 'hidden'} min-w-[236px] bg-[#f6f7f9] settings p-6 flex flex-wrap justify-center gap-6 shadow-xl rounded-xl md:top-16 z-50 absolute overflow-y-auto`}>
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

          {/* popup profile */}
          {showProfile && <div className={`bg-[#f6f7f9] p-6 flex flex-wrap justify-center gap-6 shadow-xl rounded-xl max-h-[27rem] ${path.includes('category') && '-top-12'} md:top-16 z-50 absolute overflow-y-auto`}>
            <div className="text-sm opacity-50">{session?.user?.email}</div>

            <Link href={'/favorites'} className={`block md:hidden rounded-full ring-gray-200 ${pathname.startsWith('/favorites') && 'ring'}`} >
              <IconButton icon="/like.png" redDot={false} />
            </Link>
            <button
              onFocus={() => setShowNotifications(true)}
              className={`block md:hidden rounded-full notification ring-gray-200 ${showNotifications && 'ring'}`}>
              <IconButton className="notification" icon="/bell.png" redDot />
            </button>

            <button
              onFocus={() => setShowSettings(true)}
              className={`block md:hidden rounded-full ring-gray-200 ${showSettings && 'ring'}`}>
              <IconButton className="settings" icon="/setting.png" redDot={false} />
            </button>

            <button onClick={() => signOut()} className="text-center w-full bg-white py-2 px-5 hover:ring cursor-pointer rounded-lg  text-nowrap">Logout</button>
            <Link href={'/booking'} className={`${pathname.startsWith('/booking') && 'ring'} text-center w-full bg-white py-2 px-5 hover:ring cursor-pointer rounded-lg  text-nowrap`}>Bookings</Link>
            {user.role === "Admin" && <Link href={'/admin'} className={`${pathname.startsWith('/admin') && 'ring'} text-center w-full bg-white py-2 px-5 hover:ring cursor-pointer rounded-lg  text-nowrap`}>Admin</Link>}
          </div>}


        </div>
      </div >
    )
  }
}

export default Navbar