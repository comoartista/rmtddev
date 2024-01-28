import {
    state,
    bookmarksBtnEl,
    jobDetailsEl,
    jobListBookmarksEl
} from '../common.js';
import renderJobList from './JobList.js';

const clickHandler = event => {
    if(!event.target.className.includes('bookmark')) return;

    if(state.bookmarkJobItems.some(bookmarkJobItem => bookmarkJobItem.id === state.activeJobItem.id)) {
        state.bookmarkJobItems = state.bookmarkJobItems.filter(bookmarkJobItem => bookmarkJobItem.id !== state.activeJobItem.id)
    } else {
        state.bookmarkJobItems.push(state.activeJobItem);
    }

    //persist data with Localstorage
    localStorage.setItem('bookmarkJobItems', JSON.stringify(state.bookmarkJobItems));

    document.querySelector('.job-info__bookmark-icon').classList.toggle('.job-info__bookmark-icon--bookmarked');

    //render search job list 
    renderJobList();
};

const mouseEnterHandler = () => {
    bookmarksBtnEl.classList.add('bookmarks-btn--active');

    //make job list visible
    jobListBookmarksEl.classList.add('job-list--visible');

    //render bookmarks job list
    renderJobList('bookmarks');

};

const mouseLeaveHandler = () => {
    bookmarksBtnEl.classList.remove('bookmarks-btn--active');

    //make job list visible
    jobListBookmarksEl.classList.remove('job-list--visible');

};

jobDetailsEl.addEventListener('click', clickHandler);

bookmarksBtnEl.addEventListener('mouseenter', mouseEnterHandler);
jobListBookmarksEl.addEventListener('mouseleave', mouseLeaveHandler);