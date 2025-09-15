import React from 'react'
import Answers from "./Answers";

export default function ({item,index}) {
  return (
    <>
        <div key={index + Math.random()} className={item.type=='q'?'flex justify-end':''}>
         {
            item.type=='q'?                                                  // {/* to identify questions   */} 
                  <li className="text-right p-2 border-6 dark:bg-zinc-700 dark:border-zinc-700 w-fit rounded-bl-3xl rounded-br-3xl 
                  rounded-tl-3xl bg-red-100 border-red-100" 
                     key={index + Math.random()}>        
                        <Answers ans={item.text} totalResult={1} index={index} type={item.type}/></li>
             : item.text.map((ansItem,ansIndex)=>( 
                    <li className="text-left p-1" key={ansIndex + Math.random()}> 
                        <Answers ans={ansItem} totalResult={item.length} index={ansIndex} type={item.type} /></li> 
                            ))
          }
        </div>
    </>
  )
}
