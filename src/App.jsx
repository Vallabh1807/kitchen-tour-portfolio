import { useState } from 'react'
import FoodCursor  from './components/FoodCursor'
import Floaters     from './components/Floaters'
import ProgressBar  from './components/ProgressBar'
import LoadingScreen from './components/LoadingScreen'
import { useScrollProgress } from './hooks/useScrollProgress'

// Scenes — in scroll order
import SceneOutside   from './scenes/SceneOutside'
import SceneDoor      from './scenes/SceneDoor'
import SceneReception from './scenes/SceneReception'
import SceneProjects  from './scenes/SceneProjects'
import ScenePantry    from './scenes/ScenePantry'
import SceneTimeline  from './scenes/SceneTimeline'
import SceneCredentials from './scenes/SceneCredentials'
import SceneContact   from './scenes/SceneContact'

export default function App() {
  const { progress } = useScrollProgress()
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && (
        <LoadingScreen onComplete={() => setLoading(false)} />
      )}

      <div style={{
        opacity:    loading ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}>
        <Floaters />
        <FoodCursor />
        <ProgressBar progress={progress} />

        {/*
          Each scene is a self-contained scroll section.
          Sticky scenes use their own internal ref + sectionProgress().
          Flow sections (Reception, Projects, etc.) use IntersectionObserver reveals.
        */}
        <SceneOutside />
        <SceneDoor />
        <SceneReception />
        <SceneProjects />
        <ScenePantry />
        <SceneTimeline />
        <SceneCredentials />
        <SceneContact />
      </div>
    </>
  )
}
