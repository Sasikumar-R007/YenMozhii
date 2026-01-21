import Hero from '@/components/sections/Hero'
import ProblemStatement from '@/components/sections/ProblemStatement'
import Solution from '@/components/sections/Solution'
import TechnologyOverview from '@/components/sections/TechnologyOverview'
import KeyFeatures from '@/components/sections/KeyFeatures'
import TargetUsers from '@/components/sections/TargetUsers'
import FieldVisit from '@/components/sections/FieldVisit'
import DevelopmentJourney from '@/components/sections/DevelopmentJourney'
import VisionFuture from '@/components/sections/VisionFuture'
import Team from '@/components/sections/Team'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ProblemStatement />
      <Solution />
      <TechnologyOverview />
      <KeyFeatures />
      <TargetUsers />
      <FieldVisit />
      <DevelopmentJourney />
      <VisionFuture />
      <Team />
      <Contact />
    </div>
  )
}

