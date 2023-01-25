import React, { useState, useRef } from 'react';
import './App.css';
import Lexer from "wordmap-lexer";
import {removeUsfmMarkers} from "./utils/usfmHelpers";
import {tokenizeVerseObjects} from "./utils/verseObjects";
import {targetVerseText, sourceVerse, alignedTokens} from './data/tit_1_1_alignment';
import WordList from './components/WordList/index';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    // width: '100vw',
    // height: '100%',
    width: '500px',
    height: '500px',
  },
  groupMenuContainer: {
    width: '250px',
    height: '100%',
  },
  wordListContainer: {
    minWidth: '100px',
    maxWidth: '400px',
    height: '100%',
    display: 'flex',
  },
  alignmentAreaContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: 'calc(100vw - 650px)',
    height: '100%',
  },
  scripturePaneWrapper: {
    minHeight: '250px',
    marginBottom: '20px',
    maxHeight: '310px',
  },
  alignmentGridWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    overflow: 'auto',
    boxSizing: 'border-box',
    margin: '0 10px 6px 10px',
    boxShadow: '0 3px 10px var(--background-color)',
  },
  wordStyle: {
    backgroundColor: 'lightblue',
    margin: '20px 25%',
    textAlign: 'center',
    fontSize: '40px'
  },
};

const verse = '1', chapter = '1';
let targetTokens = [];
let sourceTokens = [];

if (targetVerseText) {
  targetTokens = Lexer.tokenize(removeUsfmMarkers(targetVerseText));
}

if (sourceVerse) {
  sourceTokens = tokenizeVerseObjects(sourceVerse.verseObjects);
}

// TRICKY: do not show word list if there is no source bible.
let words = [];

if (sourceVerse) {
  words = getLabeledTargetTokens(targetTokens, alignedTokens);
}

const App = () => {

  // const dragItem = useRef();
  // const dragOverItem = useRef();
  // const [list, setList] = useState(['Item 1','Item 2','Item 3','Item 4','Item 5','Item 6']);
  //
  // const dragStart = (e, position) => {
  //   dragItem.current = position;
  //   console.log(e.target.innerHTML);
  // };
  //
  // const dragEnter = (e, position) => {
  //   dragOverItem.current = position;
  //   console.log(e.target.innerHTML);
  // };
  //
  // const drop = (e) => {
  //   const copyListItems = [...list];
  //   const dragItemContent = copyListItems[dragItem.current];
  //   copyListItems.splice(dragItem.current, 1);
  //   copyListItems.splice(dragOverItem.current, 0, dragItemContent);
  //   dragItem.current = null;
  //   dragOverItem.current = null;
  //   setList(copyListItems);
  // };

  const over = false;
  const targetDirection = 'ltr';
  const toolsSettings = {};
  const setToolSettings = () => { console.log('setToolSettings')};
  const connectDropTarget = () => { console.log('connectDropTarget')};
  const handleUnalignTargetToken = () => { console.log('handleUnalignTargetToken')};
  const targetLanguageFont = '';
  const resetWordList = false;

  return (
    <div style={styles.container}>
      <div style={styles.wordListContainer}>
        <WordList
          words={words}
          verse={verse}
          isOver={over}
          chapter={chapter}
          direction={targetDirection}
          toolsSettings={toolsSettings}
          reset={resetWordList}
          setToolSettings={setToolSettings}
          connectDropTarget={connectDropTarget}
          targetLanguageFont={targetLanguageFont}
          onDropTargetToken={handleUnalignTargetToken}
        />
      </div>
    </div>

  // <>
  //     {
  //       list&&
  //       list.map((item, index) => {
  //         return (
  //           <div style={wordStyle}
  //                onDragStart={(e) => dragStart(e, index)}
  //                onDragEnter={(e) => dragEnter(e, index)}
  //                onDragEnd={drop}
  //                key={index}
  //                draggable>
  //             {item}
  //           </div>
  //         );
  //       })}
  //   </>
  );
};

function  getLabeledTargetTokens(targetTokens, alignedTokens) {
  return targetTokens.map(token => {
    let isUsed = false;

    for (const usedToken of alignedTokens) {
      if (token.toString() === usedToken.toString()
        && token.occurrence === usedToken.occurrence
        && token.occurrences === usedToken.occurrences) {
        isUsed = true;
        break;
      }
    }
    token.disabled = isUsed;
    return token;
  });
}

export default App;
