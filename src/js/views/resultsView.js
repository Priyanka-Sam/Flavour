import View from './view.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2


class ResultsView extends View{

    _parentElement = document.querySelector('.results')

    generateMarkup()
    {
        return this._data.map(this.generateMarkupPreview).join('');

    }
   
    generateMarkupPreview(recipe)
    {    
         return `
    <li class="preview">
    <a class="preview__link" href="#23456">
    <figure class="preview__fig">
        <img src="${recipe.image}" alt="${recipe.title}" />
    </figure>
    <div class="preview__data">
        <h4 class="preview__title">${recipe.title}</h4>
        <p class="preview__publisher">${recipe.publisher}</p>
       
    </div>
    </a>
</li>
`

 // <div class="preview__user-generated">
        // <svg>
        //     <use href="${icons}#icon-user"></use>
        // </svg>
        // </div>
    }

}


export default new ResultsView