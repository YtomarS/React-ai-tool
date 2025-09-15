import React, { useEffect, useState } from 'react'
import { CheckHeading, ReplaceHeadingStars } from '../Helper';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/light';

export default function Answers({ans,index,totalResult,type}) {
  const [heading,setHeading]=useState(false);
  const [answer,setAnswer]=useState(ans);
  useEffect(()=>{
    if(CheckHeading(ans)){ 
      setHeading(true);
      setAnswer(ReplaceHeadingStars(ans));
    }
   },[]);

  // for code optimization (made code readable), provided by ai;
  const components={
    code({node,className,inline,children,...props}){
      const match = /language-(\w+)/.exec(className || '');
      return !inline &&match?(
         <SyntaxHighlighter
            {...props}
            language={match[1]}
            style={dark}
            preTag="div"
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
      )
       : (
          <code {...props} className={className} >
            {children}
          </code>
        )
    }
  }
  return (
    <>
        
        { index==0 && totalResult>1?<span className='pt-2 text-xl block text-white' >{answer}</span>:
          heading?<span className='pt-2 text-lg block text-white'>{answer}</span>
          :<span className={type=='q'?'pl-1':'pl-5'}>
            <ReactMarkdown components={components}> 
              {answer}
            </ReactMarkdown>            {/*install ReactMarkdown from google*/}
          </span> 
        }
    </> 
  )
}
