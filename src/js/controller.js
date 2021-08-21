// import icons from '../img/icons.svg'//parcel one
// import icons from 'url:../img/icons.svg'; // Parcel 2import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as model from  './model.js'
import { MODEL_SEC } from './config.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import bookmarksView from './views/bookmarksView.js'
import paginationView from './views/paginationView.js'
import addRecipeView from './views/addRecipeView.js'

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
//Step 0 Update results view to mark selected search result
resultsView.update(model.getSearchResultsPage())
//STep 1 - loading recipe 
await model.loadRecipe(id)

//Step 2 Render Results
recipeView.render(model.state.recipe)

//Step 3 Update bookmark
bookmarksView.update(model.state.bookmarks)

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
  recipeView.update(model.state.recipe)

}
const controlAddBookmark = function()
{
  //1) add/remove bookmark
  if(!model.state.recipe.bookmarked)
  {model.addBookmark(model.state.recipe)}
  else
  {
    model.deleteBookmark(model.state.recipe.id)
  }

  console.log(model.state.recipe)
  //2) update recipe view
  recipeView.update(model.state.recipe)

  //3) Renderbookmarks list
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function()
{
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function(newRecipe)
{//upload new recipe data
  // console.log(newRecipe)
  try{
//recnder spinner
addRecipeView.renderSpinner()

    await model.uploadRecipe(newRecipe);  
    console.log(model.state.recipe)

    //render recipe
 recipeView.render(model.state.recipe)


//success message
addRecipeView.renderMessage()

//render bookmark view
bookmarksView.render(model.state.bookmarks)


//change id in the url
window.history.pushState(null,'',`#${model.state.recipe.id}`)

 //close form window
 setTimeout(function()
 {
   addRecipeView.toggleWindow()
 }, MODEL_SEC*1000)
  
}
  catch(err)
  {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
}
//init function for publisher-subscriber relation between controller and view
const init= function()
{
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe)
}

init()

