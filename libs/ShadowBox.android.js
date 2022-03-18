import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import {requireNativeComponent,View,StyleSheet,TouchableOpacity,Image} from 'react-native';
const parseColor = require('color-parse');

var iface = {
  name: 'RNShadowView',
  propTypes: {
    shadowOption:PropTypes.object,
    ...View.propTypes // include the default view properties
  }
};

const toColorHex = (value)=>{
  let res = '';
  const regValue = Math.max(0,Math.min(255,parseInt(value)||0));
  res = parseInt(regValue).toString(16).toUpperCase();
  if(res.length < 2) res = '0'+res;
  return res;
}

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
    const factor = 1;
    const shadowRadius = (style.shadowRadius*1 || 10)*factor;
    let shadowColor = style.shadowColor || '#F0DEDEDE';
    const shadowOpacity = (parseFloat(style.shadowOpacity || 1) || 1)*factor;

    const parsed = parseColor(shadowColor);
    if(!parsed || parsed.space != 'rgb' || !parsed.values?.length) {
      shadowColor = '#80DEDEDE';
    } else {
      shadowColor = `#${toColorHex(shadowOpacity*254)}${toColorHex(parsed.values[0])}${toColorHex(parsed.values[1])}${toColorHex(parsed.values[2])}`;
    }

    let option = {
      shadowColor,
      shadowRadius,
      borderRadius:style.borderRadius,
      backgroundColor:'#000000ff',
      offsetX:(style.shadowOffset?.width||0)*factor,
      offsetY:(style.shadowOffset?.height||0)*factor,
    };
    return option;
}

getInnerStyle(style) {
    let s = Object.assign({}, style);;
    Object.assign(s, {margin:0,marginTop:0,marginBottom:0,marginLeft:0,marginRight:0,position:'relative',left:0,top:0,right:0,bottom:0,shadowRadius:0,shadowOffset:null,});
    return s;
}

getOuterStyle(style) {
    let attrs = ['margin','marginLeft','marginRight','marginTop','marginBottom','position','left','top','right','bottom','width','height'];
    let s = {overflow:'visible'};
    attrs.forEach(a=>s[a] = style[a]);
    return s;
}

getShadow(style={}) {
  if(!this.state.width || !this.state.height) return null;

  let shadowOption = this.getShadowOption(style);
  const borderRadius = shadowOption.borderRadius;
  const shadowRadius = shadowOption.shadowRadius;
  const offsetX = shadowOption.offsetX;
  const offsetY = shadowOption.offsetY;
  let shadowStyle = {
    borderWidth:0,
    borderRadius:borderRadius,
    backgroundColor:'rgba(0,0,0,0)',
    width:this.state.width+shadowRadius*2,
    height:this.state.height+shadowRadius*2,
    position:'absolute',
    left:-shadowRadius+offsetX,
    top:-shadowRadius+offsetY};
  if(this.props.shadowImage) {
    return <Image source={this.props.shadowImage} style={shadowStyle} resizeMode={'contain'}  key={'shadow-box-shadow-image'} fadeDuration={0}/>
  }

  //console.log('###getShadow', shadowOption, shadowStyle)
  return <RNShadowView shadowOption={shadowOption} style={shadowStyle} key={`shadow-box-shadow-view`}/>;
}

getAndroidBox() {
    let style = StyleSheet.flatten([styles.shadowBox, 
                  StyleSheet.flatten(this.props.style), 
                  {overflow:'visible'}]);

    const outerStlyle = this.getOuterStyle(style);
    const innerStyle = this.getInnerStyle(style);

    if(this.props.onPress || this.props.onPressIn || this.props.onPressOut || this.props.onLongPress) {
        return <TouchableOpacity style={outerStlyle} onLayout={this._onLayout}
                    onPress={this.props.onPress} 
                    onPressIn={this.props.onPressIn}
                    onPressOut={this.props.onPressOut}
                    onLongPress={this.props.onLongPress}
                    activeOpacity={this.props.activeOpacity} 
                    disabled={this.props.disabled}>
            {this.getShadow(style)}
            <View style={innerStyle}>{this.props.children}</View>
        </TouchableOpacity>
    } else {
        return <View style={outerStlyle} onLayout={this._onLayout}>
          {this.getShadow(style)}
          <View style={innerStyle}>{this.props.children}</View>
          </View>;
    }
  }
  render() {
      return this.getAndroidBox();
  }
}

const styles = StyleSheet.create({
  shadowBox:{backgroundColor: '#fff',borderRadius:4,shadowColor: '#DEDEDE',shadowOffset: {width:0, height:0},shadowOpacity: 1, shadowRadius: 4}
})
