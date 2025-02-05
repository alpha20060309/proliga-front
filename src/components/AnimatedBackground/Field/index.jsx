import { FieldLines } from '../FieldLines'
import { SoccerBallAnimation } from '../SoccerBall'

export const Field = () => {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-green-800 to-green-600">
      <SoccerBallAnimation />
    </div>
  )
}
