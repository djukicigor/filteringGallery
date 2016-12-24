jQuery(document).ready(function($) {

        // Gallery Isotope
    var grid = $('#isotope-gallery');
    // quick search regex
    var qsRegex;
    var srcArr = [];
    var value = "";
    var tab = "";
    var is = false;
    var filterDiv = 0;
    var all = "*";
    var remove = false;
    grid.isotope({
        itemSelector: '.jedna-slika',
        filter: function () {
            $("#close-button").click( function() {
                srcArr = [];
                filterDiv = 0;
                $quicksearch.val("");
                $(".filter").empty();
                $(this).data('clicked', true);
            });

            function clicked() {
                return "*";
            }

            if (remove == true) {
                srcArr = [];
                filterDiv = 0;
                $quicksearch.val("");
                $(".filter").empty();
                $(this).data('clicked', true);
                remove = false;
                return "*";
            }

            if (srcArr.length > 0) {
                $(".close-button").addClass("shown");
                tab = "." + srcArr.join(", .");
                if (tab[tab.length-1] == ".") {
                    tab = tab.slice(0, -3);
                }
                $(".tag").click(function () {
                    var arrPos = srcArr.indexOf($(this).text());
                    $('.quicksearch').focus().val("").toLowerCase();
                    if(arrPos != -1) {
                        srcArr.splice(arrPos, 1);
                        if ($quicksearch.val().toLowerCase() == "") {
                            $quicksearch.val($(this).text()).toLowerCase();
                        }
                        tab = "." + srcArr.join(", .");
                        if (tab[tab.length-1] == ".") {
                            tab = tab.slice(0, -3);
                        }
                        filterDiv--;
                    }
                    $(this).remove();
                    qsRegex = new RegExp( "" );
                });

                if ($quicksearch.val() == "") {
                    return tab ? $(this).is(tab) : true;
                }
            }
            var reg = qsRegex ? $(this).attr('class').match( qsRegex ) : true;
            return reg;
        }
    });

    // use value of search field to filter
    var $quicksearch = $('.quicksearch').keyup( debounce( function() {
        value = $quicksearch.val().toLowerCase();
        value.toLowerCase();
        //srcArr = value.split(" ");
        if (value[value.length-1] == " ") {
            srcArr.push(value.slice(0, -1));
            $(".filter").append("<span class='tag'>" + srcArr[filterDiv] + "</span>");
            filterDiv++;
            $quicksearch.val("");
        }
        $(".search-button").unbind().click(function(){
            clicking();
        });
        $('.quicksearch').keypress(function(event){
            if(event.which == '13') {
                is = true;
            }
        });

        $('.quicksearch').keyup(function(event){
            if(event.keyCode == '27' && $quicksearch.val() == "") {
                remove = true;
            }
        });

        if (is == true) {
            clicking();
        }

        function clicking() {
            srcArr.push(value.toLowerCase());
            $(".filter").append("<span class='tag'>" + srcArr[filterDiv].toLowerCase() + "</span>");
            filterDiv++;
            $quicksearch.val("");
            is = false;
        }
        $('.tag, .close-button').click(function () {
            $('.quicksearch').keyup();
        });
        qsRegex = new RegExp( $quicksearch.val(), 'gi' );

        grid.isotope();
    }, 200 ) );

    // debounce so filtering doesn't happen every millisecond
    function debounce( fn, threshold ) {
        var timeout;
        return function debounced() {
            if ( timeout ) {
                clearTimeout( timeout );
            }
            function delayed() {
                fn();
                timeout = null;
            }
            timeout = setTimeout( delayed, threshold || 50 );
        }
    }

}