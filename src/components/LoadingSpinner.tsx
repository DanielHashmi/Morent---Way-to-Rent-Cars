const LoadingSpinner = () => {
    return (
        <div className="size-6 relative animate-spin">
            <div className="size-2 absolute left-0 bottom-0 rounded-full bg-gray-400"></div>
            <div className="size-2 absolute right-0 bottom-0 rounded-full bg-gray-400"></div>
            <div className="size-2 absolute left-0 top-0 rounded-full bg-gray-400"></div>
            <div className="size-2 absolute right-0 top-0 rounded-full bg-gray-400"></div>
        </div>
    )
}

export default LoadingSpinner