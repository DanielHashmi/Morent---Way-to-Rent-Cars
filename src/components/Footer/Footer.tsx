'use client'
import Image from "next/image"
import FooterCard from "./FooterCard"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Footer = ({ disallowedPages }: { disallowedPages: string[] }) => {
    const pathname = usePathname();
    if (!disallowedPages.some(page => pathname.startsWith(page))) {
        return (
            <div className="flex justify-center p-6 md:p-12">
                <div className="flex w-[82rem] flex-col gap-10">
                    <div className="flex flex-col lg:flex-row gap-10">
                        <div className="w-1/2 space-y-6">
                            <Link href={'/'}><Image src={'/logo.svg'} alt="logo" width={100} height={100} /></Link>
                            <div className="max-w-sm">Our vision is to put every car on work and bring affordability and convenience for you.</div>
                        </div>
                        <div className="lg:w-1/2 flex gap-20 flex-wrap lg:flex-nowrap lg:justify-between">
                            <FooterCard bold={false} input={false} links={['How it works', 'Featured', 'Partnership', 'Business Relation']} title="About" />
                            <FooterCard bold={false} input={false} links={['Events', 'Blogs', 'Podcast', 'Invite a friend']} title="Community" />
                            <FooterCard bold={false} input={false} links={['Booking', 'Favorites', 'Category']} title="Quick Navigate" />
                        </div>
                    </div>

                    <div className="flex justify-between flex-col-reverse md:flex-row pt-6 md:border-t font-bold gap-10 md:gap-0">
                        <div>©2022 MORENT. All rights reserved</div>
                        <div className="flex gap-6 justify-between">
                            <div>Privacy & Policy</div>
                            <div>Terms & Condition</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer