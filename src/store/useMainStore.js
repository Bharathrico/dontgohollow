import { create } from "zustand";
import { persist } from "zustand/middleware";
import paper from '../assets/paper.json'
const sectionKeys = paper.map(item=>item.topic);
const useMainStore = create(
  persist(
    (set)=>
({
    achievements:0,
    selectedIndex: 0,
    achievementUnlocked:false,
    rewardDialog:false,
    unlockedAchievements:["Getting Started"],
    setSelectedIndex: (index) => set(() => ({ selectedIndex: index })),
    increaseAchievement: current => set(state => {
    const idx = sectionKeys.indexOf(current);
    if (idx < sectionKeys.length - 1  && state.unlockedAchievements.indexOf(current)==-1) {
      const newUnlocked = [...state.unlockedAchievements,sectionKeys[idx]];
      return { unlockedAchievements: newUnlocked, achievements:state.achievements+1,achievementUnlocked:true };
    }

    if(state.unlockedAchievements.length==0)
    {
      return {unlockedAchievements:["Getting Started"]}
    }
    else{
    return{}
    }
  }),
    switchAchievement: ()=>set(()=>({achievementUnlocked:false})),
    switchDialog: ()=>set((state)=>({rewardDialog:!state.rewardDialog}))
}),
{ name: 'my-hollow-store', }
)
);
export default useMainStore;
