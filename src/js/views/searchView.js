import View from './view.js';
class SearchView extends View{

    _parentElement = document.querySelector('.search')
    _errorMessage = 'We could not find that recipe. Please try another one  🙂 '
    _successMessage = ''

 //get query params from the search field   
 getQuery()
 {
     const query = this._parentElement.querySelector('.search__field').value
     this.clearInput()
     return query
 }

//clear the search field after getting query  
 clearInput()
 {
    this._parentElement.querySelector('.search__field').value=''
 }

 // connecting controller method to event listeners in view
 addHandlerSearch(handler)
 {
     this._parentElement.addEventListener('submit',function(e)
     {
         e.preventDefault()
         handler();
     })
 }

}

export default new SearchView()
