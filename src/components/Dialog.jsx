import React from 'react';
import { AnimatePresence, motion } from "motion/react"
import paper from "../assets/paper.json"
import useMainStore from '../store/useMainStore';

export default function Dialog() {

    const {rewardDialog,switchDialog,unlockedAchievements} = useMainStore()
     const filtered = paper.filter(section => {
        return (unlockedAchievements.indexOf(section.topic)!==-1&&section.topic!=="Getting Started")});
  return (
    <AnimatePresence>
    {rewardDialog&&<motion.div 
      onClick={()=>switchDialog()}
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
      animate={{ background: '#ffffffDD',backdropFilter: 'blur(10px)',transition:{ duration:0.6,  ease: 'easeOut',} }}
      exit={{ background: '#ffffff00',backdropFilter: 'blur(0px)', transition:{ duration:0.5,  ease: 'easeOut'}}}
    >

        <motion.h2 initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}> My Rewards</motion.h2>
        <motion.div style={{display:"flex", flexDirection:"row", justifyContent:"center", width:600, flexWrap:"wrap"}} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            {filtered.map(({ topic, achievement }) => (
        <div key={topic} style={{ textAlign: 'center' }}>
          <img
            src={achievement}
            alt={topic}
            style={{ width: 140, height: 140, borderRadius: 8 }}
          />
        </div>
      ))}
        </motion.div>
        
    </motion.div>}
    </AnimatePresence>
  );
}
