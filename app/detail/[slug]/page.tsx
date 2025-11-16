'use client'

import Header from '@/app/components/Header';
import AboutContent from '@/app/components/Tab/ContentAbout';
import BaseStatsContent from '@/app/components/Tab/ContentStat';
import Tabs from '@/app/components/Tab/Tabs';
import { POKEMON_COLORS } from '@/lib/config';
import { withPadStart } from '@/lib/helper';
import { usePokemonDetails } from '@/lib/hooks/usePokemonDetails';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';


function Detail() {
    const params = useParams();
    const { slug } = params;
    const { detail, loading, error } = usePokemonDetails(slug as string);
    const tabs = ['About', 'Base Stats', 'Evolution', 'Moves'];
    const [activeTab, setActiveTab] = useState('About');

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={`pokedex-container ${POKEMON_COLORS[detail?.species_detail?.color.name || 'default']}`}>
            <Header />
            <div className='flex px-6 pt-4 pb-6 items-center justify-between'>
                <div className="flex flex-col gap-2">
                    <h1 className="pokedex-title detail capitalize">{slug as string}</h1>
                    <div className='flex gap-4'>
                        {detail && detail.types.map((type, index) => (
                            <span key={index} className="pokemon-type detail capitalize">
                                {type.type.name}
                            </span>
                        ))}
                    </div>
                </div>
                <div className='pokemon-id detail'>#{withPadStart(detail?.id || 0)}</div>
            </div>

            <div className="relative px-6 z-20">
                <div className="flex justify-center">
                    <Image
                        src={detail?.sprites.other['official-artwork'].front_default || 'https://picsum.photos/200'}
                        alt={detail?.name || 'Pokemon'}
                        width={500}
                        height={500}
                        loading='eager'
                        className="pokemon-detail-image"
                        style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
                    />
                </div>
            </div>

            <div className='tabbed-container absolute left-0 bottom-0'>
                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

                <div className='tabbed-content-container'>
                    {activeTab === 'About' && detail && <AboutContent data={detail} />}
                    {activeTab === 'Base Stats' && detail && <BaseStatsContent stats={detail?.stats_detail || []} />}
                    {activeTab === 'Evolution' && (
                        <div className="p-6 text-gray-500 text-center">Evolution content here</div>
                    )}
                    {activeTab === 'Moves' && (
                        <div className="p-6 text-gray-500 text-center">Moves content here</div>
                    )}
                </div>
            </div>


        </div>
    )
}

export default Detail