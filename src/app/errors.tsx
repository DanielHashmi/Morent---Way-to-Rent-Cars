import Link from "next/link"

const Error = () => {
    return <div className="flex justify-center items-center h-[50vh]">
        Some Error Occurred! <Link href="/">Go Back</Link>
    </div>
}

export default Error