import {
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    BASE_API_URL,
} from '../common.js';

import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';

const submitHandler = event => {
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

    //render spinner 
    renderSpinner('search');

    //fetch search results 
    fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
        .then(response => {
            if (!response.ok) { //4xx, 5xx status code
                throw new Error('Resource issue (e.g. resource doesn\'t exist ) or server issue');
            }
            return response.json();
        })
        .then(data => {
            //extract job items
            const { jobItems } = data;

            renderSpinner('search');

            numberEl.textContent = jobItems.length;

            renderJobList(jobItems);
            
            jobListSearchEl.addEventListener('click', (e) => {
                e.preventDefault();
            })  
        })
        .catch(error => { // network problem or other errors (e.g. trying to parse something not JSON as JSON)
            renderSpinner('search');
            renderError(error.message);
        });

};

searchFormEl.addEventListener('submit', submitHandler);