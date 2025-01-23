const IconButton = ({ icon, redDot, className }: { icon: string; redDot: boolean, className?: string }) => {
    return <div className={`${className} flex relative items-center justify-center size-11 rounded-full border border-gray-300 bg-white shadow-sm hover:bg-gray-50`}>
        <img
            src={icon}
            alt="like-icon"
            className={`${className} size-11 rounded-full`}
        />
        {redDot && (
            <span className="absolute top-0 right-0  size-3 bg-red-500 rounded-full border border-white"></span>
        )}
    </div>
}

export default IconButton