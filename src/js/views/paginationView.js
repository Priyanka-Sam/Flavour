import View from './view.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View{

    _parentElement = document.querySelector('.pagination')

    addHandlerClick(handler)
    {
        this._parentElement.addEventListener('click',function(e){
        const btn = e.target.closest('.btn--inline')
        if(!btn) return
        const goToPage=+btn.dataset.goto;
        // console.log(goToPage)
        handler(goToPage)
        })
    }

generateMarkup()
{
    const currPage = this._data.page
    const numPages= Math.ceil(this._data.result.length/ this._data.resultsPerPage)
    // console.log(numPages)
    // console.log(currPage)

    //Page 1 
if(currPage===1 && numPages>1)
{
    return `<button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
    <span>Page ${currPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`
}


    //Last Page
    if(currPage===numPages&& numPages>1)
    {
        return `<button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage -1}</span>
      </button>`
    }

    //Other Page
    if(currPage < numPages)
    {
        return `<button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
      </button>
      <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button> `
    }

    return ''
}
}


{/* <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page 1</span>
          </button>
          <button class="btn--inline pagination__btn--next">
            <span>Page 3</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>  */}



export default new PaginationView()