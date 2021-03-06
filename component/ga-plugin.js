 (function(){
  var cordovaRef = window.PhoneGap || window.Cordova || window.cordova;
  
  function GAPlugin() { }
  
  // initialize google analytics with an account ID and the min number of seconds between posting
  //
  // id = the GA account ID of the form 'UA-00000000-0'
  // period = the minimum interval for transmitting tracking events if any exist in the queue
  GAPlugin.prototype.init = function(success, fail, id, period) {
  return cordovaRef.exec(success, fail, 'GAPlugin', 'initGA', [id, period]);
  };
  
  // log an event
  //
  // category = The event category. This parameter is required to be non-empty.
  // eventAction = The event action. This parameter is required to be non-empty.
  // eventLabel = The event label. This parameter may be a blank string to indicate no label.
  // eventValue = The event value. This parameter may be -1 to indicate no value.
  GAPlugin.prototype.sendEvent = function(success, fail, category, eventAction, eventLabel, eventValue) {
  return cordovaRef.exec(success, fail, 'GAPlugin', 'sendEvent', [category, eventAction, eventLabel, eventValue]);
  };
  
  
  // log a page view
  //
  // pageURL = the URL of the page view
  GAPlugin.prototype.sendView = function(success, fail, pageURL) {
  return cordovaRef.exec(success, fail, 'GAPlugin', 'sendView', [pageURL]);
  };
  
  // Set a custom variable. The variable set is included with
  // the next event only. If there is an existing custom variable at the specified
  // index, it will be overwritten by this one.
  //
  // value = the value of the variable you are logging
  // index = the numerical index of the dimension to which this variable will be assigned (1 - 20)
  //  Standard accounts support up to 20 custom dimensions.
  GAPlugin.prototype.setCustomDimension = function(success, fail, index, value) {
  return cordovaRef.exec(success, fail, 'GAPlugin', 'setCustomDimension', [index, value]);
  };
  
  GAPlugin.prototype.setCustomMetric = function(success, fail, index, value) {
  return cordovaRef.exec(success, fail, 'GAPlugin', 'setCustomMetric', [index, value]);
  };
  
  GAPlugin.prototype.sendTiming = function(success, fail, category, time, name, label) {
  return cordovaRef.exec(success, fail, 'GAPlugin', 'sendTiming', [category, time, name, label]);
  };
  
  GAPlugin.prototype.sendException = function(success, fail, message, fatal) {
  return cordovaRef.exec(success, fail, 'GAPlugin', 'sendException', [message, fatal]);
  };
  
  GAPlugin.prototype.exit = function(success, fail) {
  return cordovaRef.exec(success, fail, 'GAPlugin', 'exitGA', []);
  };
  
  if (cordovaRef)
  {
  cordovaRef.addConstructor(function() {
                            if(!window.plugins) {
                            window.plugins = {};
                            }
                            if(!window.plugins.gaPlugin) {
                            window.plugins.gaPlugin = new GAPlugin();
                            }
                            });
  }
  })(); /* End of Temporary Scope. */
