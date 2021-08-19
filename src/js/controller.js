// import icons from '../img/icons.svg'//parcel one
// import icons from 'url:../img/icons.svg'; // Parcel 2import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as model from  './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'

// if(module.hot)
// {
//   module.hot.accept()
// }

const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2


//getting data from model and rendering for recipes
const controlRecipes = async function()
{
  try{
const id = window.location.hash.slice(1)
if(!id) return;
    recipeView.renderSpinner()

//STep 1 - loading recipe 
await model.loadRecipe(id)

//Step 2 Render Results
recipeView.render(model.state.recipe)

}
  catch(err){
recipeView.renderError()
// recipeView.renderError(`${err}💣💣💣💣💣💣💣`)
  }
}

//getting data from model and rendering for search results
const controlSearchResults = async function()
{
  try{
    resultsView.renderSpinner()  

    //1) get search query
    const query = searchView.getQuery()
    console.log(query)
    if(!query) return;

    // 2) Load search Results
  await model.loadSearchResult(query)

    //3 Render results
// resultsView.render(model.state.search.result)
  // console.log(model.state.search.result)
  resultsView.render(model.getSearchResultsPage())

  //4 Render Pagination
  paginationView.render(model.state.search)
}
  catch(err)
  {
console.log(err)
  }
}

const controlPagination = function(goToPage){
    //1 Render results
  // resultsView.render(model.state.search.result)
  resultsView.render(model.getSearchResultsPage(goToPage))

  //2 Render Pagination
  paginationView.render(model.state.search)

}

//changing serving
const controlServings = function(newServings)
{
  //update recipe servings in state
  model.updateServings(newServings)

  //update recipe view
  recipeView.render(model.state.recipe)

}

//init function for publisher-subscriber relation between controller and view
const init= function()
{
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
}

init()

