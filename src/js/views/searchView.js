class SearchView{

    #parentElement = document.querySelector('.search')
    #errorMessage = 'We could not find that recipe. Please try another one  🙂 '
    #successMessage = ''

 //get query params from the search field   
 getQuery()
 {
     const query = this.#parentElement.querySelector('.search__field').value
     this.#clearInput()
     return query
 }

//clear the search field after getting query  
 #clearInput()
 {
    this.#parentElement.querySelector('.search__field').value=''
 }

 // connecting controller method to event listeners in view
 addHandlerSearch(handler)
 {
     this.#parentElement.addEventListener('submit',function(e)
     {
         e.preventDefault()
         handler();
     })
 }

}

export default new SearchView()
