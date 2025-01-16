'use client'
import { CARCARD } from '@/types/types'
import Image from 'next/image'
import Button from './Button'
import buildImg from '@/sanity/lib/buildImg'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import Link from 'next/link'
import { toggleHeart } from '@/server/functions'
import { useState } from 'react'

const Card = ({ data }: { data: CARCARD }) => {
    const [heart, setHeart] = useState(data.heart);
    return data.card_type === 'mobile' ? (
        <div className="font-bold flex flex-col h-[388px] min-w-[304px] gap-3 rounded-lg p-6 bg-white relative">
            <div className="flex flex-col items-start bg-white rounded-lg mb-2">
                <div className="text-lg">{data.name}</div>
                <div className='text-xs opacity-30'>{data.car_type}</div>
            </div>
            <button onClick={() => { toggleHeart(data._id); setHeart(!heart) }} className="absolute right-2 top-2">
                <Image className="w-8 h-8 rounded-full bg-white p-1" src={heart ? '/heart.svg' : '/heartBorder.svg'} alt="heart-icon" width={32} height={32} />
            </button>
            <div className="relative h-48 mb-4">
                <Image className="object-contain h-full w-full rounded-2xl min-h-32" src={buildImg(data.image as SanityImageSource).width(300).url()} alt="Controller-Image" layout="fill" />

            </div>

            <div className='flex justify-between items-center mt-2'>
                <div className="flex items-center">
                    <Image className="w-12 mr-2" src={'/gasoline.svg'} alt="gasoline-icon" width={24} height={24} />
                </div>
                <div className="flex items-center">
                    <Image className="w-14 mr-2" src={'/manual.svg'} alt="engine-icon" width={24} height={24} />
                </div>
                <div className="flex items-center">
                    <Image className="w-14 mr-2" src={'/people.svg'} alt="people-icon" width={24} height={24} />
                </div>
            </div>
            <div className='flex justify-between items-center mt-2'>
                <div className='flex flex-col'>
                    <span className="text-xl">{data.current_price} <span className='text-sm opacity-70'>/ day</span></span>
                    <span className="text-xs opacity-30 line-through">{data.old_price} <span className='text-sm opacity-70'>/ day</span></span>
                </div>
                <Link href={`/details/${data.slug?.current}`}>
                    <Button text='Rent Now' classes='bg-blue-600 text-white py-2 px-4 rounded-md' />
                </Link>
            </div>
        </div>
    ) : (
        <div className="font-bold flex flex-col sm:h-[388px] w-full sm:w-[304px] gap-3 rounded-lg p-6 bg-white relative">
            <div className="flex flex-col items-start bg-white rounded-lg mb-2">
                <div className="text-lg">{data.name}</div>
                <div className='text-xs opacity-30'>{data.car_type}</div>
            </div>
            <div className="relative h-48 sm:h-64 mb-4">
                <Image className="object-contain h-full w-full rounded-2xl min-h-32" src={buildImg(data.image as SanityImageSource).width(300).url()} alt="Image" layout="fill" />
            </div>

            <button onClick={() => { toggleHeart(data._id); setHeart(!heart) }} className="absolute right-2 top-2">
                <Image className="w-8 h-8 rounded-full bg-white p-1" src={heart ? '/heart.svg' : '/heartBorder.svg'} alt="heart-icon" width={32} height={32} />
            </button>
            <div className='flex justify-between items-center mt-2'>
                <div className="flex items-center">
                    <Image className="w-14 mr-2" src={'/gasoline.svg'} alt="gasoline-icon" width={24} height={24} />
                </div>
                <div className="flex items-center">
                    <Image className="w-14 mr-2" src={'/manual.svg'} alt="engine-icon" width={24} height={24} />
                </div>
                <div className="flex items-center">
                    <Image className="w-14 mr-2" src={'/people.svg'} alt="people-icon" width={24} height={24} />
                </div>
            </div>
            <div className='flex justify-between items-center mt-2'>
                <div className='flex flex-col'>
                    <span className="text-xl">{data.current_price} <span className='text-sm opacity-70'>/ day</span></span>
                    <span className="text-xs opacity-30 line-through">{data.old_price} <span className='text-sm opacity-70'>/ day</span></span>
                </div>
                <Link href={`/details/${data.slug?.current}`}>
                    <Button text='Rent Now' classes='bg-blue-600 text-white py-2 px-4 rounded-md' />
                </Link>
            </div>
        </div>
    );
}

export default Card
