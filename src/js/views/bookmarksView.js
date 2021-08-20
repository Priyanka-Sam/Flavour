import View from './view.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2
import previewView from './previewView.js';

class BookmarksView extends View{

    _parentElement = document.querySelector('.bookmarks')
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it 😇' 
    
    addHandlerRender(handler)
    {
        window.addEventListener('load',handler)
    }

    generateMarkup()
    {    return this._data.map(bookmark => previewView.render(bookmark,false)).join('')   }


}


export default new BookmarksView