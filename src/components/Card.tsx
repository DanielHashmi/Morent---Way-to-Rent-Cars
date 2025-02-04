'use client'
import { CAR, USER } from '@/types/types'
import Image from 'next/image'
import Button from './Button'
import buildImg from '@/sanity/lib/buildImg'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import Link from 'next/link'
import { toggleHeart } from '@/lib/server/actions'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

const Card = ({ data, users }: { data: CAR, users: USER[] }) => {
    const { data: session } = useSession();
    const [heart, setHeart] = useState(false);

    useEffect(() => {
        if (users.some(user => user.favorites)) {
            const isHearted = users.find(user => user.email === session?.user?.email)?.favorites?.includes(data.slug.current)
            if (isHearted) setHeart(isHearted);
        }
    }, [data.slug, users, session])


    return <div className="font-bold flex flex-col h-[388px] min-w-[304px] gap-3 rounded-lg p-6 bg-white relative">
        <div className="flex flex-col items-start bg-white rounded-lg mb-2">
            <div className="text-lg">{data.name}</div>
            <div className='text-xs opacity-30'>{data.type}</div>
        </div>
        <button onClick={() => { toggleHeart(data.slug.current, session?.user?.email || ''); setHeart(!heart) }} className="absolute right-2 top-2">
            <Image className="w-8 h-8 rounded-full bg-white p-1" src={heart ? '/heart.svg' : '/heartBorder.svg'} alt="heart-icon" width={32} height={32} />
        </button>
        <div className="relative h-48 mb-4">
            <Image className="object-contain h-full w-full rounded-2xl min-h-32" src={buildImg(data.gallery[0] as SanityImageSource).width(300).url()} alt="Controller-Image" layout="fill" />

        </div>

        <div className='flex justify-between items-center mt-2'>
            <div className="flex items-center gap-1">
                <Image className="w-4" src={'/tank.png'} alt="tank-icon" width={24} height={24} />
                <div className='text-[#90A3BF] font-normal text-sm'>{data.fuel_capacity}</div>
            </div>
            <div className="flex items-center gap-1">
                <Image className="w-4" src={'/tire.png'} alt="tire-icon" width={24} height={24} />
                <div className='text-[#90A3BF] font-normal text-sm'>{data.transmission}</div>
            </div>
            <div className="flex items-center gap-1">
                <Image className="w-4" src={'/persons.png'} alt="persons-icon" width={24} height={24} />
                <div className='text-[#90A3BF] font-normal text-sm'>{data.seating_capacity}</div>
            </div>

        </div>
        <div className='flex justify-between items-center mt-2'>
            <div className='flex flex-col'>
                <span className="text-xl">{data.price_per_day} <span className='text-sm opacity-70'>/ day</span></span>
                <span className="text-xs opacity-30 line-through">{data.original_price} <span className='text-sm opacity-70'>/ day</span></span>
            </div>
            <Link href={`/details/${data.slug.current}`}>
                <Button text='Rent Now' classes='bg-blue-600 text-white py-2 px-4 rounded-md' />
            </Link>
        </div>
    </div>

}

export default Card
