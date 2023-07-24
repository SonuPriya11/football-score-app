import React, { useState, useEffect } from 'react';
import './Fixtures.css';

function Fixtures({ loading, fixtures, flags, teams, tour, mode, allMatches }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [pageNumberLimit] = useState(5);
    const [maximumPageNumberLimit, setMaximumPageNumberLimit] = useState(5);
    const [minimumPageNumberLimit, setMinimumPageNumberLimit] = useState(0);
    let pages, currentItems, renderPageNumbers;
    
    useEffect(() => {
        setCurrentPage(1);
        if (mode === 'Live') {
            pages = [];
            for (let i = 1; i <= Math.ceil(fixtures.length / itemsPerPage); i++) {
                pages.push(i);
            }
        
            const indexOfLastItem = currentPage * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            currentItems = fixtures.slice(indexOfFirstItem, indexOfLastItem);
        } else {
            pages = [];
            for (let i = 1; i <= Math.ceil(allMatches.length / itemsPerPage); i++) {
                pages.push(i);
            }
        
            const indexOfLastItem = currentPage * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            currentItems = allMatches.slice(indexOfFirstItem, indexOfLastItem);
        }
        
        renderPageNumbers = pages.map((number) => {
            if (number < maximumPageNumberLimit + 1 && number > minimumPageNumberLimit) {
                return (
                    <li
                        key={number}
                        id={number}
                        className={currentPage === number ? 'active' : 'notActive'}
                        onClick={handleClick}
                    >
                        {number}
                    </li>
                );
            } else {
                return null;
            }
        });
    }, [mode]);

    const handlePrevBtn = () => {
        setCurrentPage(currentPage - 1);
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaximumPageNumberLimit(maximumPageNumberLimit - pageNumberLimit);
            setMinimumPageNumberLimit(minimumPageNumberLimit - pageNumberLimit);
        }
    };

    const handleNextBtn = () => {
        setCurrentPage(currentPage + 1);
        if (currentPage + 1 > maximumPageNumberLimit) {
            setMaximumPageNumberLimit(maximumPageNumberLimit + pageNumberLimit);
            setMinimumPageNumberLimit(minimumPageNumberLimit + pageNumberLimit);
        }
    };

    function getFlags(name) {
        let ans = '';
        for (let i = 0; i < flags.length; i++) {
            const str = name;
            if (str.indexOf(flags[i].name.common) !== -1) {
                ans = flags[i].flags[0];
            }
            if (ans !== '') {
                break;
            }
        }
        if (ans === '') {
            for (let i = 0; i < flags.length; i++) {
                const str = name;
                if (str.indexOf(flags[i].name.official) !== -1) {
                    ans = flags[i].flags[0];
                }
                if (ans !== '') {
                    break;
                }
            }
        }
        return ans;
    }

    function getTeams(name, shortName) {
        let ans = '';
        for (let i = 0; i < teams.length; i++) {
            const str = teams[i].name;
            if (str !== null && str.indexOf(name) !== -1) {
                ans = teams[i].crest;
            }
            if (ans !== '') {
                break;
            }
        }
        if (ans === '') {
            for (let i = 0; i < teams.length; i++) {
                const str = teams[i].shortName;
                if (str !== null && str.indexOf(shortName) !== -1) {
                    ans = teams[i].crest;
                    break;
                }
            }
        }
        return ans;
    }

    function getTour(name) {
        let ans = '';
        for (let i = 0; i < tour.competitions.length; i++) {
            const str = tour.competitions[i].name;
            if (str.indexOf(name) !== -1) {
                ans = tour.competitions[i].emblem;
            }
        }
        return ans;
    }

    if (fixtures.length === 0) {
        return <h1 style={{ margin: 'auto' }}>No live matches now!!!</h1>;
    }

    if (loading) {
        return <div className='loader'></div>;
    }

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };



    return (
        <div className='container1'>
            {currentItems.map((match, index) => (
                <div className='matchPanel' key={index}>
                    <div className='topContainer'>
                        <div className='topContainerLeft'>
                            <h4>{match.tournament.category.name}</h4>
                            <img
                                src={getFlags(match.tournament.category.name)}
                                className='countryFlag'
                                alt={match.tournament.category.name}
                            />
                        </div>
                        <div className='topContainerRight'>
                            <h4>{match.tournament.name}</h4>
                            <img
                                src={getTour(match.tournament.name)}
                                alt={match.tournament.name}
                                style={{ width: '50px', height: '40px', marginLeft: '0.5rem' }}
                            />
                        </div>
                    </div>
                    <div className='middleContainer'>
                        <div className='middleContainerLeft'>
                            <p>H</p>
                            <h3>{match.homeTeam.name}</h3>
                            <img
                                src={getTeams(match.homeTeam.name, match.homeTeam.shortName)}
                                alt={match.homeTeam.name}
                                style={{ width: '3rem' }}
                            />
                        </div>
                        <div className='middleContainerCenter'>
                            <div className='midddleContainerCenterTop'>
                                <h2>{match.homeScore.current}</h2>
                                <p>-</p>
                                <h2>{match.awayScore.current}</h2>
                            </div>
                            <div className='middleContainerCenterBottom'>
                                <h5>{match.status.description}</h5>
                                <h6>{match.status.type}</h6>
                            </div>
                        </div>
                        <div className='middleContainerRight'>
                            <img
                                src={getTeams(match.awayTeam.name, match.awayTeam.shortName)}
                                alt={match.awayTeam.name}
                                style={{ width: '3rem' }}
                            />
                            <h3>{match.awayTeam.name}</h3>
                            <p>A</p>
                        </div>
                    </div>
                </div>
            ))}
            <ul className='pageNumbersList'>
                <button
                    onClick={handlePrevBtn}
                    disabled={currentPage === pages[0] ? true : false}
                    className={currentPage === pages[0] ? 'prevBtnDisabled' : 'prevBtn'}
                >
                    Prev
                </button>
                {renderPageNumbers}
                <button
                    onClick={handleNextBtn}
                    disabled={currentPage === pages[pages.length - 1] ? true : false}
                    className={currentPage === pages[pages.length - 1] ? 'nextBtnDisabled' : 'nextBtn'}
                >
                    Next
                </button>
                <div className='pageDisplay'>Page {currentPage} of {pages.length}</div>
            </ul>
        </div>
    )
}

export default Fixtures;