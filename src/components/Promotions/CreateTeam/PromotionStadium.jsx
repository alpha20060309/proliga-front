import { PlayersStructureContainer } from 'components/Game/Player'
import Image from 'next/image'
import prisma from 'lib/prisma'
import PromotionStadiumPlayers from './PromotionPlayers'


const publicPlayers = async () => {

    const players = await prisma.player.findMany({
        include: {
            club: true
        },
        where: {
            is_public: true,
            deleted_at: null
        },
        orderBy: {
            position: 'asc'
        },
        take: 11
    })
    return players
}


const PromotionStadium = async () => {
    const players = await publicPlayers()
    return (
        <div className='relative overflow-hidden'>

            <section className="relative w-auto overflow-hidden">
                <Image
                    src="/icons/stadium.svg"
                    alt="stadium"
                    width={500}
                    height={450}
                    draggable={false}
                    priority
                    className="w-full rounded-xl overflow-hidden select-none h-128"
                />
                <PlayersStructureContainer >
                    <PromotionStadiumPlayers players={players} />
                </PlayersStructureContainer>
            </section>
        </div>
    )
}

export default PromotionStadium