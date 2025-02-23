import React, { useEffect, useRef, useState } from 'react';

export default function OtpInputs({ type, index, otp, setOtp, setMoveFocus, moveFocus }) {
    const inpRef = useRef(null);
    const [otpValue, setOtpValue] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            setOtpValue(value);
            if (value && index < otp.length - 1) {
                setMoveFocus(index + 1);
            }
        }
    };

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData('Text');
        if (/^\d*$/.test(pasteData) && pasteData.length === otp.length) {
            const newOtp = pasteData.split('');
            setOtp(newOtp);
            setMoveFocus(otp.length);
        }
        e.preventDefault();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace' && otpValue === '') {
            if (index > 0) {
                setMoveFocus(index - 1);
                const newOtp = [...otp];
                newOtp[index - 1] = '';
                setOtp(newOtp);
            }
        }
    };

    useEffect(() => {
        if (moveFocus === index) {
            inpRef.current.focus();
        }
    }, [moveFocus, index]);

    useEffect(() => {
        setOtpValue(otp[index] || '');
    }, [otp, index]);

    useEffect(() => {
        setOtpValue('');
    }, [otp.length]);

    return (
        <div className="w-[40px] h-[40px]">
            <input
                className="w-full h-full flex flex-col items-center justify-center text-center px-2.5 py-1.5 outline-none rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 focus:ring-inset focus:ring-blue-500"
                id={type}
                name={type}
                type={type}
                ref={inpRef}
                maxLength={1}
                value={otpValue}
                onChange={handleInputChange}
                onPaste={handlePaste}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}
