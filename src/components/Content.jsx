import React,{ useEffect, useRef } from 'react';
import paper from '../assets/paper.json';
import useMainStore from '../store/useMainStore';

const ContentBlock = ({ block }) => {
  if (block.text) {
    return <p>{block.text}</p>;
  }

  if (block.quote) {
    return <p><i>{block.quote}</i></p>;
  }

  if (block.table) {
    return (
      <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', marginBottom: '10px' }}>
        <tbody>
          {block.table.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
   if (block.image) {
    return (
      <div style={{ marginBottom: '10px' }}>
        <img src={block.image.url} alt={block.image.description} style={{ maxWidth: '100%' }} />
        <p><i>{block.image.description}</i></p>
      </div>
    );
  }

  if (block.points) {
    return (
      <ul>
        {block.points.map((point, idx) => (
          <li style={{marginBottom:30}} key={idx}>{point}</li>
        ))}
      </ul>
    );
  }

  return null;
};

const Subtopic = ({ subtopic }) => (
  <div>
    <h2>{subtopic.Subtopic}</h2>
    {subtopic.content.map((block, idx) => (
      <ContentBlock block={block} key={idx} />
    ))}
  </div>
);

const Topic = ({ topic }) => (
  <div style={{ marginBottom: 30 }}>
    <h1>{topic.Topic}</h1>
    {topic.content.map((block, idx) => (
      <ContentBlock block={block} key={idx} />
    ))}
    {topic.subtopics && topic.subtopics.map((subtopic, idx) => (
      <Subtopic subtopic={subtopic} key={idx} />
    ))}
  </div>
);

export default function Content() {

  const ref = useRef();

  const {selectedIndex, setSelectedIndex, increaseAchievement, unlockedAchievements} = useMainStore();

  return (
    <div style={{ padding: 20 }} key={selectedIndex}>
        <Topic topic={paper[selectedIndex]} /> 
        <div
          style={{            
            display:"flex",
            width: "100%",
            height: "60px",
            flexDirection:"row",
            alignItems: 'center',
            justifyContent:"space-between"
          }}
        className="pagenavigation">
          <div className="previous navbutton" style={{opacity: selectedIndex>0 ? 1 : 0.4,}} onClick={() => {if(selectedIndex>0){window.scrollTo(0,0);
                                                    setSelectedIndex(selectedIndex-1);}}}>Previous</div>
          <div className="next navbutton" style={{opacity: selectedIndex<(paper.length-1) ? 1 : 0.4,}} onClick={() => {if(selectedIndex<(paper.length-1)){window.scrollTo(0,0);
                                                setSelectedIndex(selectedIndex+1);
                                                if(!unlockedAchievements.has(paper[selectedIndex].Topic))
                                                {
                                                  increaseAchievement(paper[selectedIndex].Topic)
                                                }
                                              }
                                                else if(selectedIndex<(paper.length-1))
                                                {
                                                  increaseAchievement(paper[selectedIndex].Topic)
                                                }}}>Next</div>
        </div>
     </div>
  );
}