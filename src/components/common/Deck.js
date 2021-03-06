import React, {Component} from 'react';
import {View, Animated,PanResponder, Dimensions, LayoutAnimation, UIManager} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;


class Deck extends Component{

static defaultProps = {
  onSwipeRight: ()=>{},
  onSwipeLeft: () =>{}
}

constructor(props){
  super(props);
  const position = new Animated.ValueXY();


  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder:() => true,
    onPanResponderRelease: (e, gestureState) => {
      if(gestureState.dx>SWIPE_THRESHOLD){
        this.forceSwipe('left');
      }
      else if(gestureState.dx < -SWIPE_THRESHOLD){
        this.forceSwipe('right');
      }
      else{
          this.resetPosition();
      }

      console.log(gestureState)
    },
    onPanResponderMove: (e, gestureState) => {
      console.log(gestureState)
      position.setValue({x:gestureState.dx, y:gestureState.dy})
    }
  });

  this.state = {panResponder,position, index:0};
}

componentWillReceiveProps(nextProps){
  if(nextProps.data !== this.props.data){
    this.setState({index:0})
  }
}

componentWillUpdate(){
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
  LayoutAnimation.spring();
}

forceSwipe(direction){
  let x = direction === 'right'? SCREEN_WIDTH : -SCREEN_WIDTH;

  Animated.timing(this.state.position,{
    toValue:{x:x, y:0},
    duration: SWIPE_OUT_DURATION
  }).start(()=>this.onSwipeComplete(direction));
}

onSwipeComplete(direction){
    const {onSwipeLeft, onSwipeRight,data} = this.props;
    //pass in data from deck
    const item = data[this.state.index];
  direction === 'right' ? onSwipeRight(item):onSwipeLeft(item);
  this.state.position.setValue({x:0 ,y:0});
  this.setState({ index:this.state.index +1 });

}

resetPosition(){
  Animated.spring(this.state.position, {
    toValue: {x:0,y:0}
  }).start()
}


getCardStyle(){
  const {position} = this.state;
  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH * 1.5,0,SCREEN_WIDTH * 1.5] ,
    outputRange: ['-120deg', '0deg','120deg']
  })

  return {
    ...this.state.position.getLayout(),
    transform:[{
      rotate
    }]
  };
}



renderCards(){
  if(this.state.index >= this.props.data.length);

  return this.props.data.map((item,i)=>{
    if(i<this.state.index){
      return null;
    }
    //only animate first card on screen
    if(i ===this.state.index){
      return(
        <Animated.View
        key={item.id}
        style={[this.getCardStyle(),styles.cardStyle]}
        {...this.state.panResponder.panHandlers}
        >
        {this.props.renderCard(item)}
        </Animated.View>
      );
    }

    return(
      <Animated.View
      key={item.id}
      style={
        [styles.cardStyle,
        {top:10 * (i-this.state.index)}]
      }

      >
      {this.props.renderCard(item)}
      </Animated.View>
    )
  } ).reverse();
}

  render(){
    return(
      <View >
        {this.renderCards( )}
      </View >
    )
  }
}


const styles = {
  cardStyle:{
    position:'absolute',
    width: SCREEN_WIDTH

  }
}

export default Deck;
