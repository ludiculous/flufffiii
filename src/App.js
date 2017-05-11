import React, {Component} from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reducers from './reducers';
import Firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import Router from './Router';

class App extends Component {
    componentWillMount(){
    }


    render(){
        const store = createStore(reducers,{},applyMiddleware(ReduxThunk));

        return(
            <Provider store={store}>
                <Router />
             </Provider>
    )
    }

}

export default App;
