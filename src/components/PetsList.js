import React,{Component} from 'react';
import {View,Text,Image,ListView,Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {fetchPetsList} from '../actions';
import Deck from './common/Deck.js'
import { Card, Button } from 'react-native-elements';

import _ from 'lodash';

const PetsState = {};

class PetsList extends Component{


  componentWillMount(){
        this.props.fetchPetsList();
  }

  renderCard(item){
    return(
      <Card
        key={item}
        title={item}
        image = {{uri:item}}
      >
  <Text>
  Lorem Ipsum is always a fun way to dress up your blocks.
  </Text>
    </Card>
  );
  }

/*
    transformList(){
        const PetsArray = this.props.PetsList

        _.map(PetsArray,(item,key)=>{
            PetsState[key] = item
        });

    }


    createDataSource(){
        const ds = new ListView.DataSource({
            rowHasChanged: (r1,r2) => r1 !==r2
        });
        console.log(PetsState);
        this.dataSource = ds.cloneWithRows(PetsState)
    }

    renderRow(pet){
        return (

                <Image source={{uri:pet}}  style={imageStyle}/>

        )
    }
    this.transformList();
    this.createDataSource();
    */

      render(){


        return(

            <View>
            <Deck
               data={this.props.PetsList}
              renderCard={this.renderCard}
              onSwipeRight={()=>console.log('something was swipped right')}
              onSwipeRight={()=>console.log('something was swipped left')}
            />
        
           </View>
        )
      }
}


const {height, width} = Dimensions.get('window');

const styles = {
    imageWrapperStyle:{

    },
    imageStyle:{
     flex:1,
     resizeMode:'cover',
        width: width,
        height: height,
    },
    imageDetailStyle:{

    }
};

const {imageStyle} = styles;

const mapStateToProps = (state)=>{


    return{
        PetsList:state.PetsList.pets
    }
};

export default connect(mapStateToProps,{fetchPetsList})(PetsList);
