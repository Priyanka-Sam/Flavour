import {async} from 'regenerator-runtime'
import {API_URL,RES_PER_PAGE,KEY} from './config.js'
// import {getJson,sendJSON} from './helper.js'
import {AJAX} from './helper.js'
import resultsView from './views/resultsView.js'

//state object for storing different recipes, query results
export const state = {
    recipe:{},
    search:{
      query:'',
      result:[],
      resultsPerPage:RES_PER_PAGE,
      page:1,
    },
    bookmarks:[]
}

  //storing data in object

const createRecipeObject = function(data)
{
  const {recipe} = data.data
return{
  id:recipe.id,
  title :recipe.title,
  publisher :recipe.publisher,
  sourceUrl :recipe.sourceUrl,
  image:recipe.image_url,
  servings:recipe.servings,
  cookingTime:recipe.cooking_time,
  ingredients:recipe.ingredients,
 ... (recipe.key && {key:recipe.key}),
}
}
//loading recipe by id
export const loadRecipe = async function(id){
  try { 

    //getting data from the api call
const data = await AJAX(`${API_URL}/${id}?key=${KEY}`)
const {recipe}= data.data

state.recipe=createRecipeObject(data)

if(state.bookmarks.some(bookmark => bookmark.id ===id))
{state.recipe.bookmarked=true;}
else
{state.recipe.bookmarked=false;}


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
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`)

    //storing data in object
   state.search.result= data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ... (rec.key && {key:rec.key})
      };
    });

    // console.log(state.search.result)
    //resetting the page to one for new searches
    state.search.page=1
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

export const addBookmark = function(recipe)
{
  //add bookmark
  state.bookmarks.push(recipe)

  //mark current recipe as bookmark
  if(recipe.id === state.recipe.id)
  state.recipe.bookmarked=true;

  persistBookmarks()
}

export const deleteBookmark = function(id)
{
  //find index bookmark
  const index = state.bookmarks.findIndex(el => el.id ===id)
  //remove from array
  state.bookmarks.splice(index,1)

  //mark current recipe as NOT bookmark
  if(id === state.recipe.id)
  state.recipe.bookmarked=false;

  persistBookmarks()
}

const persistBookmarks = function()
{
localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks))
}

export const uploadRecipe = async function(newRecipe)
{
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient fromat! Please use the correct format :)'
          );

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

 
console.log(ingredients)

const recipe = {
  title: newRecipe.title,
  source_url: newRecipe.sourceUrl,
  image_url: newRecipe.image,
  publisher: newRecipe.publisher,
  cooking_time: +newRecipe.cookingTime,
  servings: +newRecipe.servings,
  ingredients,
};

  const data = await AJAX(`${API_URL}?key=${KEY}`,recipe)
state.recipe = createRecipeObject(data)
addBookmark(state.recipe)


}
  catch(err)
  {
   throw err 
  } 


}
const init=function()
{
const storage = localStorage.getItem('bookmarks')
if(storage){
  state.bookmarks = JSON.parse(storage)
}
}

init()
