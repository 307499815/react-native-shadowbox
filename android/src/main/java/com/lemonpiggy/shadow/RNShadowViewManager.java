package com.lemonpiggy.shadow;

import android.view.View;
import android.view.ViewGroup;

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
import com.lemonpiggy.shadow.ShadowDrawable;

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
        int borderRadius = shadowOption.getInt("borderRadius");
        int shadowRadius = shadowOption.getInt("shadowRadius");
        String backgroundColor = shadowOption.getString("backgroundColor");
        String shadowColor = shadowOption.getString("shadowColor");
        int offsetX = shadowOption.getInt("offsetX");
        int offsetY = shadowOption.getInt("offsetY");
        ShadowDrawable.setShadowDrawable(view,
                        Color.parseColor(backgroundColor),
                        PixelUtil.toPixelFromDIP(borderRadius),
                        Color.parseColor(shadowColor),
                        PixelUtil.toPixelFromDIP(shadowRadius),
                        PixelUtil.toPixelFromDIP(offsetX),
                        PixelUtil.toPixelFromDIP(offsetY));
    }
}
