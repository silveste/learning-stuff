import React, { Component } from 'react';
import RecipeList from './RecipeList';
import RecipeInput from './RecipeInput';
import Navbar from './Navbar';
import './RecipeApp.css';

class RecipeApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [
        {
          id: 0,
          title: 'Lorem ipsum',
          instructions: 'dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. ',
          ingredients: ['officia deserunt ','mollit anim id','est laborum.'],
          img: 'spaghetti.jpg'
        },
        {
          id: 1,
          title: 'officia deserunt',
          instructions: 'Lorem ipsum dolor, consectetur adipisicing elit, sed do incididunt ut labore et. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui  mollit anim id est laborum.',
          ingredients: ['sit amet','eiusmod tempor','dolore magna aliqua'],
          img: 'milkshake.jpg'
        },
        {
          id: 2,
          title: 'Duis aute irure',
          instructions: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Dolor in reprehenderit in voluptate velit esse cillum dolore eu. Excepteur sint occaecat, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          ingredients: ['cupidatat non proident','commodo consequat','fugiat nulla pariatur'],
          img: 'avocado_toast.jpg'
        }
      ],
      nextId: 3,
      showForm: false
    };

    this.handleSave = this.handleSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  handleSave(recipe){
    this.setState((prevState, props) => {
      const newRecipe = {...recipe, id: this.state.nextId};
      return {
        nextId: prevState.nextId + 1,
        showForm: false,
        recipes: [...this.state.recipes, newRecipe]
      };
    });
  }

  onDelete(id){
    const recipes = this.state.recipes.filter( (val) => val.id !== id);
    this.setState({recipes});

  }

  render() {
    const {showForm} = this.state;
    return (
      <div className="App">
        <Navbar onNewRecipeClicked={ () => this.setState({showForm: true})} />
        { showForm ?
          <RecipeInput
            onClose={ () => this.setState({showForm: false})}
            onSave={this.handleSave}
          /> :
          null }
        <RecipeList onDelete={this.onDelete} recipes={this.state.recipes}/>
      </div>
    );
  }
}

export default RecipeApp;
