import React, {Component} from 'react';
import Recipe from './Recipe';
import PropTypes from 'prop-types';
import './RecipeList.css';

class RecipeList extends Component {
  static defaultProps = {
    recipes: [
      {
        title: 'Lorem ipsum',
        instructions: 'dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. ',
        ingredients: ['officia deserunt ','mollit anim id','est laborum.'],
        img: 'spaghetti.jpg'
      },
      {
        title: 'officia deserunt',
        instructions: 'Lorem ipsum dolor, consectetur adipisicing elit, sed do incididunt ut labore et. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui  mollit anim id est laborum.',
        ingredients: ['sit amet','eiusmod tempor','dolore magna aliqua'],
        img: 'milkshake.jpg'
      },
      {
        title: 'Duis aute irure',
        instructions: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Dolor in reprehenderit in voluptate velit esse cillum dolore eu. Excepteur sint occaecat, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        ingredients: ['cupidatat non proident','commodo consequat','fugiat nulla pariatur'],
        img: 'avocado_toast.jpg'
      }
    ]
  }

  static propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render() {
    const recipes = this.props.recipes.map((val, i) =>(
      <Recipe key={i} {...val} />
    ));
    return (
      <div className="recipe-list">
       {recipes}
      </div>
    );
  }
}

export default RecipeList;
