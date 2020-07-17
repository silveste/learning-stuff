import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions';
import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {
    personAddedHandler = () => {
        const newPerson = {
            id: Math.random(), // not really unique but good enough here!
            name: 'Max',
            age: Math.floor( Math.random() * 40 )
        }
        this.props.storePerson(newPerson);
    }

    render () {
        return (
            <div>
                <AddPerson personAdded={this.personAddedHandler} />
                {this.props.persons.map(person => (
                    <Person
                        key={person.id}
                        name={person.name}
                        age={person.age}
                        clicked={() => this.props.personDeletedHandler(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = reduxState => {
  return {
    persons: reduxState.persons
  }
}

const mapDispatchToProps = dispatch => {
  return {
    personDeletedHandler: (id) => dispatch({type: actionTypes.DELETE_PERSON, payload: id}),
    storePerson: (personData) => dispatch({type: actionTypes.SAVE_PERSON, payload: personData})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Persons);
