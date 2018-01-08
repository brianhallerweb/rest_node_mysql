import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogName: "",
      dogs: [],
      dog: [],
      updatedName: ""
    };
  }

  componentDidMount() {
    fetch("/dognames")
      .then(response => response.json())
      .then(dogs => this.setState({ dogs: dogs }));
  }

  getDog = id => {
    fetch("/choosedog/" + id)
      .then(response => response.json())
      .then(dogs => this.setState({ dog: dogs[0].name }));
  };

  postDog = () => {
    fetch("/addnewdog/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.dogName
      })
    }).then(() =>
      fetch("/dognames")
        .then(response => response.json())
        .then(dogs => this.setState({ dogs: dogs }))
    );
  };

  updateDog = id => {
    fetch("/updatedog/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.updatedName
      })
    }).then(() =>
      fetch("/dognames")
        .then(response => response.json())
        .then(dogs => this.setState({ dogs: dogs }))
    );
  };

  deleteDog = id => {
    fetch("/deletedog/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() =>
      fetch("/dognames")
        .then(response => response.json())
        .then(dogs => this.setState({ dogs: dogs }))
    );
  };

  render() {
    return (
      <div>
        <header>
          <h1>REST with Node and mySQL using mySQLjs</h1>
        </header>
        <main>
          <section className="addDog">
            <h4>Add a dog to the database</h4>
            <input onChange={e => this.setState({ dogName: e.target.value })} />
            <button onClick={() => this.postDog()}>Add</button>
          </section>
          <section className="showDogs">
            <h4>Dogs in database</h4>
            <ul>
              {this.state.dogs.map(dog => {
                return <li>{dog.name}</li>;
              })}
            </ul>
          </section>
          <section className="chooseDog">
            <h4>Click to choose a dog by name</h4>
            <ul>
              {this.state.dogs.map(dog => {
                return <li onClick={() => this.getDog(dog.id)}>{dog.name}</li>;
              })}
            </ul>
          </section>
          <section className="choosenDog">
            <h4>Dog name chosen:</h4>
            <p>{this.state.dog}</p>
          </section>
          <section className="updateDog">
            <h4>Choose a dog to update</h4>
            <ul>
              {this.state.dogs.map(dog => {
                return (
                  <div>
                    <li>{dog.name}</li>
                    <input
                      onChange={e =>
                        this.setState({ updatedName: e.target.value })
                      }
                    />
                    <button onClick={() => this.updateDog(dog.id)}>
                      Update
                    </button>
                  </div>
                );
              })}
            </ul>
          </section>
          <section className="deleteDog">
            <h4>Choose a dog to delete</h4>
            <ul>
              {this.state.dogs.map(dog => {
                return (
                  <div>
                    <li>{dog.name}</li>

                    <button onClick={() => this.deleteDog(dog.id)}>
                      Delete
                    </button>
                  </div>
                );
              })}
            </ul>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
