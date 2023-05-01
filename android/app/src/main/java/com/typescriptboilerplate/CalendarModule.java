package com.typescriptboilerplate;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CalendarModule extends ReactContextBaseJavaModule {
    CalendarModule(ReactApplicationContext context) {
        super(context);
    }
    @ReactMethod
    public String createCalendarEvent(String name, String location) {
        Log.d("CalendarModule", "Create event called with name: " + name
                + " and location: " + location);
        return "CalendarModule : Create event called with name: " + name
                + " and location: " + location;
    }
    @NonNull
    @Override
    public String getName() {
        return "CalendarModule";
    }
}