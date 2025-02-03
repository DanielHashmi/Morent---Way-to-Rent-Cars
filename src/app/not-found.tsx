import Link from "next/link"

const NotFound = () => {
    return <div className="flex justify-center gap-2 items-center h-[50vh]">
        404 Occurred | Page Not Found! <Link href="/" className="text-blue-500">Go Back</Link>
    </div>
}

export default NotFound