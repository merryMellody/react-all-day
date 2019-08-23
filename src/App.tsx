import * as React from "react";
import { connect } from "react-redux";
import "./App.css";
import { RootState } from "./redux/reducers";
import { actionCreators } from "./redux/actions/counter";

interface ConnectProps {
  counter: number,
  incrementAction: any,
  delayIncrementAction: any,
}

interface State {
  isLoading: boolean,
}

type Props = {} & ConnectProps;

export class App extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: false,
    }
  }

  onIncrementClick = async () => {
    const { counter } = this.props;
    this.props.incrementAction(counter);
  }

  onDelayIncrementClick = async () => {
    this.setState({
      isLoading: true,
    });

    await this.props.delayIncrementAction();

    this.setState({
      isLoading: false
    });
  }

  render() {
    const { isLoading } = this.state;

    return (
      <>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Counter App</h1>
            </div>
          </div>
        </section>
        <section className="container">
          <div className="level">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Counter</p>
                <p className="title">{this.props.counter}</p>
                {isLoading ? <span>Loading...</span> : <></>}
              </div>
            </div>
          </div>
          {/* Challenge 5: <div className="notification is-danger" /> */}
          <div className="field is-grouped">
            <p className="control">
              <button
                className="button"
                id="increment-btn"
                onClick={this.onIncrementClick}
              >
                Click to increment
              </button>
            </p>
            <p className="control">
              <button
                className="button"
                id="delay-increment-btn"
                onClick={this.onDelayIncrementClick}
              >
                Click to increment slowly
              </button>
            </p>
            <p className="control">
              <button className="button" id="remote-fetch-btn">
                Click to fetch server-side
              </button>
            </p>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  counter: state.counter.value
});

const mapDispatchToProps = (dispatch: any) => ({
  incrementAction: (amount: number) => dispatch(actionCreators.increment(amount)),
  delayIncrementAction: (amount: number) => dispatch(actionCreators.delayIncrement(amount))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
