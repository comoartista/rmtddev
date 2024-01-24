import {
    BASE_API_URL,
    state,
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    sortingBtnRecentEl,
    sortingBtnRelevantEl,
    getData,
} from '../common.js';

import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';
import renderPaginationButtons from './Pagination.js';

const submitHandler = async event => {
    event.preventDefault();
    const searchText = searchInputEl.value;

    //validation 
    const forbiddenPattern = /[0-9]/
    const patternMatch = forbiddenPattern.test(searchText)
    if(patternMatch) {
        renderError('Your search may not contain numbers');
        return;
    }

    //blur input
    searchInputEl.blur();

    //remove previous job items
    jobListSearchEl.innerHTML = '';

    sortingBtnRecentEl.classList.remove('sorting__button--active');
    sortingBtnRelevantEl.classList.add('sorting__button--active');

    //render spinner 
    renderSpinner('search');

    try { 
        //fetch search results 
        const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

        //extract job item
        const { jobItems } = data;

        //update state
        state.searchJobItems = jobItems;
        state.currentPage = 1;

        renderSpinner('search');

        numberEl.textContent = jobItems.length;

        renderPaginationButtons();

        renderJobList();
        
    } catch (error) {
        renderSpinner('search');
        renderError(error.message);
    }

    // fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
    //     .then(response => {
    //         if (!response.ok) { //4xx, 5xx status code
    //             throw new Error('Resource issue (e.g. resource doesn\'t exist ) or server issue');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {

    //         //extract job items
    //         const { jobItems } = data;

    //         renderSpinner('search');

    //         numberEl.textContent = jobItems.length;

    //         renderJobList(jobItems);
            
    //         jobListSearchEl.addEventListener('click', (e) => {
    //             e.preventDefault();
    //         })  
    //     })
    //     .catch(error => { // network problem or other errors (e.g. trying to parse something not JSON as JSON)
    //         renderSpinner('search');
    //         renderError(error.message);
    //     });
};

searchFormEl.addEventListener('submit', submitHandler);