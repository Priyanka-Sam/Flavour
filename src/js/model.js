import {async} from 'regenerator-runtime'
import {API_URL,RES_PER_PAGE} from './config.js'
import {getJson} from './helper.js'
import resultsView from './views/resultsView.js'

//state object for storing different recipes, query results
export const state = {
    recipe:{},
    search:{
      query:'',
      result:[],
      resultsPerPage:RES_PER_PAGE,
      page:1,
    }
}

//loading recipe by id
export const loadRecipe = async function(id){
  try { 

    //getting data from the api call
const data = await getJson(`${API_URL}/${id}`)
const {recipe}= data.data

//storing data in object
state.recipe ={
  id:recipe.id,
  title :recipe.title,
  publisher :recipe.publisher,
  sourceUrl :recipe.sourceUrl,
  image:recipe.image_url,
  servings:recipe.servings,
  cookingTime:recipe.cooking_time,
  ingredients:recipe.ingredients,
}
console.log(state.recipe)}
catch(err)
{throw err}
}

//get search results by query
export const loadSearchResult = async function(query)
{
try{

  //storing query in object
  state.search.query=query

      //getting data from the api call
    const data = await getJson(`${API_URL}?search=${query}`)

    //storing data in object
   state.search.result= data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

    // console.log(state.search.result)

}
catch(err)
{
throw err
}
}

//returning set of 10 elementsfrom query results 
//pagination
export const getSearchResultsPage = function(page=state.search.page)
{
  state.search.page= page
  const start= (page-1)* state.search.resultsPerPage //0
  const end = page*state.search.resultsPerPage       //9

  return state.search.result.slice(start,end)

}

export const updateServings = function(newServings)
{
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4
  });

  state.recipe.servings = newServings;
}