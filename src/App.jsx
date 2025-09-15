import { useEffect, useRef, useState } from "react";
import "./App.css";
import { url } from "./Constant";
import RecentSearch from "./Components/RecentSearch";
import LoaderSvg from "./Components/LoaderSvg";
import QuestionAnswer from "./Components/QuestionAnswer";
import Answers from "./Components/Answers";

function App() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState([]);
  const [recentHistory,setRecentHistory]=useState(JSON.parse(localStorage.getItem('history')));
  const [selectedHistory,setSelectedHistory]=useState('');
  const scrollToAns=useRef();
  const [loader,setLoader] = useState(false);
  
  const askQuestion = async () => { 
    if (!question && !selectedHistory) {
      return false;
    }

    if (question) {
      if (localStorage.getItem('history')) {
      let history = JSON.parse(localStorage.getItem('history'));
        history= history.slice(0,19);
        history = [question, ...history ] 
        history= history.map((item)=>
        item.charAt(0).toUpperCase()+item.slice(1).trim());             // to remove duplicate history,,spaces
        history=[...new Set(history)];

        localStorage.setItem('history', JSON.stringify(history));
         setRecentHistory(history);
    }else{
      localStorage.setItem('history',JSON.stringify([question]));
      setRecentHistory([question]);
      }
    }
    const payloadData= question? question :selectedHistory;
    const payload = {
    contents: [{
        parts: [{ text: payloadData }] 
      }] 
    }
    setLoader(true);
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());

    setResult([...result,{type:'q',text:question? question :selectedHistory},{type:'a',text:dataString}]);
    
    setTimeout(() => {
          scrollToAns.current.scrollTop=scrollToAns.current.scrollHeight;
    },500);
  setLoader(false);
  };


  const isEnter=(e)=>{
    if (e.key=='Enter') {
      askQuestion();
     setQuestion('');
    }
  }
  useEffect(()=>{
    askQuestion();
  },[selectedHistory]);
  
  // dark Mode 
  const [darkMode,setDarkMode]=useState('dark');
  useEffect(()=>{
    if (darkMode=='dark') {
      document.documentElement.classList.add('dark');
    }else{ 
   document.documentElement.classList.remove('dark'); 
  }
  },[darkMode]);

  return (
    <div className={darkMode=='dark'?'dark':'light'}> 
      <div className="grid grid-cols-5 h-screen text-center ">               {/*left side container for search history */} 
          <select onChange={(e)=>setDarkMode(e.target.value)} className="fixed bottom-6 left-5 dark:text-zinc-300 
           "name='theme' >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        <RecentSearch recentHistory={recentHistory} setSelectedHistory={setSelectedHistory} setRecentHistory={setRecentHistory} />

        <div className="col-span-4 dark:bg-zinc-900 bg-amber-50  ">                     {/*Right side container */}                       
        <h1 className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700 pt-5 "
        >Hello User,Ask me anything...</h1>
        <LoaderSvg loader={loader} />   {/* for loader */}
          
          <div ref={scrollToAns} className="container h-140 overflow-scroll">
            <div className="dark:text-zinc-300 text-zinc-800 p-5"> 
              {/* {result}  */}
              <ul> 
                { result && result.map((item, index) => ( 
                  <QuestionAnswer key={index}  item={item} index={index} /> 
                ))} 
              </ul>
              <Answers /> 
            </div>
          </div>
        
          <div className="dark:bg-zinc-800 bg-red-100 sm:w-1/2 p-1 mt-3 pr-6 m-auto dark:text-white text-zinc-600 border              {/* for input field */} 
              rounded-4xl h-16 dark:border-zinc-400 border-zinc-800 flex"> 
            <input
              type="text" 
              onKeyDown={isEnter}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full h-full p-3 outline-none"
              placeholder="Ask me anything "
            />
            <button
              onClick={askQuestion} 
              className="rounded-lg cursor-pointer h-auto w-8
              :hover:shadow-md "
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>  
  );
}

export default App;
