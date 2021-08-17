// import icons from '../img/icons.svg'//parcel one
// import icons from 'url:../img/icons.svg'; // Parcel 2import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as model from  './model.js'
import recipeView from './views/recipeView.js'

const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function()
{
  try{
const id = window.location.hash.slice(1)
console.log(id)
if(!id) return;
    recipeView.renderSpinner()


//STep 1 - loading recipe 

await model.loadRecipe(id)

// Step 2 - show Recipe
recipeView.renderRecipe(model.state.recipe)
}
  catch(err){
console.log(`${err}💣💣💣💣💣💣💣`)
  }
}

const events = ['hashchange','load']
events.forEach(event => window.addEventListener(event,controlRecipes));
