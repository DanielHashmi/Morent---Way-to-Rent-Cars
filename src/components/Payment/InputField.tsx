import { INPUT_FIELD_PROPS } from "@/types/types";

const InputField = ({ errors, label, id, name, type = "text", value, onChange, placeholder }: INPUT_FIELD_PROPS) => (
    <div className="flex flex-col gap-2 w-full">
        <label htmlFor={id}>{label}</label>
        {errors[name] && <p className='text-xs text-red-600'>{errors[name]}</p>}
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="bg-[#f6f7f9] text-xs py-4 px-6 rounded-md outline-none"
        />
    </div>
);
export default InputField;