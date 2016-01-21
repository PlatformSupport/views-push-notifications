'use strict';

app.home = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_home
(function(parent) {
    var homeModel = kendo.observable({
        fields: {
            pushChannel: '',
        },
        submit: function() {},
        cancel: function() {}
    });

    parent.set('homeModel', homeModel);
})(app.home);

// START_CUSTOM_CODE_homeModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
app.home.homeModel.submit = function() {
    var registeredFor = app.home.homeModel.get("fields.pushChannel");
    var customDeviceParameters = {
        "channel": registeredFor
    } || {};

    var devicePushSettings = {
        iOS: {
            badge: 'true',
            sound: 'true',
            alert: 'true'
        },
        android: {
            projectNumber: '1031548959974'
        },
        wp8: {
            channelName: 'EverlivePushChannel'
        },
        notificationCallbackIOS: onPushNotificationReceived,
        notificationCallbackAndroid: onPushNotificationReceived,
        notificationCallbackWP8: onPushNotificationReceived,
        customParameters: customDeviceParameters
    };

    app.pushProvider.push.register(devicePushSettings, function() {
        alert("Successfully registered");
    }, function() {
        alert("There was an error registering. Please try again");
    });
}

app.pushProvider = new Everlive({
    appId: "8855oec8jnwd2gvi",
    scheme: "https"
});

function onPushNotificationReceived(e) {
    alert(JSON.stringify(e))
}
// END_CUSTOM_CODE_homeModel