import React from 'react'
import { useState } from 'react';
import {Link} from 'react-router-dom'

function TournamentFeatures({ tournaments, flags }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maximumPageNumberLimit, setMaximumPageNumberLimit] = useState(5);
    const [minimumPageNumberLimit, setMiniimumPageNumberLimit] = useState(0);
    
    // console.log(tournaments)

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id))
    }

    const pages = [];
    for (var i = 1; i <= Math.ceil(tournaments.length / itemsPerPage); i++) {
        pages[i - 1] = i;
    }
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tournaments.slice(indexOfFirstItem, indexOfLastItem);

    const renderPageNumbers = pages.map((number) => {
        if (number < maximumPageNumberLimit + 1 && number > minimumPageNumberLimit) {
            return (
                <li key={number} id={number} className={currentPage === number ? "active" : "notActive"} onClick={handleClick}>
                    {number}
                </li>
            )
        } else {
            return null;
        }
    })

    const handlePrevBtn = () => {
        setCurrentPage(currentPage - 1);
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaximumPageNumberLimit(maximumPageNumberLimit - pageNumberLimit);
            setMiniimumPageNumberLimit(minimumPageNumberLimit - pageNumberLimit);
        }
    }
    const handleNextBtn = () => {
        setCurrentPage(currentPage + 1);
        if (currentPage + 1 > maximumPageNumberLimit) {
            setMaximumPageNumberLimit(maximumPageNumberLimit + pageNumberLimit);
            setMiniimumPageNumberLimit(minimumPageNumberLimit + pageNumberLimit);
        }
    }

    function getFlags(name) {
        let ans = "";
        for (let i = 0; i < flags.length; i++) {
            if (flags[i].name.common === name) {
                ans = flags[i].flags[1];
                break;
            }
        }
        if (ans === "") {
            for (let i = 0; i < flags.length; i++) {
                if (flags[i].name.official === name) {
                    ans = flags[i].flags[1];
                    break;
                }
            }
        }
        return ans;
    }

    return (
        <div className='container1'>
            {
                currentItems.map((match, index) => (
                    <div className='Tcontainer' key={index} style={{border:"1px solid black", width:"90%", marginBottom:"1rem", backgroundColor:"gray", marginTop:"1rem"}}>
                        <h1>{match.name}</h1>
                        <div className='countryName' style={{display:"flex", justifyContent:"center"}}>
                            <p>country:</p>
                            <h5>{match.area.name}</h5>
                        </div>
                        <div className='countryFlags'>
                        <img src={getFlags(match.area.name)} className='countryFlag' alt={match.area.name} />
                        </div>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                        <Link to={`/pointstable/${match.id}`} style={{color:"white", textDecoration:"none", cursor:"pointer", margin:"auto"}}>Points Table</Link>
                        <Link to='/stats' style={{color:"white", textDecoration:"none", cursor:"pointer", margin:"auto"}}>Statictics</Link>
                        </div>
                    </div>
                ))
            }
            <ul className='pageNumbersList'>
                <button onClick={handlePrevBtn} disabled={currentPage === pages[0] ? true : false} className={currentPage === pages[0] ? "prevBtnDisabled" : "prevBtn"}>Prev</button>
                {renderPageNumbers}
                <button onClick={handleNextBtn} disabled={currentPage === pages[pages.length - 1] ? true : false} className={currentPage === pages[pages.length - 1] ? "nextBtnDisabled" : "nextBtn"}>Next</button>
                <div className='pageDisplay'>Page {currentPage} of {pages.length}</div>
            </ul>
        </div>
    )
}

export default TournamentFeatures