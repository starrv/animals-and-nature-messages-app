import { useSession } from "next-auth/react";

export default function Search({filterBy, setFilterBy}){

    return(
        <div className="search">
            <div>
                <label for="search">Search: </label>    
            </div>
            <div id="searchInput">
                <input id="search" type="text" onChange={e=>setFilterBy(e.target.value)} value={filterBy} />
            </div>
        </div>
    )
}