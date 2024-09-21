'use client'

import Image from 'next/image'
import { useState } from 'react'

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    const [error, setError] = useState(false)

    if (error) {
        return (
            <div className="w-[150px] h-[75px] bg-[#FF9FD5] flex items-center justify-center text-white font-bold text-lg rounded">
                Peke Clothes
            </div>
        )
    }

    return (
        <Image
            src="/peke-clothes-logo.jpg"
            alt="Peke Clothes Logo"
            width={150}
            height={75}
            onError={() => setError(true)}
            className={className}
        />
    )
}

export default Logo
