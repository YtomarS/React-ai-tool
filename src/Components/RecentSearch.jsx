import React from 'react'

export default function RecentSearch({recentHistory,setSelectedHistory,setRecentHistory}) {
    const clearHistory=()=>{
    localStorage.clear();
    setRecentHistory([]);
  }

  const clearSelectedHistory=(selectedItem)=>{
    let history=JSON.parse(localStorage.getItem('history'));
    history=history.filter((item)=>{
      if (item!=selectedItem) {
        return item 
      }
    })
    setRecentHistory(history);
    localStorage.setItem('history', JSON.stringify(history));

  }

  return (
    <>
    <div className="col-span-1 dark:bg-zinc-800 bg-red-100 ">
          <h2 className="text-xl dark:text-zinc-300 text-zinc-800 p-2 flex justify-center "> 
            <span>Search History</span>
              <button onClick={clearHistory} className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" 
                width="20px" fill="#e3e3e3"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 
                240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 
                0h72v-336h-72v336ZM312-696v480-480Z"/></svg>
              </button> 
            </h2>       
          <ul className="text-left overflow-auto mt-2  ">                                                              
            {
              recentHistory && recentHistory.map((item,index)=>(
               <div key={index} className='flex justify-between pr-3 py-1'>
                 <li onClick={()=>setSelectedHistory(item)} className="w-full pl-5 px-5 dark:text-zinc-400 text-zinc-700
                cursor-pointer dark:hover:bg-zinc-700 dark:hover:text-zinc-200 truncate hover:bg-red-200 hover:text-zinc-800"         //truncate used for long string to ....form 
                key={index}>{item}</li> 
                 <button onClick={()=>clearSelectedHistory(item)} className="cursor-pointer hover:bg-zinc-900 dark:bg-zinc-700 bg-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" 
                    width="20px" fill="#e3e3e3"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 
                    240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 
                    0h72v-336h-72v336ZM312-696v480-480Z"/></svg>
                </button> 
               </div>
              ))
            }
          </ul>
        </div>
    </>
  )
}
