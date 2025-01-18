'use client'
import { CAR } from "@/types/types"
import Image from "next/image"
import { useState } from "react"

const filterButtons = [
    { name: 'Sports' },
    { name: 'SUV' },
    { name: 'MPV' },
    { name: 'Sedan' },
    { name: 'Coups' },
    { name: 'Hatchback' },
]
const TypeFilter = ({ carDetails, setCategory }: { carDetails: CAR[]; setCategory: (types: string[]) => void }) => {
    const [types, setTypes] = useState<string[]>([]);

    const filterCategory = (btn: { name: string }) => {
        let updatedTypes: string[];
        if (types.includes(btn.name)) {
            updatedTypes = types.filter(type => type !== btn.name);
        } else {
            updatedTypes = [...types, btn.name];
        }
        setTypes(updatedTypes);
        setCategory(updatedTypes);
    };

    return (
        <div className="lg:flex flex-col gap-6">
            {
                filterButtons.map((btn, key) => (<div key={key} className="flex gap-2 items-center">
                    <button onClick={() => filterCategory(btn)}>
                        <Image className="size-6" src={types.includes(btn.name) ? '/checkbox.svg' : '/uncheckedbox.svg'} alt="checkbox-icon" width={100} height={100} />
                    </button>
                    {btn.name} <span className="opacity-50"> {carDetails.filter((car) => car.type.toLowerCase() === btn.name.toLowerCase()).length}</span>
                </div >))
            }
        </div >
    )
}

export default TypeFilter