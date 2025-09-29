import React,{ useEffect, useRef } from 'react';
import paper from '../assets/paper.json';
import useMainStore from '../store/useMainStore';

const ContentBlock = ({ block }) => {
  if (block.text) {
    return (
    <>
      {block.title&&<h3>{block.title}</h3>}
      <p>{block.text}</p>
    </>);
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
                <td style={{fontWeight:rowIndex==0?500:300}} key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
   if (block.image) {
    return (
      <div style={{ marginBottom: '10px', marginTop:"40px" }}>
        <img src={block.image.url} alt={block.image.alt} style={{ maxWidth: '100%' }} />
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

const Subtopic = ({ section }) => (
  <div>
    <h2>{section.subtopic}</h2>
    {section.content.map((block, idx) => (
      <ContentBlock block={block} key={idx} />
    ))}
  </div>
);

const Topic = ({ section }) => (
  <div style={{ marginBottom: 30 }}>
    <h1>{section.topic}</h1>
    {section.content.map((block, idx) => (
      <ContentBlock block={block} key={idx} />
    ))}
    {section.subtopics && section.subtopics.map((subtopic, idx) => {
      console.log(subtopic.content)
      return (
      <Subtopic section={subtopic} key={idx} />
    )})}
  </div>
);

export default function Content() {

  const ref = useRef();

  const {selectedIndex, setSelectedIndex, increaseAchievement, unlockedAchievements} = useMainStore();

  return (
    <div style={{ padding: 20 }} key={selectedIndex}>
        <Topic section={paper[selectedIndex]} /> 
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
                                                if(!unlockedAchievements.has(paper[selectedIndex].topic))
                                                {
                                                  increaseAchievement(paper[selectedIndex].topic)
                                                }
                                              }
                                                else if(selectedIndex<(paper.length-1))
                                                {
                                                  increaseAchievement(paper[selectedIndex].topic)
                                                }}}>Next</div>
        </div>
     </div>
  );
}