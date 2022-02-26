import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import {requireNativeComponent,View,} from 'react-native';

var iface = {
  name: 'RNShadowView',
  propTypes: {
    shadowOption:PropTypes.object,
    ...View.propTypes // include the default view properties
  }
};

const RNShadowView = requireNativeComponent('RNShadowView', iface);

export default class ShadowBox extends Component {
  constructor(props) {
    super(props);

    const style = props.style || {};
      const width = typeof(style.width)==='number' ? Math.floor(style.width) : 0;
      const height = typeof(style.height)==='number' ? Math.floor(style.height) : 0;
      this.state = {
          width,height
      }

    this._onLayout = this.onLayout.bind(this);
  }

  onLayout(e) {
    const height = Math.floor(e.nativeEvent.layout.height) || this.state.height;
    const width = Math.floor(e.nativeEvent.layout.width) || this.state.weight;
    if(height == this.state.height && width == this.state.width) return;
    this.setState({width, height});
  }

  getShadowOption(style={}) {
    let option = {
      borderRadius:style.borderRadius||2,
      shadowRadius:style.shadowRadius*1 || 10,
      backgroundColor:'#00000000',
      shadowColor:style.shadowColor || '#EFEFEF',
      offsetX:styles.shadowOffset?.width||0,
      offsetY:styles.shadowOffset?.height||0,
    };
    return option;
}

getShadow() {
  if(!this.state.width || !this.state.height) return null;

  let shadowOption = this.getShadowOption(style);
  const shadowRadius = shadowOption.shadowRadius;
  const offsetX = shadowOption.offsetX;
  const offsetY = shadowOption.offsetY;
  let shadowStyle = {width:this.state.width+shadowRadius*2,height:this.state.height+shadowRadius*2,position:'absolute',left:-shadowRadius+offsetX,top:-shadowRadius+offsetY};
  if(this.props.shadowImage) {
    return <Image source={this.props.shadowImage} style={shadowStyle} resizeMode={'contain'}  key={'shadow-box-shadow-image'} fadeDuration={0}/>
  }

  return <RNShadowView shadowOption={shadowOption} style={shadowStyle} key={`shadow-box-shadow-view`}/>;
}

getAndroidBox() {
    let style = StyleSheet.flatten([styles.shadowBox, StyleSheet.flatten(this.props.style), {overflow:'visible'}]);

    if(this.props.onPress || this.props.onPressIn || this.props.onPressOut || this.props.onLongPress) {
        return <TouchableOpacity style={style} onLayout={this._onLayout}
                    onPress={this.props.onPress} 
                    onPressIn={this.props.onPressIn}
                    onPressOut={this.props.onPressOut}
                    onLongPress={this.props.onLongPress}
                    activeOpacity={this.props.activeOpacity} 
                    disabled={this.props.disabled}>
            {this.getShadow()}
            {this.props.children}
        </TouchableOpacity>
    } else {
        return <View style={style} onLayout={this._onLayout}>
          {this.getShadow()}
          {this.props.children}
          </View>;
    }
  }
  render() {
      return this.getAndroidBox();
  }
}

const styles = StyleSheet.create({
  shadowBox:{backgroundColor: '#fff',shadowColor: '#DEDEDE',shadowOffset: {width:0, height:0},shadowOpacity: 1, shadowRadius: 4}
})
