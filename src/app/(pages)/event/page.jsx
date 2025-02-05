'use client'

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import {
  Trophy,
  UserPlus,
  Goal,
  AlertTriangle,
  Castle as Whistle,
  Car as Card,
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 pt-28 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="mb-12 text-center text-4xl font-bold">
          Champions League Final 2024: Real Madrid vs Manchester City
        </h1>

        <VerticalTimeline lineColor="rgba(255,255,255,0.2)">
          <VerticalTimelineElement
            className="vertical-timeline-element"
            contentStyle={{ background: '#1E40AF', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid #1E40AF' }}
            date="Pre-match"
            icon={<UserPlus />}
            iconStyle={{ background: '#1E40AF', color: '#fff' }}
          >
            <h3 className="text-xl font-bold">Starting Lineup Announced</h3>
            <p>Both teams reveal their starting XI for this crucial match</p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element"
            contentStyle={{ background: '#047857', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid #047857' }}
            date="15'"
            icon={<Goal />}
            iconStyle={{ background: '#047857', color: '#fff' }}
          >
            <h3 className="text-xl font-bold">GOAL! Real Madrid 1-0</h3>
            <p>Bellingham with a stunning strike from outside the box!</p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element"
            contentStyle={{ background: '#DC2626', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid #DC2626' }}
            date="32'"
            icon={<Card />}
            iconStyle={{ background: '#DC2626', color: '#fff' }}
          >
            <h3 className="text-xl font-bold">Red Card - Manchester City</h3>
            <p>Stones sent off for a dangerous tackle</p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element"
            contentStyle={{ background: '#047857', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid #047857' }}
            date="45+2'"
            icon={<Goal />}
            iconStyle={{ background: '#047857', color: '#fff' }}
          >
            <h3 className="text-xl font-bold">GOAL! Real Madrid 2-0</h3>
            <p>Vinicius Jr. doubles the lead just before halftime!</p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element"
            contentStyle={{ background: '#9333EA', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid #9333EA' }}
            date="60'"
            icon={<AlertTriangle />}
            iconStyle={{ background: '#9333EA', color: '#fff' }}
          >
            <h3 className="text-xl font-bold">VAR Check</h3>
            <p>Potential penalty for Manchester City under review</p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element"
            contentStyle={{ background: '#047857', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid #047857' }}
            date="78'"
            icon={<Goal />}
            iconStyle={{ background: '#047857', color: '#fff' }}
          >
            <h3 className="text-xl font-bold">GOAL! Manchester City 1-2</h3>
            <p>Haaland pulls one back for City!</p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element"
            contentStyle={{ background: '#B45309', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid #B45309' }}
            date="90+4'"
            icon={<Whistle />}
            iconStyle={{ background: '#B45309', color: '#fff' }}
          >
            <h3 className="text-xl font-bold">Full Time</h3>
            <p>Real Madrid wins 2-1!</p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element"
            contentStyle={{ background: '#4F46E5', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid #4F46E5' }}
            date="Post-match"
            icon={<Trophy />}
            iconStyle={{ background: '#4F46E5', color: '#fff' }}
          >
            <h3 className="text-xl font-bold">Trophy Presentation</h3>
            <p>Real Madrid lifts their 15th Champions League trophy!</p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  )
}
