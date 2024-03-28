export default function Search({filterBy, setFilterBy}){

    return(
        <div className="search">
            <div>
                <label htmlFor="search">Search: </label>    
            </div>
            <div id="searchInput">
                <input id="search" type="text" onChange={e=>setFilterBy(e.target.value)} value={filterBy} />
            </div>
        </div>
    )
}