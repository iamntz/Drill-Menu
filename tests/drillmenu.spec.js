describe("Set up", function(){
  var menu;

  beforeEach(function(){
    menu = $('.js-menu');
  });

  it("Should Setup", function(){
    expect( typeof DrillMenu ).toBe( 'function' );
  });

  it( "Should accept options from data-* attribute", function(){
    menu.attr('data-option_test', 'data option value');
    var drillMenu = new DrillMenu( menu );
    expect( drillMenu.options.option_test ).toEqual( 'data option value' );
  });

  it( "Should accept options as an object", function(){
    var drillMenu = new DrillMenu( menu, {
      'option_test' : 'object option value'
    } );

    expect( drillMenu.options.option_test ).toEqual( 'object option value' );
  });

  it( "Should overwrite data-* options with passed object", function(){
    menu.attr('data-option_test', 'default');
    var drillMenu = new DrillMenu( menu, {
      'option_test' : 'overwrite'
    } );

    expect( drillMenu.options.option_test ).toEqual( 'overwrite' );
  });


});


describe( "Set up2", function(){
  var menu, drillMenu;
  beforeEach(function(){
    menu = $('.js-menu');
    drillMenu = new DrillMenu( menu );
  });

  it( "Should append submenu indicator", function(){
    expect( $('.menu-item-has-children .menu-item-indicator', menu).length ).toBe(1);
  });

  it( "Should append `back` navigation to submenu", function(){
    expect( $('.sub-menu').children().first().hasClass('drill-menu-navigation') ).toBeTruthy();
    expect( $('.sub-menu').children().first().text() ).toBe('Back');
  });
});


describe("Destroy", function(){
  var menu, drillMenu;
  beforeEach(function(){
    menu = $('.js-menu');
    drillMenu = new DrillMenu( menu );
    drillMenu.destroy();
  });

  it( "Should remove menu indicator", function(){
    expect( $('.menu-item-indicator', menu).length ).toBe(0);
  });
});


describe("Drill Down", function(){
  var menu, drillMenu;
  beforeEach(function(){
    menu = $('.js-menu');
    drillMenu = new DrillMenu( menu );
  });

  it( "Should Toggle classes", function(){
    $('.menu-item-has-children a', menu).click();
    expect( $('.menu-item-has-children', menu ).hasClass('active-drill') ).toBeTruthy();
    expect( menu.hasClass('opened') ).toBeTruthy();

    $('.drill-menu-navigation', menu).click();

    expect( $('.menu-item-has-children', menu ).hasClass('active-drill') ).toBeFalsy();
    expect( menu.hasClass('opened') ).toBeFalsy();
  });
});