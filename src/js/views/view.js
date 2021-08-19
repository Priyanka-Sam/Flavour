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

    update(data)
    {
      // if(!data || (Array.isArray(data) && data.length===0 )) return this.renderError()
      this._data=data
      const newMarkup =this.generateMarkup()
      const newDom = document.createRange().createContextualFragment(newMarkup)
      const newElements = Array.from(newDom.querySelectorAll('*'))
      const currElements = Array.from(this._parentElement.querySelectorAll('*'))
      
      newElements.forEach((newEl,i)=>{
        const curEl =currElements[i]
        // console.log(curEl,newEl.isEqualNode(curEl))
       
        //updates changed TEXT
        if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim()!=='')
        {
          // console.log('🙂' ,newEl.firstChild.nodeValue.trim())
          curEl.textContent = newEl.textContent
        }

        // updates changed attributes
        if(!newEl.isEqualNode(curEl))
        { 
          Array.from(newEl.attributes).forEach(attr => 
            curEl.setAttribute(attr.name,attr.value)
            )
        }
       })
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