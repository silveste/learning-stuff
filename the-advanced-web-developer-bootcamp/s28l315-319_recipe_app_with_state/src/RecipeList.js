import React, {Component} from 'react';
import Recipe from './Recipe';
import PropTypes from 'prop-types';
import './RecipeList.css';

class RecipeList extends Component {

  static propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired
  }

  render() {
    const onDelete = this.props.onDelete;
    const recipes = this.props.recipes.map((val) =>(
      <Recipe onDelete={onDelete} key={val.id} {...val} />
    ));
    return (
      <div className="recipe-list">
        {recipes}
      </div>
    );
  }
}

export default RecipeList;
