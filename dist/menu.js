//single line comments
var $menuParents = $('.hs-item-has-children');

$.each($menuParents, function () {
    var $menuChild = $(this).find('.hs-menu-children-wrapper');
    $(this).mouseover(function () {
        $menuChild.css('visibility', 'visible');
    });
    $(this).mouseleave(function () {
        $menuChild.css('visibility', 'hidden');
    });
});

var $mobileMenu = $('.mobile-menu');

$mobileMenu.click(function () {
    $('.nav-menu').toggle();
});