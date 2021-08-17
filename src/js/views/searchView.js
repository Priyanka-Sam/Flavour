class SearchView{

    #parentElement = document.querySelector('.search')
    #errorMessage = 'We could not find that recipe. Please try another one  🙂 '
    #successMessage = ''

 getQuery()
 {
     const query = this.#parentElement.querySelector('.search__field').value
     this.#clearInput()
     return query
 }

 #clearInput()
 {
    this.#parentElement.querySelector('.search__field').value=''
 }

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
