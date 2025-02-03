'use client'
import buildImg from "@/sanity/lib/buildImg"
import { CAR } from "@/types/types"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import Image from "next/image"
import { useState } from "react"

const Images = ({ details }: { details: CAR }) => {
    const [mainImage, setMainImage] = useState(details.gallery[0]);
    
    return (
        <div className="gap-6 flex flex-col w-full">
            <div className={`relative text-white p-6 md:p-8 rounded-lg min-h-[20rem]`}>
                {/* Content Section */}
                <div className="relative z-10 flex flex-col gap-6 md:max-w-lg">
                    <h1 className="text-2xl sm:text-4xl leading-tight max-w-sm">
                        Sports car with the best design and acceleration
                    </h1>
                    <p className="text-sm md:text-base text-blue-100 max-w-sm">
                        Safety and comfort while driving a
                        futuristic and elegant sports car
                    </p>
                </div>

                {/* Car Image */}
                <Image
                    src={buildImg(mainImage as SanityImageSource).width(1000).url()}
                    alt="Car Rental"
                    className="object-cover object-left rounded-lg"
                    fill
                />
            </div>
            <div className="flex gap-2 sm:gap-6 h-24">
                {details.gallery?.map((img, key) => (
                    <div onClick={() => setMainImage(img)} key={key} className={`hover:ring ring-blue-600 hover:border-4 smooth border-white relative w-1/3 min-w-[32%] sm:min-w-28 max-w-[148px] max-h-[124px] p-6 md:p-8 rounded-lg cursor-pointer`}>
                        {/* Car Image */}
                        <Image
                            src={buildImg(img as SanityImageSource).width(400).url()}
                            alt="Car-image"
                            className="object-fill object-top rounded-lg"
                            fill
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Images