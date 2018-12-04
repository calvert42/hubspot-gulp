'use strict';

var filters = document.getElementById('filter-buttons').getElementsByTagName('li');

function activateFilter(e) {
    for (var i = 0; i < filters.length; i++) {
    console.log('active removed');
    filters[i].classList.remove('active');
    }
    e.target.parentNode.classList.add('active');
    
}

var resources = $('.resources');

resources.imagesLoaded(function() {
    var istp = resources.isotope({
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

document.