import React,{Component} from "react";
import './App.css';
import {recipes} from './tempList';
import RecipeList from "./Component/RecipeList";
import RecipeDetails from "./Component/RecipeDetails";

class App extends React.Component
{
 state=
   {
     recipes: recipes,
     url:
     "https://www.food2fork.com/api/search?key=60998f1e82cd1ae3ec00af213ab8c095&q=chicken%20breast&page=2",
     details_id:35382,
     pageIndex:1
       };
       
async getRecipes()
{
  try{
     const data=await fetch(this.state.url);
 const jsonData= await data.json();

 this.setState({
   recipes: jsonData.recipes
 });
   }
   catch(error)
   {
     console.log("error");
   }
 }
 componentDidMount()
 {
  this.getRecipes()
 }
 displayPage=(index)=>{switch(index)
{
  default:
    case 1:
      return <RecipeList recipes={this.state.recipes}
      handleDetails={this.handleDetails}
      />;
      case 0:

      return(<RecipeDetails id={this.state.details_id} handleIndex={this.handleIndex} />);
}
};
handleIndex=index=>
{this.setState({
  pageIndex:index
});
};
handleDetails= (index, id)=>{
  this.setState({
    pageIndex: index,
    details_id:id
  });
};
 render() 
  {
  return (
 <React.Fragment>
   {/* <RecipeList recipes={this.state.recipes}></RecipeList>
   <RecipeDetails id={this.state.details_id} /> */}
   {this.displayPage(this.state.pageIndex)}
   </React.Fragment>)
};
 }
 export default App;
