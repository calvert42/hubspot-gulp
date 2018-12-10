var filters = document.getElementById('filter-buttons').getElementsByTagName('li');

function activateFilter(e) { // eslint-disable-line 
    for (var i = 0; i < filters.length; i++) {
        filters[i].classList.remove('active');
    }
    e.target.parentNode.classList.add('active');
}

var resources = $('.resources');

resources.imagesLoaded(function() {
    resources.isotope({
    // options
        itemSelector: '.resource',
        stagger: 100,
        masonry: {
            gutter: 5
        },
        getSortData: {
            category: '[data-order] parseInt'
        },
        sortBy : 'category'
    });

    $('#book').click(function() {
        resources.isotope({filter: '.book'});
    });

    $('#ebook').click(function() {
        resources.isotope({filter: '.ebook'});
    });

    $('#region-guide').click(function() {
        resources.isotope({filter: '.region-guide'});
    });

    $('#webinar').click(function() {
        resources.isotope({filter: '.webinar'});
    });

    $('#show-all').click(function() {
        resources.isotope({filter: ''});
    });
});

