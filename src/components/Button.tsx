
const Button = ({ text, classes }: { text: string; classes: string }) => {
    return (
        <div className={`px-4 py-2 w-fit text-sm md:text-base ${classes} hover:bg-blue-800 text-white rounded-md`}>
            {text}
        </div>
    )
}

export default Button