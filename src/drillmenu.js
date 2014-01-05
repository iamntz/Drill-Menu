var DrillMenu;


DrillMenu = function( menu, options ) {
  this.menu = $( menu );

  this.options = $.extend({
    menuItem         : '.menu-item',
    menuWithSubmenu  : '.menu-item-has-children',
    submenu          : '.sub-menu',
    appendIndicator  : true,

    indicatorClass   : 'menu-item-indicator',
    openedParentClass: 'opened',
    openedClass      : 'active-drill',
    clonnedMenuClass : 'drill-menu-helper',

    navigationElement: 'li',
    navigationClass  : 'drill-menu-navigation',
    navigationAnchor : 'Back'
  }, this.menu.data(), options );

  if( this.menu.data('init') ){ return; }
  this.menu.data( 'init', true );

  this.init();
};


DrillMenu.prototype.init = function() {
  this.buildMarkup();
  this.bindEvents();
};


DrillMenu.prototype.bindEvents = function(){
  $( this.options.menuWithSubmenu ).on( 'click.drillMenu', '> a', $.proxy( this.show, this ) );
  $( this.options.menuWithSubmenu ).on( 'click.drillMenu', '.' + this.options.navigationClass, $.proxy( this.hide, this ) );
};

DrillMenu.prototype.destroy = function() {
  var $this = this;
  $( this.options.menuWithSubmenu, this.menu ).find('i').filter(function(){
    return $(this).hasClass( $this.options.indicatorClass );
  }).remove();



  this.menu.data( 'init', false );
  $( this.options.menuWithSubmenu ).off( '.drillMenu' );
};

DrillMenu.prototype.buildMarkup = function() {
  var menuItem = $( this.options.menuWithSubmenu, this.menu ).find('>a');
  if( this.options.appendIndicator && !$( '.' + this.options.indicatorClass, menuItem ).length ){
    $('<i/>').addClass( this.options.indicatorClass ).appendTo( menuItem );
  }

  var navigation = $( document.createElement( this.options.navigationElement ) );
  navigation.addClass( this.options.navigationClass );
  navigation.html( this.options.navigationAnchor );
  navigation.prependTo(  this.options.submenu );
};

DrillMenu.prototype.show = function( event ) {
  this._toggle( event, 'activate' );
  return false;
};

DrillMenu.prototype.hide = function( event ) {
  this._toggle( event, 'deactivate' );
  return false;
};


DrillMenu.prototype._toggle = function( event, action ){
  var element = $( event.currentTarget );
  var parent = element.closest( this.options.menuItem );

  this.menu.toggleClass( this.options.openedParentClass, action === 'activate' );
  parent.toggleClass( this.options.openedClass, action === 'activate' );
};