import React from 'react';
import './App.css';
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducers";
import watchFetchDog from './sagas';
import {Provider, connect} from "react-redux";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchFetchDog);
const fetchDog = () => {
  return { type: 'FETCHED_DOG' }
};
class Content extends React.Component {
  render () {
    return (
      <div>
        <button onClick={() => this.props.dispatch(fetchDog())}>Show Dog</button>
          {this.props.loading 
            ? <p>Loading...</p> 
            : this.props.error
                ? <p>Error, try again</p>
                : <p><img src={this.props.url} alt='' style={{width: 'auto', height:500}} /></p>}
      </div>
    )
  }
}

const ConnectedApp = connect((state) => {
  console.log(state);
  return state;
})(Content);


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    </div>
  );
}

export default App;
