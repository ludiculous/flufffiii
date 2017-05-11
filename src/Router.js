import React from 'react';
import {Scene,Router,Actions} from 'react-native-router-flux';
import PetsList from './components/PetsList.js';

const RouterComponent = () =>{
  return (
        <Router sceneStyle={{paddingTop:65}}>

            <Scene key="main">
                <Scene
                  key="petsList"
                    component={PetsList}
                    title="Pets"
                  initial/>
                </Scene>


        </Router>
  )
};

export default RouterComponent;
