'use client'
import Image from 'next/image'
import { useState, useEffect, useMemo, memo } from 'react'
import { GOAContainer, DEFContainer, MIDContainer, STRContainer, PlayerContainer, PlayerName } from 'components/Game/Player'
import { useSelector } from 'react-redux'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { staticPath } from 'app/utils/static.util'

const PromotionStadiumPlayers = ({ players }) => {
    const [GOA, setGOA] = useState(null)
    const [DEF, setDEF] = useState(null)
    const [MID, setMID] = useState(null)
    const [STR, setSTR] = useState(null)

    useEffect(() => {
        setGOA(players.filter(player => player.position === 'GOA'))
        setDEF(players.filter(player => player.position === 'DEF'))
        setMID(players.filter(player => player.position === 'MID'))
        setSTR(players.filter(player => player.position === 'STR'))
    }, [players])

    console.log(GOA, DEF, MID, STR)

    return (
        <>
            <GOAContainer>
                {players.filter(player => player.position === 'GOA')?.map(player => (
                    <Player key={player.id} player={player} />
                ))}
            </GOAContainer>
            <DEFContainer>
                {players.filter(player => player.position === 'DEF')?.map(player => (
                    <Player key={player.id} player={player} />
                ))}
            </DEFContainer>
            <MIDContainer>
                {MID?.map(player => (
                    <Player key={player.id} player={player} />
                ))}
            </MIDContainer>
            <STRContainer>
                {STR?.map(player => (
                    <Player key={player.id} player={player} />
                ))}
            </STRContainer>
        </>

    )
}

const Player = memo(({ player }) => {
    const { lang } = useSelector((store) => store.systemLanguage)

    const imageErr = (e) => {
        e.target.src = '/icons/player.svg'
    }

    const clubPath = useMemo(
        () => (player.name ? player?.club?.slug : ''),
        [player]
    )
    const name = getCorrectName({
        lang,
        uz: player?.name,
        ru: player?.name_ru,
    })

    const lastName = name?.split(' ')[1] ?? ''
    const tShirt = staticPath + '/club-svg/' + clubPath + '/app.svg'
    return (
        <PlayerContainer>
            {!player.name && (
                <>
                    <Image
                        src="/icons/player-tshirt.svg"
                        alt="player tshirt"
                        width={48}
                        height={48}
                        draggable={false}
                        className="xs:size-8 size-6 md:size-10 lg:size-8 xl:size-10"
                    />
                </>
            )}
            {player.name && (
                <>
                    <div className={("xs:size-8 relative size-6 md:size-10 lg:size-8 xl:size-10")}>
                        <Image
                            src={tShirt}
                            alt="player tshirt"
                            width={48}
                            height={48}
                            onError={imageErr}
                            draggable={false}
                            className="h-full w-full"
                        />
                    </div>
                    <PlayerName>
                        {lastName}
                    </PlayerName>
                </>
            )}
        </PlayerContainer>
    )
})
Player.displayName = 'Player'


export default PromotionStadiumPlayers