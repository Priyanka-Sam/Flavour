import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View 
{
    _data
    _errorMessage = 'No recipes found for your query. Please try another one  🙂 '
    _successMessage = ''
  
    render(data)
    {
        if(!data || (Array.isArray(data) && data.length===0 )) return this.renderError()
      //setting variable so that it can be accessed throughout the class
       this._data=data
       const markup =this.generateMarkup()
       this.clear()
       this._parentElement.insertAdjacentHTML('afterbegin',markup)
    }

    //clearing the parent element
    clear()
    {
     this._parentElement.innerHTML = '';     }

     renderSpinner ()
     {
       const markup = ` <div class="spinner">
       <svg>
         <use href="${icons}#icon-loader"></use>
       </svg>
     </div>`
     this.clear()
     this._parentElement.insertAdjacentHTML('afterbegin',markup)
     }
     
     //rendering success message in the parent element
     renderMessage(message = this._successMessage)
     {
     const markup = `<div class="recipe">
     <div class="message">
       <div>
         <svg>
           <use href="src/img/icons.svg#icon-smile"></use>
         </svg>
       </div>
       <p>${message}</p>
     </div>`
     this.clear()
     this._parentElement.insertAdjacentHTML('afterbegin',markup)
     }
     
     //rendering error message in the parent element
     renderError(message = this._errorMessage)
     {
     const markup = `<div class="error">
     <div>
       <svg>
         <use href="${icons}#icon-alert-triangle"></use>
       </svg>
     </div>
     <p>${message}</p>
     </div>`
     this.clear()
     this._parentElement.insertAdjacentHTML('afterbegin',markup)
     }
     
}