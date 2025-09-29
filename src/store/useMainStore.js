import { create } from "zustand";
import paper from '../assets/paper.json'
const sectionKeys = paper.map(item=>item.Topic);

const useMainStore = create((set)=>
({
    achievements:0,
    selectedIndex: 0,
    achievementUnlocked:false,
    unlockedAchievements:new Set([]),
    setSelectedIndex: (index) => set(() => ({ selectedIndex: index })),
    increaseAchievement: current => set(state => {
    const idx = sectionKeys.indexOf(current);
    if (idx < sectionKeys.length - 1  && !state.unlockedAchievements.has(current)) {
      const newUnlocked = new Set(state.unlockedAchievements);
      newUnlocked.add(sectionKeys[idx]);
      return { unlockedAchievements: newUnlocked, achievements:state.achievements+1,achievementUnlocked:true };
    }
  }),
    switchAchievement: ()=>set(()=>({achievementUnlocked:false}))
}));
export default useMainStore;
