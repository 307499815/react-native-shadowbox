package com.lemonpiggy.shadow;

import android.view.View;

import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewGroup;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import android.graphics.Color;

public class RNShadowViewManager extends SimpleViewManager<View> {

    @Override
    public String getName() {
        return "RNShadowView";
    }

    @Override
    public View createViewInstance(ThemedReactContext reactContext) {
        View shadowView = new View(reactContext);
        return shadowView;
    }
    @ReactProp(name = "shadowOption")
    public void setShadowOption(View view, ReadableMap shadowOption) {
        if(!shadowOption) return;
        try {
            float borderRadius = (float)shadowOption.getDouble("borderRadius");
            float shadowRadius = (float)shadowOption.getDouble("shadowRadius");
            String backgroundColor = shadowOption.getString("backgroundColor");
            String shadowColor = shadowOption.getString("shadowColor");
            float offsetX = (float)shadowOption.getDouble("offsetX");
            float offsetY = (float)shadowOption.getDouble("offsetY");
            ShadowDrawable.setShadowDrawable(view,
                            PixelUtil.toPixelFromDIP(borderRadius),
                            Color.parseColor(shadowColor),
                            PixelUtil.toPixelFromDIP(shadowRadius),
                            PixelUtil.toPixelFromDIP(offsetX),
                            PixelUtil.toPixelFromDIP(offsetY));
        }catch(Exception e) {

        }
        
    }
}
