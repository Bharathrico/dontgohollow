import React from 'react';
import { AnimatePresence, motion } from "motion/react"
import paper from "../assets/paper.json"
import useMainStore from '../store/useMainStore';

export default function Achievement() {

    const {selectedIndex,achievementUnlocked, switchAchievement} = useMainStore()

  return (
    <AnimatePresence>
    {achievementUnlocked&&<motion.div 
      onClick={()=>switchAchievement()}
      style={{
        display: 'flex',
        position: 'fixed',
        left: 0,
        top:0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width:'100%',
        gap: '20px',
        zIndex: 9,
        background: '#ffffffBB',
        overflow:'hidden'
        
      }}
      initial={{  background: '#ffffff00',backdropFilter: 'blur(0px)', }}
      animate={{ background: '#ffffffBB',backdropFilter: 'blur(10px)',transition:{ duration:0.6,  ease: 'easeOut',} }}
      exit={{ background: '#ffffff00',backdropFilter: 'blur(0px)', transition:{ duration:1,  ease: 'easeOut'}}}
    >
        <motion.img className='achievementbadge'
        src={paper[selectedIndex-1].Achievement} 
        alt="Abstract finished" 
        initial={{opacity:0,transform: 'scale(0.5) rotate(45deg)' }}
      animate={{opacity:1,transform: 'scale(1) rotate(0deg)', transition:{ duration:0.4,  ease: [0.71, 0, 0.17, 1.25], delay: 0.1}}}
      exit={{opacity:0, width:"10%", transform: 'translate(40vw,-40vh)', transition:{ duration:1, ease: [0.71, 0, 0.17, 1.25]} }}
      />
      <motion.p
      initial={{opacity:0, }}
      animate={{opacity:1,}}
      exit={{opacity:0, }}
      style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{paper[selectedIndex-1].Topic} Finished</motion.p>
    </motion.div>}
    </AnimatePresence>
  );
}
