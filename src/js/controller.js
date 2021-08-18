// import icons from '../img/icons.svg'//parcel one
// import icons from 'url:../img/icons.svg'; // Parcel 2import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as model from  './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'


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

// Step 2 - show Recipe
recipeView.renderRecipe(model.state.recipe)

//Step 3 Render Results
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

    //1) get search query
    const query = searchView.getQuery()
    console.log(query)
    if(!query) return;

    // 2) Load search Results
  await model.loadSearchResult(query)

    //3 Render results

  // console.log(model.state.search.results)
  }
  catch(err)
  {
console.log(err)
  }
}

//init function for publisher-subscriber relation between controller and view
const init= function()
{
  recipeView.addHandlerRender(controlRecipes)
  searchView.addHandlerSearch(controlSearchResults)
}

init()