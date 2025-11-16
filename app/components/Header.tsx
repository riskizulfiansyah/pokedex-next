'use client'

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const Header: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const isPokemonDetail = pathname.startsWith('/detail/');
    return (
        <header className="pokedex-header">
            <div className="flex items-center justify-between">
                <button className="header-button" aria-label="Go back" onClick={() => isPokemonDetail ? router.back() : ''}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {isPokemonDetail ? (
                    <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm" aria-label="Favorite">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </button>
                ) : (
                    <button className="header-button" aria-label="Menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                )}
            </div>
        </header>
    )
}

export default Header