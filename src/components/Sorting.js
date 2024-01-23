import {
    sortingEl,
    sortingBtnRecentEl,
    sortingBtnRelevantEl,
} from '../common.js';

const clickHandler = event => {
    const clickedButtonEl = event.target.closest('.sorting__button'); 
    if (!clickedButtonEl) return; 

    const recent = clickedButtonEl.className.includes('--recent') ? true : false;

    //sort job items
    if (recent) {
        
    } else {

    }
};

sortingEl.addEventListener('click', clickHandler);