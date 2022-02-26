import React, {Component} from 'react'
import {View,TouchableOpacity,StyleSheet} from 'react-native';

export default class ShadowBox extends Component {
	constructor (props) {
		super(props)
	}

  getIOSBox() {
      let style = StyleSheet.flatten([styles.shadowBox, this.props.style]);
      if(this.props.onPress || this.props.onPressIn || this.props.onPressOut || this.props.onLongPress) {
          return <TouchableOpacity style={style} 
                  onPress={this.props.onPress} 
                  onLongPress={this.props.onLongPress}
                  onPressIn={this.props.onPressIn}
                  onPressOut={this.props.onPressOut}
                  activeOpacity={this.props.activeOpacity} 
                  disabled={this.props.disabled}>
              {this.props.children}
          </TouchableOpacity>
      } else {
          return <View style={style}>{this.props.children}</View>
      }
  }
	render(){
      return this.getIOSBox();
  }
}
const styles = StyleSheet.create({
    shadowBox:{backgroundColor: '#fff',shadowColor: '#DEDEDE',shadowOffset: {width:0, height:0},shadowOpacity: 1, shadowRadius: 4}
})