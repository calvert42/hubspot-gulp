var executed = false;

$.fn.center = function () {
    //sets postion to absolute
    this.css("position","absolute");
    //window dimension minus element dimension/2
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}

function onLeave() {
$('body').mouseleave(function(){
//adds overlay and freezes main scroll
    if (executed == false) {
        $('body').wrapInner('<div class=blur-all></div>').prepend('<div id="overlay" style="display: none;"><a style="color: #333333;" href="#"><i id="close" class="fa fa-times fa-lg" aria-hidden="true"></a></i></div>').fadeIn(200);
        $('#overlay').append('<div id="results"><h3>Wait a minute. Don&#39;t go.</h3><h4>Cut your search for a qualified team from 5 months to 5 minutes. What are you waiting for?</h4><h2><a class="cta" href="https://services.accelerance.com" target="blank">Get started</a></h2></div>').fadeIn(500);
        $('#results').center();
        
        $('#close').click(function() {
                $('#overlay').fadeOut(500).remove();
                $('body').css('overflow', 'visible')
                $('.header-container-wrapper').unwrap();
            })
        
    };
    executed = true;
    
    console.log(document.cookie);

});
};

onLeave();

//whats up myself