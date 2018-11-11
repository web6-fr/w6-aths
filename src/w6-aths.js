(function(globals){
  'use strict';
  
  var navigator = globals.navigator;
  
  var aths = {};
  
  aths.supported = null;
  
  aths.installed = null;
  
  aths.message = null;
  
  aths.platform = null;
  
  aths.position = ['bottom', 'center'];
  
  aths.lang = 'en';
  
  aths.messages = {
    en: {
      ios: '<strong>Tap on the share icon</strong>, then tap on <q>Add to Home Screen</q>.',
      android: '<strong>Tap on &#8942;</strong> and then tap on <q>Add to Home screen</q>.',
      installed: 'Already installed',
      not_supported: 'Add to home screen instructions are not available for your device.'
    },
    fr: {
      ios: '<strong>Appuyez sur l\'icône partage</strong>, puis appuyez sur <q>Sur l\'écran d\'accueil</q>.',
      android: '<strong>Appuyez sur &#8942;</strong>, puis appuyez sur <q>Ajouter à l\'écran d\'accueil</q>.',
      installed: 'Application déjà installée',
      not_supported: 'Les instructions pour l\'ajout à l\'écran d\'accueil ne sont pas disponibles pour votre plateforme.'
    }
  };
  
  aths.positions = {
    ios: ['bottom', 'center'],
    android: ['top', 'right']
  };
  
  aths._ = function(key){
    return this.messages[this.lang][key];
  };
  
  aths.init = function(lang){
    if(!lang){
      lang = 'en';
    }
    this.lang = lang;
    return this;
  };
  
  aths.isSupported = function(){
    if(this.supported !== null){
      return this.supported;
    }
  
    this.supported = false;
  
    // iOS + Safari
    if(
      ['iPhone', 'iPad', 'iPod'].indexOf(navigator.platform) !== -1
      && /AppleWebKit\/[\d\.]+/.test(navigator.userAgent)
    ){
      this.supported = true;
      this.platform = 'ios';
    }
    // Android + Chrome
    else if(
      /Android/.test(navigator.userAgent)
      && /Chrome\/[\d\.]+/.test(navigator.userAgent)
    ){
      this.supported = true;
      this.platform = 'android';
    }
  
    if(this.supported){
      this.message = this._(this.platform);
      this.position = this.positions[this.platform];
    }
  
    return this.supported;
  };
  
  aths.isInstalled = function(){
    if(this.installed !== null){
      return this.installed;
    }
  
    if(!this.isSupported()){
      this.installed = false;
    }
    else if( 'standalone' in navigator && navigator.standalone ){
      this.installed = true;
    }
  
    return this.installed;
  };
  
  aths.getMessage = function(){
    if(this.message !== null){
      return this.message;
    }
    if(this.isInstalled()){
      this.message = this._('installed');
    }
    else if(!this.isSupported()){
      this.message = this._('not_supported');
    }
    return this.message;
  };
  
  aths.getPosition = function(){
    if(this.position !== null){
      return this.position;
    }
    // Sets the position
    this.isSupported();
    return this.position;
  };
  
  aths.getPlatform = function(){
    if(this.platform !== null){
      return this.platform;
    }
    // Sets the platform
    this.isSupported();
    return this.platform;
  };
  
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
    module.exports = aths;
  }
  else {
    globals.W6_ATHS = aths;
  }
})(window);