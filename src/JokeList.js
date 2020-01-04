import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./Jokelist.css";

class JokeList extends Component {
  static defaultProps = {
    numOfJoke: 10,
    baseUrl: `https://icanhazdadjoke.com`
  };

  constructor(props) {
    super(props);

    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("jokes")) || [],
      isLoading: false
    };
    this.seenJokes = new Set(this.state.jokes.map(j => j.id));
    console.log(this.seenJokes);
  }

  async componentDidMount() {
    return !this.state.jokes.length ? this.getJokes() : "";
  }

  getJokes = async () => {
    try {
      let jokes = [];
      while (jokes.length < this.props.numOfJoke) {
        let res = await axios.get(this.props.baseUrl, {
          headers: { Accept: "application/json" }
        });

        const isUnique = this.seenJokes.has(res.data.id);
        console.log(isUnique);
        if (!isUnique) {
          jokes.push({ id: res.data.id, text: res.data.joke, votes: 0 });
          this.seenJokes.add(res.data.id);
        } else {
          console.log("FOUND A DUPLICATE");
          console.log(res.data.id);
        }
      }
      this.setState(
        st => ({
          isLoading: false,
          jokes: [...st.jokes, ...jokes]
        }),
        () =>
          window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
      );
    } catch (error) {
      alert(error);
      this.setState({ isLoading: false });
    }
  };

  handleVotes = (id, delta) => {
    this.setState(
      st => ({
        jokes: st.jokes.map(joke =>
          joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
        )
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  };

  handleClick = () => {
    this.setState({ isLoading: true }, this.getJokes);
  };

  render() {
    const jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);

    return this.state.isLoading ? (
      <div>
        <div>
          <i className="far fa-8x fa-laugh fa-spin" />
          <h1 className="joke-list-title">Loading...</h1>
        </div>
      </div>
    ) : (
      <div className="joke-list">
        <div className="joke-list-sidebar">
          <h1 className="joke-list-title">
            Dad <span>Jokes</span>
          </h1>
          <span className="ec ec-joy"></span>
          <button className="joke-list-getmore" onClick={this.handleClick}>
            Fetch Jokes
          </button>
        </div>
        <div className="joke-list-jokes">
          {jokes.map(c => (
            <Joke
              votes={c.votes}
              key={c.id}
              text={c.text}
              upvote={() => this.handleVotes(c.id, 1)}
              downvote={() => this.handleVotes(c.id, -1)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
