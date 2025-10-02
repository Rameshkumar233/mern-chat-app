import { useRef } from "react";

const VerificationCodeInput = ({ code, setCode }) => {
    const inputRefs = useRef([]);
    const handleChange = (value, index) => {
        const newCode = [...code];
        if (/^[0-9]?$/.test(value)) {
            newCode[index] = value;
            setCode(newCode);
            if (value && index < code.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const newCode = [...code];
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        const digits = pasted.split("");
        digits.forEach((digit, i) => {
            newCode[i] = digit;
        });
        setCode(newCode);
        const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
        const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
        inputRefs.current[focusIndex].focus();
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };
    return (
        <div className='flex justify-between gap-2'>
            {code.map((digit, index) => (
                <input
                    key={index}
                    type='text'
                    ref={(el) => (inputRefs.current[index] = el)}
                    maxLength='6'
                    value={digit}
                    className='w-12 h-12 text-xl text-center input input-bordered'
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={(e) => handlePaste(e)}
                />
            ))}
        </div>
    );
};

export default VerificationCodeInput;
