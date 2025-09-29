import './App.css'
import useMainStore from './store/useMainStore'
import Content from './components/Content'
import paper from './assets/paper.json'
import Achievement from './components/Achievement'
import { AnimatePresence, easeInOut, motion } from "motion/react"

function formatTwoDigits(number) {
  return number.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
}

function App() {

  const {achievements, selectedIndex, setSelectedIndex,achievementUnlocked, switchAchievement } = useMainStore();
  return (
    <div className="app-container">
      <Achievement/>
      {/* Top Navbar */}

      <AnimatePresence>
      <header className="navbar">
        <motion.div
        initial={{ opacity: 1,
              scale: 1, }}
          animate={{ opacity: 1,
              scale: !achievementUnlocked?[1,1.3,1]:1, transition:{delay:0.3}}}
          exit={{ opacity: 1,
              scale: 1, }}
        className='achievement'>
          <motion.div 
          key={paper[selectedIndex].topic}
          initial={{transform: 'scale(0.8)', fontWeight:'100' }}
          animate={{transform: 'scale(1)', fontWeight:'400', transition:{ duration:0.4,  ease: [0.71, 0, 0.17, 1.25], delay: 0.1}}}
          exit={{transform: 'scale(0.8)', fontWeight:'100', transition:{ duration:1, ease: [0.71, 0, 0.17, 1.25]} }}
          >{formatTwoDigits(achievements)}</motion.div>
          /
          <div>20</div>
        </motion.div>
      </header>
      </AnimatePresence>

      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          {paper.map((topic, idx) => (
          <div
            key={topic.topic}
            style={{
              margin: '10px 0',
              cursor: 'pointer',
              fontWeight: idx === selectedIndex ? 'bold' : 'normal',
            }}
            onClick={() => {window.scrollTo(0,0);setSelectedIndex(idx)}}
          >
            {topic.topic}
          </div>
        ))}
        </aside>

        {/* Main Content */}
        <main className="content">
          <Content/>
        </main>
      </div>
    </div>
  );
}

export default App;
