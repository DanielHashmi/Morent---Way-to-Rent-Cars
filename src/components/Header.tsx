import Link from "next/link";

const Header = ({ showViewAll, text, tag }: { text: string; showViewAll: boolean, tag: string }) => {
    return (
        <div className="flex justify-center mt-12">
            <div className="flex justify-between w-full lg:max-w-[82rem]">
                <div className="text-[#9ba2ad]">{text}</div>
                {showViewAll && <Link href={`/category?tag=${tag}`} className="text-blue-600">View All</Link>}
            </div>
        </div>
    )
}

export default Header