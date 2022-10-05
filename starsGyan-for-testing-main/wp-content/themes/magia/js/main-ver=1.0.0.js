"use strict";
//Wrapping all JavaScript code into a IIFE function for prevent global variables creation
(function ($) {

    var $body = $('body');
    var $window = $(window);

    function putPlaceholdersToInputs() {
        $('select').wrap('<div class="select-wrap"></div>');

        //for categories
        $('select[name="cat"]').on('change', function () {
            var $form = $(this).closest('form');
            if ($form.length) {
                $form.trigger('submit');
            }
        });

        $('label[for]').each(function () {
            var $label = $(this);
            var $input = $('#'+ $label.attr('for'));
            if(!$input.attr('placeholder')) {
                if(!$input.is('[type="radio"]') && !$input.is('[type="checkbox"]') && !$input.is('select')) {
                    var text = $label.text();
                    text = text.replace(/\t|  |\*/g,'');
                    $input.attr('placeholder', text);
                    $label.css({'display': 'none'});
                }
            }
        })
    }

//hidding menu elements that do not fit in menu width
//processing center logo
    function menuHideExtraElements() {

        if ($body.hasClass('header_show_all_menu_items') && !$body.find('.header_logo_center').length) {
            return;
        }

        //cleaning changed elements
        $('.sf-more-li, .sf-logo-li').remove();
        var windowWidth = $('body').innerWidth();

        $('.sf-menu').each(function () {
            var $thisMenu = $(this);
            var $menuWraper = $thisMenu.closest('.top-nav');
            $menuWraper.attr('style', '');
            if (windowWidth > 1199) {
                //grab all main menu first level items
                var $menuLis = $menuWraper.find('.sf-menu > li');
                $menuLis.removeClass('sf-xl-hidden');

                var $headerLogoCenter = $thisMenu.closest('.header_logo_center');
                var logoWidth = 0;
                var summaryLiWidth = 0;

                if ($headerLogoCenter.length) {
                    var $logo = $headerLogoCenter.find('.logo');
                    // 30/2 - left and right margins
                    logoWidth = $logo.outerWidth(true) + 70;
                }

                var wrapperWidth = $menuWraper.outerWidth(true);
                $menuLis.each(function (index) {
                    //4 - 4px additional width for inline-block LI element
                    var elementWidth = $(this).outerWidth() + 4;
                    summaryLiWidth += elementWidth;
                    if (summaryLiWidth >= (wrapperWidth - logoWidth)) {
                        var $newLi = $('<li class="sf-more-li"><a>...</a><ul></ul></li>');
                        $($menuLis[index - 1]).before($newLi);
                        var newLiWidth = $($newLi).outerWidth(true);
                        var $extraLiElements = $menuLis.filter(':gt(' + (index - 2) + ')');
                        $extraLiElements.clone().appendTo($newLi.find('ul'));
                        $extraLiElements.addClass('sf-xl-hidden');
                        return false;
                    }
                });

                //processing center logo
                if ($headerLogoCenter.length) {
                    var $menuLisVisible = $headerLogoCenter.find('.sf-menu > li:not(.sf-xl-hidden)');
                    var menuLength = $menuLisVisible.length;
                    var summaryLiVisibleWidth = 0;
                    $menuLisVisible.each(function () {
                        summaryLiVisibleWidth += $(this).outerWidth();
                    });

                    var centerLi = Math.floor(menuLength / 2);
                    if ((menuLength % 2 === 0)) {
                        centerLi--;
                    }
                    var $liLeftFromLogo = $menuLisVisible.eq(centerLi);
                    $liLeftFromLogo.after('<li class="sf-logo-li"><a href="#">&nbsp;</a></li>');
                    $headerLogoCenter.find('.sf-logo-li').width(logoWidth);
                    var liLeftRightDotX = $liLeftFromLogo.offset().left + $liLeftFromLogo.outerWidth();
                    var logoLeftDotX = windowWidth / 2 - logoWidth / 2;
                    var menuLeftOffset = liLeftRightDotX - logoLeftDotX;
                    $menuWraper.css({'left': -menuLeftOffset})
                }

            }// > 991
        }); //sf-menu each
    } //menuHideExtraElements

    function initMegaMenu(timeOut) {
        var $megaMenu = $('.top-nav .mega-menu');
        if ($megaMenu.length) {
            setTimeout(function () {

                var windowWidth = $('body').innerWidth();
                if (windowWidth > 991) {
                    $megaMenu.each(function () {
                        var $thisMegaMenu = $(this);
                        //temporary showing mega menu to proper size calc
                        $thisMegaMenu.css({'display': 'block', 'left': 'auto'});

                        //checking for sticked side header
                        var stickedSideHeaderWidth = 0;
                        var $stickedSideHeader = $('.header_side_sticked');
                        if ($stickedSideHeader.length && $stickedSideHeader.hasClass('active-slide-side-header')) {
                            stickedSideHeaderWidth = $stickedSideHeader.outerWidth(true);
                            if ($stickedSideHeader.hasClass('header_side_right')) {
                                stickedSideHeaderWidth = -stickedSideHeaderWidth;
                            }
                            windowWidth = windowWidth - stickedSideHeaderWidth;
                        }
                        var thisWidth = $thisMegaMenu.outerWidth();
                        var thisOffset = $thisMegaMenu.offset().left - stickedSideHeaderWidth;
                        var thisLeft = (thisOffset + (thisWidth / 2)) - windowWidth / 2;
                        $thisMegaMenu.css({'left': -thisLeft, 'display': 'none'});
                        if (!$thisMegaMenu.closest('ul').hasClass('nav')) {
                            $thisMegaMenu.css('left', '');
                        }
                    });
                }
            }, timeOut);

        }
    }

//NOTE: affixed sidebar works bad with side headers
    function initAffixSidebar() {
        var $affixAside = $('.affix-aside');
        if ($affixAside.length) {

            $window = $(window);

            //on stick and unstick event
            $affixAside.on('affix.bs.affix', function (e) {
                var affixWidth = $affixAside.width() - 1;
                var affixLeft = $affixAside.offset().left;
                $affixAside
                    .width(affixWidth)
                    .css("left", affixLeft);

            }).on('affix-bottom.bs.affix', function (e) {
                var affixWidth = $affixAside.width() - 1;
                //if sticked left header
                var stickedSideHeaderWidth = 0;
                var $stickedSideHeader = $('.header_side_sticked');
                if ($stickedSideHeader.length && $stickedSideHeader.hasClass('active-slide-side-header') && !$stickedSideHeader.hasClass('header_side_right')) {
                    stickedSideHeaderWidth = $stickedSideHeader.outerWidth(true);
                }
                var affixLeft = $affixAside.offset().left - stickedSideHeaderWidth - $('#box_wrapper').offset().left;


                $affixAside
                    .width(affixWidth)
                    .css("left", affixLeft);
            }).on('affix-top.bs.affix', function (e) {
                $affixAside.css({"width": "", "left": ""});
            });

            //counting offset
            var offsetTopAdd = 10;
            var offsetBottomAdd = 150;
            var offsetTop = $affixAside.offset().top - $('.page_header').height();
            //note that page_footer and page_copyright sections must exists - else this will cause error in last jQuery versions
            var offsetBottom = $('.page_footer').outerHeight(true) + $('.page_copyright').outerHeight(true);

            $affixAside.affix({
                offset: {
                    top: offsetTop - offsetTopAdd,
                    bottom: offsetBottom + offsetBottomAdd
                },
            });

            $window.on('resize', function () {
                //returning sidebar in top position if it is sticked because of unexpected behavior
                $affixAside.removeClass("affix affix-bottom").addClass("affix-top").trigger('affix-top.bs.affix');

                var offsetTopSectionsArray = [
                    '.page_topline',
                    '.page_toplogo',
                    '.page_header',
                    '.page_title',
                    '.blog_slider',
                    '.blog-featured-posts'
                ];
                var offsetTop = 0;

                offsetTopSectionsArray.map(function (val) {
                    offsetTop += $(val).outerHeight(true) || 0;
                });
                //note that page_footer and page_copyright sections must exists - else this will cause error in last jQuery versions
                var offsetBottom = $('.page_footer').outerHeight(true)
                    + $('.page_copyright').outerHeight(true);

                $affixAside.data('bs.affix').options.offset.top = offsetTop - offsetTopAdd;
                $affixAside.data('bs.affix').options.offset.bottom = offsetBottom + offsetBottomAdd;

                $affixAside.affix('checkPosition');

            });

            $affixAside.affix('checkPosition');

        }//eof checking of affix sidebar existing
    }

//photoSwipe gallery plugin
    function initPhotoSwipe() {
        if (typeof PhotoSwipe !== 'undefined') {

            //adding prettyPhoto for backward compatibility. Deprecated.
            //will leave only .photoswipe-link later
            var gallerySelectors = '.photoswipe-link, a[data-gal^="prettyPhoto"], [data-thumb] a';
            var $galleryLinks = $(gallerySelectors);
            if ($galleryLinks.length) {

                //adding photoswipe gallery markup
                if (!($('.pswp').length)) {
                    $body.append('<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"><div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar"><div class="pswp__counter"></div><a class="pswp__button pswp__button--close" title="Close (Esc)"></a><a class="pswp__button pswp__button--share" title="Share"></a><a class="pswp__button pswp__button--fs" title="Toggle fullscreen"></a><a class="pswp__button pswp__button--zoom" title="Zoom in/out"></a><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div> </div><a class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></a><a class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></a><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div></div>');
                    //if function already was called - return (all listeners was setted and .pswp gallery container was added)
                } else {
                    return;
                }
                //adding prettyPhoto for backward compatibility. Deprecated.
                $('body').on('click', gallerySelectors, function (e) {
                    e.preventDefault();

                    var $link = $(this);
                    var $linksParentContainer = $link.closest('.photoswipe-container, .isotope-wrapper, .owl-carousel, .flickr_ul, .images');
                    var $links = $linksParentContainer.find(gallerySelectors);

                    //if no container only adding this link
                    if (!$links.length) {
                        $links.push($link);
                    }
                    var items = [];

                    var options = {
                        bgOpacity: 0.7,
                        showHideOpacity: true,
                        history: false,
                        shareEl: false,
                        index: 0
                    };
                    var gallery = $('.pswp')[0];
                    //building items array
                    var counter = 0;
                    var clonedClick = false;
                    var clonedRealIndex = 0;
                    $links.each(function (i) {
                        var $this = $(this);
                        //if cloned element (owl or flexslider thumbs) - continue
                        if ($this.closest('.clone, .cloned').length) {
                            if (($link[0] === $this[0])) {
                                clonedClick = true;
                                clonedRealIndex = parseInt($this.data('index'), 10);
                                options.index = clonedRealIndex;
                            }
                            return;
                        }
                        var item = {};
                        //start slide from clicked element
                        if (($link[0] === $this[0])) {
                            options.index = counter;
                        }

                        //video or image
                        if ($this.data('iframe')) {
                            var autoplay = ($links.length > 1) ? '' : '&autoplay=1';
                            item.html = '<div class="embed-responsive embed-responsive-16by9">';
                            //for wordpress - iframe tag is escaped
                            if ($this.data('iframe').indexOf('src=') !== -1) {
                                item.html += $this.data('iframe').replace(/&amp/g, '&').replace(/$lt;/g, '<').replace(/&gt;/g, '>').replace(/$quot;/g, '"');

                                //for html - building iframe manually
                            } else {
                                //autoplay only if 1 iframe in gallery
                                item.html += '<iframe class="embed-responsive-item" src="' + $(this).data('iframe') + '?rel=0' + autoplay + '&enablejsapi=1&api=1"></iframe>';
                            }

                            item.html += '</div>';
                        } else {
                            item.src = $this.attr('href');
                            //default values
                            var width = 1170;
                            var height = 780;
                            //template data on A element
                            var data = $this.data();
                            //image data in Woo
                            var dataImage = $this.find('img').first().data();
                            if (data.width) {
                                width = data.width;
                            }
                            if (data.height) {
                                height = data.height;
                            }
                            if (typeof dataImage !== 'undefined') {
                                if (dataImage.large_image_width) {
                                    width = dataImage.large_image_width;
                                }
                                if (dataImage.large_image_height) {
                                    height = dataImage.large_image_height;
                                }
                            }
                            item.w = width;
                            item.h = height;
                        }
                        items.push(item);
                        counter++;
                    });

                    var pswpGallery = new PhotoSwipe(gallery, PhotoSwipeUI_Default, items, options);
                    pswpGallery.init();

                    //pausing video on close and on slide change
                    pswpGallery.listen('afterChange', function () {
                        $(pswpGallery.container).find('iframe').each(function () {
                            //"method":"pause" - form Vimeo, other - for YouTube
                            $(this)[0].contentWindow.postMessage('{"method":"pause","event":"command","func":"pauseVideo","args":""}', '*')
                        });
                    });
                    pswpGallery.listen('close', function () {
                        $(pswpGallery.container).find('iframe').each(function () {
                            //"method":"pause" - form Vimeo, other - for YouTube
                            $(this)[0].contentWindow.postMessage('{"method":"pause","event":"command","func":"pauseVideo","args":""}', '*')
                        });
                    });

                });
            }

        }
    }

//helper functions to init elements only when they appears in viewport (jQUery.appear plugin)
    function initAnimateElement(self, index) {
        var animationClass = !self.data('animation') ? 'fadeInUp' : self.data('animation');
        var animationDelay = !self.data('delay') ? 150 : self.data('delay');
        setTimeout(function () {
            self.addClass("animated " + animationClass);
        }, index * animationDelay);
    }

    function initCounter(self) {
        if (self.hasClass('counted')) {
            return;
        } else {
            self.countTo().addClass('counted');
        }
    }

    function initProgressbar(el) {
        el.progressbar({
            transition_delay: 300
        });
    }

    function initChart(el) {
        var data = el.data();
        var size = data.size ? data.size : 270;
        var line = data.line ? data.line : 20;
        var bgcolor = data.bgcolor ? data.bgcolor : '#ffffff';
        var trackcolor = data.trackcolor ? data.trackcolor : '#c14240';
        var speed = data.speed ? data.speed : 3000;

        el.easyPieChart({
            barColor: trackcolor,
            trackColor: bgcolor,
            scaleColor: false,
            scaleLength: false,
            lineCap: 'butt',
            lineWidth: line,
            size: size,
            rotate: 0,
            animate: speed,
            onStep: function (from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
            }
        });
    }

    function initGoogleMap() {
        //Google Map script
        var $googleMaps = $('#map, .page_map');
        if ($googleMaps.length) {
            $googleMaps.each(function () {
                var $map = $(this);

                var lat;
                var lng;
                var map;

                //map styles. You can grab different styles on https://snazzymaps.com/

                // light style
                var styles = [{
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
                }, {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#ffffff"}, {"lightness": 17}]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2}]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{"color": "#ffffff"}, {"lightness": 18}]
                }, {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{"color": "#ffffff"}, {"lightness": 16}]
                }, {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]
                }, {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [{"color": "#dedede"}, {"lightness": 21}]
                }, {
                    "elementType": "labels.text.stroke",
                    "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]
                }, {
                    "elementType": "labels.text.fill",
                    "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]
                }, {"elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{"color": "#f2f2f2"}, {"lightness": 19}]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#fefefe"}, {"lightness": 20}]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [{"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2}]
                }];

                //markers
                var $markers = $map.find('.marker');

                //map settings
                var address = $markers.first().find('.marker-address').text() ? $markers.first().find('.marker-address').text() : 'london, baker street, 221b';
                var geocoder = new google.maps.Geocoder();


                var draggable = $map.data('draggable') ? $map.data('draggable') : false;
                var scrollwheel = $map.data('scrollwheel') ? $map.data('scrollwheel') : false;

                //type your address after "address="
                geocoder.geocode({
                    address: address
                }, function (data) {

                    lat = data[0].geometry.location.lat();
                    lng = data[0].geometry.location.lng();

                    var center = new google.maps.LatLng(lat, lng);
                    var settings = {
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        zoom: 16,
                        draggable: draggable,
                        scrollwheel: scrollwheel,
                        center: center,
                        styles: styles
                    };
                    map = new google.maps.Map($map[0], settings);

                    var infoWindows = [];

                    $($markers).each(function (index) {

                        var $marker = $(this);
                        var markerTitle = $marker.find('.marker-title').text();

                        //building info widnow HTML code
                        var markerDescription = '';
                        markerDescription += markerTitle ? '<h3 class="makret-title">' + markerTitle + '</h3>' : '';
                        markerDescription += $marker.find('.marker-description').html() ? '<div class="marker-description">' + $marker.find('.marker-description').html() + '</div>' : '';
                        if (markerDescription) {
                            markerDescription = '<div class="map_marker_description">' + markerDescription + '</div>';
                        }

                        geocoder.geocode({
                            address: $marker.find('.marker-address').text()
                        }, function (data) {
                            var iconSrc = $marker.find('.marker-icon').attr('src');

                            var lat = data[0].geometry.location.lat();
                            var lng = data[0].geometry.location.lng();

                            var center = new google.maps.LatLng(lat, lng);

                            var marker = new google.maps.Marker({
                                position: center,
                                title: markerTitle,
                                map: map,
                                icon: iconSrc
                            });

                            var infowindow = new google.maps.InfoWindow({
                                content: markerDescription
                            });

                            infoWindows.push(infowindow);

                            google.maps.event.addListener(marker, 'click', function () {
                                for (var i = 0; i < infoWindows.length; i++) {
                                    infoWindows[i].close();
                                }
                                infowindow.open(map, marker);
                            });
                        });
                    });
                });
            }); //each Google map
        }//google map length
    }

//function that initiating template plugins on window.load event
    function documentReadyInit() {
        ////////////
        //mainmenu//
        ////////////
        if ($().scrollbar) {
            $('[class*="scrollbar-"]').scrollbar();
            //fix for firefox on mac
            if (/mac/i.test(navigator.platform) && /firefox/i.test(navigator.userAgent)) {
                jQuery('[class*="scrollbar-"]').addClass('scroll-content').wrap('<div class="scroll-wrapper firefox-on-macos"></div>');
            }
        }
        if ($().superfish) {
            $('ul.sf-menu').superfish({
                popUpSelector: 'ul:not(.mega-menu ul), .mega-menu ',
                delay: 700,
                animation: {opacity: 'show', marginTop: 0},
                animationOut: {opacity: 'hide', marginTop: 5},
                speed: 200,
                speedOut: 200,
                disableHI: false,
                cssArrows: true,
                autoArrows: true,
                onInit: function () {
                    var $thisMenu = $(this);
                    $thisMenu.find('.sf-with-ul').after('<span class="sf-menu-item-mobile-toggler"/>');
                    $thisMenu.find('.sf-menu-item-mobile-toggler').on('click', function (e) {
                        var $parentLi = $(this).parent();
                        if ($parentLi.hasClass('sfHover')) {
                            $parentLi.superfish('hide');
                        } else {
                            $parentLi.superfish('show');
                        }
                    });
                    //for wp - add .active on li
                    $thisMenu.find('.current-menu-parent, .current-menu-item').addClass('active');
                }

            });
            $('ul.sf-menu-side').superfish({
                popUpSelector: 'ul:not(.mega-menu ul), .mega-menu ',
                delay: 500,
                animation: {opacity: 'show', height: 100 + '%'},
                animationOut: {opacity: 'hide', height: 0},
                speed: 400,
                speedOut: 300,
                disableHI: false,
                cssArrows: true,
                autoArrows: true
            });
        }

        $('.page_header_side_special .close-wrapper a').on('click', function () {
            $(this).closest('.page_header_side_special').removeClass('active-slide-side-header');
        });

        //toggle mobile menu
        $('.page_header .toggle_menu:not(.toggle_menu_side_special), .page_toplogo .toggle_menu').on('click', function () {
            $(this)
                .toggleClass('mobile-active')
                .closest('.page_header')
                .toggleClass('mobile-active')
                .end()
                .closest('.page_toplogo')
                .next()
                .find('.page_header')
                .toggleClass('mobile-active');
            $body.toggleClass('overflow-hidden-lg');
        });

        $('.sf-menu a').on('click', function () {
            var $this = $(this);
            //If this is a local link or item with sumbenu - not toggling menu
            if (($this.hasClass('sf-with-ul')) || !($this.attr('href').charAt(0) === '#')) {
                return;
            }
            $this
                .closest('.page_header')
                .toggleClass('mobile-active')
                .find('.toggle_menu')
                .toggleClass('mobile-active');
            $body.toggleClass('overflow-hidden-lg');
        });

        //side header processing
        var $sideHeader = $('.page_header_side');
        // toggle sub-menus visibility on menu-click
        $('ul.menu-click').find('li').each(function () {
            var $thisLi = $(this);
            //toggle submenu only for menu items with submenu
            if ($thisLi.find('ul').length) {
                $thisLi
                    .append('<span class="toggle_submenu color-darkgrey"></span>')
                    //adding anchor
                    .find('.toggle_submenu, > a')
                    .on('click', function (e) {
                        var $thisSpanOrA = $(this);
                        //if this is a link and it is already opened - going to link
                        if (($thisSpanOrA.attr('href') === '#') || !($thisSpanOrA.parent().hasClass('active-submenu'))) {
                            e.preventDefault();
                        }
                        if ($thisSpanOrA.parent().hasClass('active-submenu')) {
                            $thisSpanOrA.parent().removeClass('active-submenu');
                            return;
                        }
                        $thisLi.addClass('active-submenu').siblings().removeClass('active-submenu');
                    });
            } //eof sumbenu check
        });
        if ($sideHeader.length) {
            $('.toggle_menu_side').on('click', function () {
                var $thisToggler = $(this);
                $thisToggler.toggleClass('active');
                if ($thisToggler.hasClass('header-slide')) {
                    $sideHeader.toggleClass('active-slide-side-header');
                } else {
                    if ($thisToggler.parent().hasClass('header_side_right')) {
                        $body.toggleClass('active-side-header slide-right');
                    } else {
                        $body.toggleClass('active-side-header');
                    }
                    $body.parent().toggleClass('html-active-push-header');
                }
                //fixing mega menu and aside affix on toggling side sticked header
                if ($thisToggler.closest('.header_side_sticked').length) {
                    initMegaMenu(600);
                    var $affixAside = $('.affix-aside');
                    if ($affixAside.length) {
                        $affixAside.removeClass("affix affix-bottom").addClass("affix-top").css({
                            "width": "",
                            "left": ""
                        }).trigger('affix-top.bs.affix');
                        setTimeout(function () {
                            $affixAside.removeClass("affix affix-bottom").addClass("affix-top").css({
                                "width": "",
                                "left": ""
                            }).trigger('affix-top.bs.affix');
                        }, 10);
                    }
                }
            });
            //hidding side header on click outside header
            $body.on('mousedown touchstart', function (e) {
                if (!($(e.target).closest('.page_header_side').length) && !($sideHeader.hasClass('header_side_sticked'))) {
                    $sideHeader.removeClass('active-slide-side-header');
                    $body.removeClass('active-side-header slide-right');
                    $body.parent().removeClass('html-active-push-header');
                    var $toggler = $('.toggle_menu_side');
                    if (($toggler).hasClass('active')) {
                        $toggler.removeClass('active');
                    }
                }
            });
        } //sideHeader check

        //1 and 2/3/4th level offscreen fix
        var MainWindowWidth = $window.width();
        $window.on('resize', function () {
            MainWindowWidth = $(window).width();
        });
        //2/3/4 levels
        $('.top-nav .sf-menu').on('mouseover', 'ul > li', function () {

            if (MainWindowWidth > 991) {
                var $this = $(this);
                // checks if third level menu exist
                var subMenuExist = $this.find('ul').length;
                if (subMenuExist > 0) {
                    var subMenuWidth = $this.find('ul, div').first().width();
                    var subMenuOffset = $this.find('ul, div').first().parent().offset().left + subMenuWidth;
                    // if sub menu is off screen, give new position
                    if ((subMenuOffset + subMenuWidth) > MainWindowWidth) {
                        var newSubMenuPosition = subMenuWidth + 0;
                        $this.find('ul, div').first().css({
                            left: -newSubMenuPosition,
                        });
                    } else {
                        $this.find('ul, div').first().css({
                            left: '100%',
                        });
                    }
                }
            }
            //1st level
        }).on('mouseover', '> li', function () {
            if (MainWindowWidth > 991) {
                var $this = $(this);
                var subMenuExist = $this.find('ul').length;
                if (subMenuExist > 0) {
                    var subMenuWidth = $this.find('ul').width();
                    var subMenuOffset = $this.find('ul').parent().offset().left;
                    // if sub menu is off screen, give new position
                    if ((subMenuOffset + subMenuWidth) > MainWindowWidth) {
                        var newSubMenuPosition = MainWindowWidth - (subMenuOffset + subMenuWidth);
                        $this.find('ul').first().css({
                            left: newSubMenuPosition,
                        });
                    }
                }
            }
        });

        /////////////////////////////////////////
        //single page localscroll and scrollspy//
        /////////////////////////////////////////
        var navHeight = $('.page_header').outerHeight(true);
        //if sidebar nav exists - binding to it. Else - to main horizontal nav
        if ($('.mainmenu_side_wrapper').length) {
            $body.scrollspy({
                target: '.mainmenu_side_wrapper',
                offset: navHeight ? navHeight : 50
            });
        } else if ($('.top-nav').length) {
            $body.scrollspy({
                target: '.top-nav',
                offset: navHeight
            })
        }
        if ($().localScroll) {
            $('.top-nav > ul, .mainmenu_side_wrapper > ul, #land,  .comments-link').localScroll({
                duration: 900,
                easing: 'easeInOutQuart',
                offset: navHeight ? -navHeight + 40 : -20
            });
        }

        //background image teaser and sections with half image bg
        //put this before prettyPhoto init because image may be wrapped in prettyPhoto link
        $(".bg_teaser, .cover-image").each(function () {
            var $element = $(this);
            var $image = $element.find("img").first();
            if (!$image.length) {
                $image = $element.parent().find("img").first();
            }
            if (!$image.length) {
                return;
            }
            var imagePath = $image.attr("src");
            $element.css("background-image", "url(" + imagePath + ")");
            var $imageParent = $image.parent();
            //if image inside link - adding this link, removing gallery to preserve duplicating gallery items
            if ($imageParent.is('a')) {
                $element.prepend($image.parent().clone().html(''));
                $imageParent.attr('data-gal', '');
            }
        });

        //video images preview - from WP
        $('.embed-placeholder').each(function () {
            $(this).on('click', function (e) {
                var $thisLink = $(this);
                // if prettyPhoto popup with YouTube - return
                if ($thisLink.hasClass('photoswipe-link')) {
                    return;
                }
                e.preventDefault();
                if ($thisLink.attr('href') === '' || $thisLink.attr('href') === '#') {
                    $thisLink.replaceWith($thisLink.data('iframe').replace(/&amp/g, '&').replace(/$lt;/g, '<').replace(/&gt;/g, '>').replace(/$quot;/g, '"')).trigger('click');
                } else {
                    $thisLink.replaceWith('<iframe class="embed-responsive-item" src="' + $thisLink.attr('href') + '?rel=0&autoplay=1' + '"></iframe>');
                }
            });
        });

        //toTop
        if ($().UItoTop) {
            $().UItoTop({easingType: 'easeInOutQuart'});
        }

        //parallax
        if ($().parallax) {
            $('.s-parallax').parallax("50%", 0.01);
        }

        //prettyPhoto
        if ($().prettyPhoto) {
            $("a[data-gal^='prettyPhoto']").prettyPhoto({
                hook: 'data-gal',
                theme: 'facebook' /* light_rounded / dark_rounded / light_square / dark_square / facebook / pp_default*/
            });
        }
        initPhotoSwipe();

        ////////////////////////////////////////
        //init Bootstrap JS components//
        ////////////////////////////////////////
        //adding .form-control class for search widgets

        //video in bootstrap tabs
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            if (typeof (e.relatedTarget) !== 'undefined') {
                var iframe = $(e.relatedTarget.hash).find('iframe');
                var src = iframe.attr('src');
                iframe.attr('src', '');
                iframe.attr('src', src);
            }
        });


        //bootstrap carousel
        if ($().carousel) {
            $('.carousel').carousel();
        }

        //bootstrap collapse - show first tab
        $('.panel-group').each(function () {
            $(this).find('a').first().filter('.collapsed').trigger('click');
        });
        //tooltip
        if ($().tooltip) {
            $('[data-toggle="tooltip"]').tooltip();
        }

        //comingsoon counter
        if ($().countdown) {
            var $counter = $('#comingsoon-countdown, .comingsoon-countdown');
            $counter.each(function () {
                var $this = $(this);
                //today date plus month for demo purpose
                var date = ($this.data('date') !== 'undefined') ? $this.data('date') : false;
                if (date) {
                    date = new Date(date);
                } else {
                    date = new Date();
                    date.setMonth(date.getMonth() + 1);
                }
                $this.countdown({until: date});
            });
        }

        /////////////////////////////////////////////////
        //PHP widgets - contact form, search, MailChimp//
        /////////////////////////////////////////////////

        //contact form processing
        $('form.contact-form').on('submit', function (e) {
            e.preventDefault();
            var $form = $(this);
            $($form).find('.contact-form-respond').remove();

            //checking on empty values
            $($form).find('[aria-required="true"], [required]').each(function (index) {
                var $thisRequired = $(this);
                if (!$thisRequired.val().length) {
                    $thisRequired
                        .addClass('invalid')
                        .on('focus', function () {
                            $thisRequired
                                .removeClass('invalid');
                        });
                }
            });
            //if one of form fields is empty - exit
            if ($form.find('[aria-required="true"], [required]').hasClass('invalid')) {
                return;
            }

            //sending form data to PHP server if fields are not empty
            var request = $form.serialize();
            var ajax = jQuery.post("contact-form.php", request)
                .done(function (data) {
                    $($form).find('[type="submit"]').attr('disabled', false).parent().append('<div class="contact-form-respond color-main mt-20">' + data + '</div>');
                    //cleaning form
                    var $formErrors = $form.find('.form-errors');
                    if (!$formErrors.length) {
                        $form[0].reset();
                    }
                })
                .fail(function (data) {
                    $($form).find('[type="submit"]').attr('disabled', false).blur().parent().append('<div class="contact-form-respond color-main mt-20">Mail cannot be sent. You need PHP server to send mail.</div>');
                })
        });

        // Give
        $('.give-goal-progress').each(function () {
            var $item = $(this);
            if ( !$item.find('.raised span').hasClass('give-percentage') ) {
                var $val_now = $item.find('.raised .income').text();
                var $val_max = $item.find('.goal-text').text();
                $item.append('<div class="donate-progress-value"> <span class="raised"> <span class="title">Raised</span> <span><span class="value">'+ $val_now +'</span></span> </span> <span class="goal"> <span class="title">Goal</span> <span><span class="value">' + $val_max + '</span></span></span></div>');

                $item.find('.give-progress-bar span').append('<span>' + Math.floor(parseFloat($val_now.slice(1)) / parseFloat($val_max.slice(1)) * 100) + '%'  + '</span>')
            } else {
                var $raised = $item.find('.give-percentage').text();
                $item.append('<div class="donate-progress-value"> <span class="raised"> <span class="title">Raised</span> <span><span class="value">'+ $raised +'</span></div>');
                $item.find('.give-progress-bar span').append('<span>' + $raised + '</span>')
            }
        });

        var $single_give = $('.type-give_forms');
        var $title = $single_give.find('h1');
        $title.html('<span>' + $title.text() + '</span>');
        $title.addClass('special-heading underline text-center').removeClass('give-form-title entry-title');

        if ( $single_give.find('.give-goal-progress') && $single_give.find('.give_pre_form-content') ) {
            $single_give.find('.give_pre_form-content').after($single_give.find('.give-goal-progress'));
        }

        $single_give.find('#give_checkout_user_info').addClass('ls ms');

        $single_give.find('#give_checkout_user_info').find('.form-row').each(function () {
           $(this).addClass('form-group').removeClass('form-row');
        });

        $single_give.find('#give-email-wrap').addClass('form-row-first form-row-responsive');

        $single_give.find('#give_checkout_user_info').append($single_give.find('.give-donation-amount'));

        if ( $single_give.find('#give_checkout_user_info').find('.give-donation-amount').hasClass('set-price') ) {
            $single_give.find('#give_checkout_user_info').find('.give-donation-amount').addClass('form-row-last form-row-responsive form-control form-group d-flex align-items-center justify-content-center').removeClass('give-donation-amount');
        } else {
            $single_give.find('#give_checkout_user_info').find('.give-donation-amount').addClass('form-row-last form-row-responsive form-group').removeClass('give-donation-amount');
        }

        $single_give.find('.give-submit').addClass('btn btn-maincolor');

        //search modal
        $(".search_modal_button").on('click', function (e) {
            e.preventDefault();
            $('#search_modal').modal('show').find('input').first().focus();
        });

        //login modal
        $(".login_modal_window").on('click', function(e){
            e.preventDefault();
            $(this).closest('.modal').find('.remove').trigger('click');
            $('#login_modal').modal('show').addClass('center').find('input').first().focus();
        });

        $(".contact_modal_window").on('click', function(e){
            e.preventDefault();
            $(this).closest('.modal').find('.remove').trigger('click');
            $('#contact_modal').modal('show').addClass('center').find('input').first().focus();
        });

        $(".registrate_modal_window").on('click', function(e){
            e.preventDefault();
            $(this).closest('.modal').find('.remove').click();
            $('#registrate_modal').modal('show').addClass('center').find('input').first().focus();
        });

        $(".modal_window .remove").on('click', function(e){
            e.stopPropagation();
            $('body').click();
        });

        //Add placeholders
        var login_modal = $('.modal_login_form');
        login_modal.find('.login-username input').attr('placeholder','Email');
        login_modal.find('.login-password input').attr('placeholder','Password');

        //Rederecting form checkbox
        var $loginform = $('#loginform');
        $loginform.find('.login-remember').addClass('checkbox form-group');
        $loginform.find('.login-remember label').attr('for','rememberme').before($loginform.find('.login-remember input'));

        //Change input on btn in login modal window
        var btn_name = $loginform.find('.login-submit input:first').attr('name');
        var btn_id = $loginform.find('.login-submit input:first').attr('id');
        var btn_value = $loginform.find('.login-submit input:first').attr('value');

        $loginform.find('.login-submit input:first').remove();
        $loginform.find('.login-submit').append('<button class="btn btn-maincolor btn-short mt-10" type="submit"></button>');
        $loginform.find('.login-submit button').attr({
            'name' : btn_name,
            'id' : btn_id,
        }).text(btn_value);

        // Btn change
        $('.btn-change').each(function () {
            var self = $(this);
            self.hide();
            self.after('<button class="btn btn-maincolor m-0 btn-short" type="submit">' + self.val() + '</button>');
        });

        $('.btn-change.btn-radius').each(function () {
            var self = $(this);
            self.next().addClass('btn-radius');
        });

        $('.btn-change.btn-small').each(function () {
            var self = $(this);
            self.next().addClass('btn-small');
        });

        //Change input on btn in contact modal window
        var $contact_modal = $('#contact_modal');
        var btn_class_contact = $contact_modal.find('input[type="submit"]').attr('class');
        var btn_value_contact = $contact_modal.find('input[type="submit"]').attr('value');
        $contact_modal.find('input[type="submit"]').after('<button type="submit"></button>');
        $contact_modal.find('input[type="submit"]').hide();
        $contact_modal.find('button').attr({
            'class' : btn_class_contact + ' ml-0 mt-40',
        }).text(btn_value_contact);

        //MailChimp subscribe form processing
        $('.signup').on('submit', function (e) {
            e.preventDefault();
            var $form = $(this);
            // update user interface
            $form.find('.response').html('Adding email address...');
            // Prepare query string and send AJAX request
            jQuery.ajax({
                url: 'mailchimp/store-address.php',
                data: 'ajax=true&email=' + escape($form.find('.mailchimp_email').val()),
                success: function (msg) {
                    $form.find('.response').html(msg);
                }
            });
        });

        //twitter
        if ($().tweet) {
            $('.twitter').tweet({
                modpath: "./twitter/",
                count: 2,
                avatar_size: 48,
                loading_text: 'loading twitter feed...',
                join_text: 'auto',
                username: 'michaeljackson',
                template: "{avatar}<div class=\"tweet_right\">{join}<span class=\"tweet_text links-maincolor\">{tweet_text}</span>{time}</div>"
            });
        }

        // init timetable
        var $timetable = $('#timetable');
        if ($timetable.length) {
            // bind filter click
            $('#timetable_filter').on('click', 'a', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var $thisA = $(this);
                if ($thisA.hasClass('selected')) {
                    // return false;
                    return;
                }
                var selector = $thisA.attr('data-filter');
                $timetable
                    .find('tbody td')
                    .removeClass('current')
                    .end()
                    .find(selector)
                    .closest('td')
                    .addClass('current');
                $thisA.closest('ul').find('a').removeClass('selected');
                $thisA.addClass('selected');
            });
        }

        //placeholders to inputs
        putPlaceholdersToInputs();
    }

//function that initiating template plugins on window.load event
    function windowLoadInit() {
        //////////////
        //flexslider//
        //////////////
        if ($().flexslider) {
            //Team Slider Shortcode
            $('.flexslider.team-slider').flexslider({
                directionNav: false,
                manualControls: ".flex-control-nav-1 li.menu__item"
            });

            var $introSlider = $(".page_slider .flexslider");
            $introSlider.each(function (index) {
                var $currentSlider = $(this);
                var data = $currentSlider.data();
                var nav = (data.nav !== 'undefined') ? data.nav : true;
                var dots = (data.dots !== 'undefined') ? data.dots : true;
                var speed = (data.speed !== 'undefined') ? data.speed : 7000;

                $currentSlider.flexslider({
                    animation: "fade",
                    pauseOnHover: true,
                    useCSS: true,
                    controlNav: dots,
                    directionNav: nav,
                    prevText: "",
                    nextText: "",
                    smoothHeight: false,
                    slideshowSpeed: speed,
                    animationSpeed: 600,
                    start: function (slider) {
                        slider.find('.intro_layers').children().css({'visibility': 'hidden'});
                        slider.find('.flex-active-slide .intro_layers').children().each(function (index) {
                            var self = $(this);
                            var animationClass = !self.data('animation') ? 'fadeInRight' : self.data('animation');
                            setTimeout(function () {
                                self.addClass("animated " + animationClass);
                            }, index * 250);
                        });
                    },
                    after: function (slider) {
                        slider.find('.flex-active-slide .intro_layers').children().each(function (index) {
                            var self = $(this);
                            var animationClass = !self.data('animation') ? 'fadeInRight' : self.data('animation');
                            setTimeout(function () {
                                self.addClass("animated " + animationClass);
                            }, index * 250);
                        });
                    },
                    end: function (slider) {
                        slider.find('.intro_layers').children().each(function () {
                            var self = $(this);
                            var animationClass = !self.data('animation') ? 'fadeInRight' : self.data('animation');
                            self.removeClass('animated ' + animationClass).css({'visibility': 'hidden'});
                        });
                    },

                })
            }); //.page_slider flex slider

            $(".flexslider").each(function (index) {
                var $currentSlider = $(this);
                //exit if intro slider already activated
                if ($currentSlider.find('.flex-active-slide').length) {
                    return;
                }
                $currentSlider.flexslider({
                    animation: "fade",
                    useCSS: true,
                    controlNav: fade,
                    directionNav: true,
                    prevText: "",
                    nextText: "",
                    smoothHeight: false,
                    slideshowSpeed: 5000,
                    animationSpeed: 800,
                })
            });
        }

        ////////////////
        //owl carousel//
        ////////////////
        if ($().owlCarousel) {
            $('.owl-carousel').each(function () {
                var $carousel = $(this);
                $carousel.find('> *').each(function (i) {
                    $(this).attr('data-index', i);
                });
                var data = $carousel.data();

                var loop = data.loop ? data.loop : false,
                    margin = (data.margin || data.margin === 0) ? data.margin : 30,
                    nav = data.nav ? data.nav : false,
                    navPrev = data.navPrev ? data.navPrev : '<i class="fa fa-chevron-left">',
                    navNext = data.navNext ? data.navNext : '<i class="fa fa-chevron-right">',
                    dots = data.dots ? data.dots : false,
                    themeClass = data.themeclass ? data.themeclass : 'owl-theme',
                    center = data.center ? data.center : false,
                    items = data.items ? data.items : 4,
                    autoplay = data.autoplay ? data.autoplay : false,
                    responsiveXs = data.responsiveXs ? data.responsiveXs : 1,
                    responsiveSm = data.responsiveSm ? data.responsiveSm : 2,
                    responsiveMd = data.responsiveMd ? data.responsiveMd : 3,
                    responsiveLg = data.responsiveLg ? data.responsiveLg : 4,
                    responsiveMl = data.responsiveMl ? data.responsiveMl : responsiveLg,
                    responsiveXl = data.responsiveXl ? data.responsiveXl : responsiveLg,
                    draggable = (data.draggable === false) ? data.draggable : true,
                    syncedClass = (data.syncedClass) ? data.syncedClass : false,
                    filters = data.filters ? data.filters : false;

                if (filters) {
                    $carousel.after($carousel.clone().addClass('owl-carousel-filter-cloned'));
                    $(filters).on('click', 'a', function (e) {
                        //processing filter link
                        e.preventDefault();
                        if ($(this).hasClass('selected')) {
                            return;
                        }
                        var filterValue = $(this).attr('data-filter');
                        $(this).siblings().removeClass('selected active');
                        $(this).addClass('selected active');

                        //removing old items
                        for (var i = $carousel.find('.owl-item').length - 1; i >= 0; i--) {
                            $carousel.trigger('remove.owl.carousel', [1]);
                        }
                        ;

                        //adding new items
                        var $filteredItems = $($carousel.next().find(' > ' + filterValue).clone());
                        $filteredItems.each(function () {
                            $carousel.trigger('add.owl.carousel', $(this));
                            $(this).addClass('scaleAppear');
                        });

                        $carousel.trigger('refresh.owl.carousel');

                        //reinit prettyPhoto in filtered OWL carousel
                        if ($().prettyPhoto) {
                            $carousel.find("a[data-gal^='prettyPhoto']").prettyPhoto({
                                hook: 'data-gal',
                                theme: 'facebook' /* light_rounded / dark_rounded / light_square / dark_square / facebook / pp_default*/
                            });
                        }
                    });

                } //filters

                $carousel.owlCarousel({
                    loop: loop,
                    margin: margin,
                    nav: nav,
                    autoplay: autoplay,
                    dots: dots,
                    themeClass: themeClass,
                    center: center,
                    navText: [navPrev, navNext],
                    mouseDrag: draggable,
                    touchDrag: draggable,
                    items: items,
                    responsive: {
                        0: {
                            items: responsiveXs
                        },
                        767: {
                            items: responsiveSm
                        },
                        992: {
                            items: responsiveMd
                        },
                        1200: {
                            items: responsiveLg
                        },
                        1400:{
                            items: responsiveMl
                        },
                        1860:{
                            items: responsiveXl
                        }
                    },
                })
                    .addClass(themeClass);
                if (center) {
                    $carousel.addClass('owl-center');
                }

                $window.on('resize', function () {
                    $carousel.trigger('refresh.owl.carousel');
                });

                //topline two synced carousels
                if ($carousel.hasClass('owl-news-slider-items') && syncedClass) {
                    $carousel.on('changed.owl.carousel', function (e) {
                        var indexTo = loop ? e.item.index + 1 : e.item.index;
                        $(syncedClass).trigger('to.owl.carousel', [indexTo]);
                    })
                }


            });


        } //eof owl-carousel
        jQuery('.testimonials-owl-dots').each(function () {
            var $owl1 = jQuery(this);
            var $owl2 = $owl1.next('.testimonials-owl-content');

            $owl2.on('change.owl.carousel', function (event) {
                if (event.namespace && event.property.name === 'position') {
                    var target = event.relatedTarget.relative(event.property.value, true);
                    $owl1.owlCarousel('to', target, 300, true);
                }
            });
        });


        ////////////////////
        //header processing/
        ////////////////////
        //stick header to top
        //wrap header with div for smooth sticking
        var $header = $('.page_header').first();
        var boxed = $header.closest('.boxed').length;
        var headerSticked = $('.header_side_sticked').length;
        var headerStickedDisabled = ($body.hasClass('header_disable_affix_xl') && $body.hasClass('header_disable_affix_xs')) ? true : false;
        if ($header.length) {
            //hiding main menu 1st levele elements that do not fit width
            menuHideExtraElements();
            //mega menu
            initMegaMenu(1);

            if (!headerStickedDisabled) {

                //wrap header for smooth stick and unstick
                var headerHeight = $header.outerHeight();
                //wrap header only if it not inside .header_absolute class
                $header.wrap('<div class="page_header_wrapper"></div>');
                var $headerWrapper = $('.page_header_wrapper');
                var $header_abs = $('.header_absolute');
                var $top_line = $('.page_topline');
                if (!boxed) {
                    $headerWrapper.css({height: headerHeight});
                }

                if ($header_abs.hasClass('ls')) {
                    $top_line.addClass('ls');
                    if ($header.hasClass('ms')) {
                        $top_line.addClass('ms');
                    }
                } else if ($header_abs.hasClass('ds')) {
                    $top_line.addClass('ds');
                    if ($header_abs.hasClass('bs')) {
                        $top_line.addClass('bs');
                    }
                    if ($header_abs.hasClass('ms')) {
                        $top_line.addClass('ms');
                    }
                } else if ($header_abs.hasClass('cs')) {
                    $top_line.addClass('cs');
                    if ($header_abs.hasClass('cs2')) {
                        $top_line.addClass('cs2');
                    }
                    if ($header_abs.hasClass('cs3')) {
                        $top_line.addClass('cs3');
                    }
                }

                //headerWrapper background - same as header
                if ($header.hasClass('ls')) {
                    $headerWrapper.addClass('ls');
                    if ($header.hasClass('ms')) {
                        $headerWrapper.addClass('ms');
                    }
                } else if ($header.hasClass('ds')) {
                    $headerWrapper.addClass('ds');
                    if ($header.hasClass('bs')) {
                        $headerWrapper.addClass('bs');
                    }
                    if ($header.hasClass('ms')) {
                        $headerWrapper.addClass('ms');
                    }

                } else if ($header.hasClass('cs')) {
                    $headerWrapper.addClass('cs');
                    if ($header.hasClass('cs2')) {
                        $headerWrapper.addClass('cs2');
                    }
                    if ($header.hasClass('cs3')) {
                        $headerWrapper.addClass('cs3');
                    }
                } else if ($header.hasClass('gradient-background')) {
                    $headerWrapper.addClass('gradient-background');
                }

                //get offset
                var headerOffset = 0;
                //check for sticked template headers
                if (!boxed && !($headerWrapper.css('position') === 'fixed')) {
                    headerOffset = $header.offset().top;
                }

                //for boxed layout - show or hide main menu elements if width has been changed on affix
                $header.on('affixed-top.bs.affix affixed.bs.affix affixed-bottom.bs.affix', function (e) {
                    if ($header.hasClass('affix-top')) {
                        $headerWrapper.removeClass('affix-wrapper affix-bottom-wrapper').addClass('affix-top-wrapper');
                        if ( $header.hasClass('color-change') ) {
                            $header.removeClass('ds bs ms ls cs').addClass('ds');
                        }
                    } else if ($header.hasClass('affix')) {
                        $headerWrapper.removeClass('affix-top-wrapper affix-bottom-wrapper').addClass('affix-wrapper');
                        if ( $header.hasClass('color-change') ) {
                            $header.removeClass('ds').addClass('ls');
                        }
                    } else if ($header.hasClass('affix-bottom')) {
                        $headerWrapper.removeClass('affix-wrapper affix-top-wrapper').addClass('affix-bottom-wrapper');
                    } else {
                        $headerWrapper.removeClass('affix-wrapper affix-top-wrapper affix-bottom-wrapper');
                    }

                    //calling this functions disable menu items animation when going from affix to affix-top with centered logo inside
                    //in boxed layouts header is always fixed
                    if (boxed && !($header.css('position') === 'fixed')) {
                        menuHideExtraElements();
                        initMegaMenu(1);
                    }
                    if (headerSticked) {
                        initMegaMenu(1);
                    }

                });

                //if header has different height on afixed and affixed-top positions - correcting wrapper height
                $header.on('affixed-top.bs.affix', function () {
                    // $headerWrapper.css({height: $header.outerHeight()});
                });

                //fixing auto affix bug - toggle affix on click when page is at the top
                $header.on('affix.bs.affix', function () {
                    if (!$window.scrollTop()) return false;
                });

                $header.affix({
                    offset: {
                        top: headerOffset,
                        bottom: -10
                    }
                });
            } //headerStickedDisabled
        } //$header.length if check

        //aside affix
        initAffixSidebar();

        $body.scrollspy('refresh');

        //appear plugin is used to elements animation, counter, pieChart, bootstrap progressbar
        if ($().appear) {
            //animation to elements on scroll
            var $animate = $('.animate');
            $animate.appear();

            $animate.filter(':appeared').each(function (index) {
                initAnimateElement($(this), index);
            });

            $body.on('appear', '.animate', function (e, $affected) {
                $($affected).each(function (index) {
                    initAnimateElement($(this), index);
                });
            });

            //counters init on scroll
            if ($().countTo) {
                var $counter = $('.counter');
                $counter.appear();

                $counter.filter(':appeared').each(function () {
                    initCounter($(this));
                });
                $body.on('appear', '.counter', function (e, $affected) {
                    $($affected).each(function () {
                        initCounter($(this));
                    });
                });
            }

            //bootstrap animated progressbar
            if ($().progressbar) {
                var $progressbar = $('.progress .progress-bar');
                $progressbar.appear();

                $progressbar.filter(':appeared').each(function () {
                    initProgressbar($(this));
                });
                $body.on('appear', '.progress .progress-bar', function (e, $affected) {
                    $($affected).each(function () {
                        initProgressbar($(this));
                    });
                });
                //animate progress bar inside bootstrap tab
                $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                    initProgressbar($($(e.target).attr('href')).find('.progress .progress-bar'));
                });
                //animate progress bar inside bootstrap dropdown
               
            }

            //circle progress bar
            if ($().easyPieChart) {
                var $chart = $('.chart');

                $chart.appear();

                $chart.filter(':appeared').each(function () {
                    initChart($(this));
                });
                $body.on('appear', '.chart', function (e, $affected) {
                    $($affected).each(function () {
                        initChart($(this));
                    });
                });

            }

        } //appear check

        //Flickr widget
        // use http://idgettr.com/ to find your ID
        if ($().jflickrfeed) {
            var $flickr = $("#flickr, .flickr_ul");
            if ($flickr.length) {
                if (!($flickr.hasClass('flickr_loaded'))) {
                    $flickr.jflickrfeed({
                        flickrbase: "http://api.flickr.com/services/feeds/",
                        limit: 4,
                        qstrings: {
                            id: "131791558@N04"
                        },
                        itemTemplate: '<a href="{{image_b}}" class="photoswipe-link"><li><img alt="{{title}}" src="{{image_m}}" /></li></a>'
                        //complete
                    }, function (data) {
                        initPhotoSwipe();
                    }).addClass('flickr_loaded');
                }
            }
        }

        // Instagram widget
        if ($().spectragram) {
            var Spectra = {
                instaToken: '3905738328.60c782d.b65ed3f058d64e6ab32c110c6ac12d9b',
                instaID: '60c782dfecaf4050b59ff4c159246641',

                init: function () {
                    jQuery.fn.spectragram.accessData = {
                        accessToken: this.instaToken,
                        clientID: this.instaID
                    };

                    //available methods: getUserFeed, getRecentTagged
                    $('.instafeed').each(function () {
                        var $this = $(this);
                        if ($this.find('img').length) {
                            return;
                        }
                        $this.spectragram('getRecentTagged', {
                            max: 8,
                            //pass username if you are using getUserFeed method
                            query: 'grey',
                            wrapEachWith: '<div class="photo">'
                        });
                    });
                }
            }

            Spectra.init();
        }

        // init Isotope
        $('.isotope-wrapper').each(function (index) {
            var $container = $(this);
            var layoutMode = ($container.hasClass('masonry-layout')) ? 'masonry' : 'fitRows';
            var columnWidth = ($container.children('.col-lg-3').length) ? '.col-lg-3' : false;
            $container.isotope({
                percentPosition: true,
                layoutMode: layoutMode,
                masonry: {
                    columnWidth: columnWidth
                }
            });

            var $filters = $container.attr('data-filters') ? $($container.attr('data-filters')) : $container.prev().find('.filters');
            // bind filter click
            if ($filters.length) {
                $filters.on('click', 'a', function (e) {
                    e.preventDefault();
                    var $thisA = $(this);
                    var filterValue = $thisA.attr('data-filter');
                    $container.isotope({filter: filterValue});
                    $thisA.siblings().removeClass('selected active');
                    $thisA.addClass('selected active');
                });
                //for works on select
                $filters.on('change', 'select', function (e) {
                    e.preventDefault();
                    var filterValue = $(this).val();
                    $container.isotope({filter: filterValue});
                });
            }
        });

        // Select

        // wrap select fields
        jQuery('select').each(function() {
            var s = jQuery(this);
            s.wrap('<div class="select_container"></div>');
        });

        ////////////////
        //TESTIMONIALS//
        ////////////////

        var $testimonials_owl = $('.testimonials-owl');
        var $testimonials_children_length = $testimonials_owl.find('.owl-item:not(.cloned)').children().length;
        if ($testimonials_children_length <= 10) {
            var text = ' / 0' + $testimonials_children_length;
        } else {
            var text = ' / ' + $testimonials_children_length;
        }
        $testimonials_owl.find('.owl-dots').append(text);

        // Custom nav of owl carousel
        var $carouselSection = $('.owl_custom_nav');
        var $carouselNav = $carouselSection.next('.owl-custom-nav');
        $carouselNav.find('.owl-prev').on('click', function () {
            $carouselSection.trigger('prev.owl');
        });
        $carouselNav.find('.owl-next').on('click', function () {
            $carouselSection.trigger('next.owl');
        });

        if ($carouselSection.find('.owl-nav').hasClass('disabled')) $carouselNav.addClass('disabled');

        // Custom nav of owl carousel
        let $carouselSection2 = $('.owl_custom_nav_2');
        let $carouselNav2 = $carouselSection2.closest('.row').find('.owl-custom-nav-2');
        $carouselNav2.find('.owl-prev').on('click', function () {
            $carouselSection2.trigger('prev.owl');
        });
        $carouselNav2.find('.owl-next').on('click', function () {
            $carouselSection2.trigger('next.owl');
        });

        if ($carouselSection2.find('.owl-nav').hasClass('disabled')) $carouselNav2.addClass('disabled');


        ///////////////////
        //Domain Checker///
        ///////////////////
        var $wdc = $('#wdc-style');
        $wdc.find('.btn').removeClass('btn-default').removeClass('btn-info').addClass('btn-maincolor2 btn-short').text('Search');
        $wdc.find('.input-group').removeClass('small');
        $wdc.find('#Search').attr('placeholder','Type your domain address');

        //////////////////
        //Parallax mouse//
        //////////////////

        function Parallax(options){
            options = options || {};
            this.nameSpaces = {
                wrapper: options.wrapper || '.parallax',
                layers: options.layers || '.parallax-layer',
                deep: options.deep || 'data-parallax-deep'
            };
            this.init = function() {
                var self = this,
                    parallaxWrappers = document.querySelectorAll(this.nameSpaces.wrapper);
                for(var i = 0; i < parallaxWrappers.length; i++){
                    (function(i){
                        parallaxWrappers[i].addEventListener('mousemove', function(e){
                            var x = e.clientX,
                                y = e.clientY,
                                layers = parallaxWrappers[i].querySelectorAll(self.nameSpaces.layers);
                            for(var j = 0; j < layers.length; j++){
                                (function(j){
                                    var deep = layers[j].getAttribute(self.nameSpaces.deep),
                                        disallow = layers[j].getAttribute('data-parallax-disallow'),
                                        itemX = (disallow && disallow === 'x') ? 0 : x / deep,
                                        itemY = (disallow && disallow === 'y') ? 0 : y / deep;
                                    if(disallow && disallow === 'both') return;
                                    layers[j].style.transform = 'translateX(' + itemX + '%) translateY(' + itemY + '%)';
                                })(j);
                            }
                        })
                    })(i);
                }

            };
            this.init();
            return this;
        }

        new Parallax();

        //Dropdowns
 

        ////////////////////
        //Special Carousel//
        ////////////////////

        function moveToSelected(element) {
            let selected = '';
            if (element == "next") {
                selected = $(".selected").next();
            } else if (element == "prev") {
                selected = $(".selected").prev();
            } else {
                selected = element;
            }

            let next = $(selected).next();
            let prev = $(selected).prev();
            let prevSecond = $(prev).prev();
            let nextSecond = $(next).next();

            $(selected).removeClass().addClass("selected");

            $(prev).removeClass().addClass("prev");
            $(next).removeClass().addClass("next");

            $(nextSecond).removeClass().addClass("nextRightSecond");
            $(prevSecond).removeClass().addClass("prevLeftSecond");

            $(nextSecond).nextAll().removeClass().addClass('hideRight');
            $(prevSecond).prevAll().removeClass().addClass('hideLeft');

        }
        let specialCarouse = $('.special-carousel .quote-item');
        let specialCarouselLength = specialCarouse.length;

        specialCarouse.each(function (index) {
           let self = $(this);
            if ( index === specialCarouselLength-3 ) {
                self.addClass('prevLeftSecond');
            } else if ( index === specialCarouselLength-2 ) {
               self.addClass('prev');
           } else if (index === specialCarouselLength-1) {
               self.addClass('selected');
           } else {
               self.addClass('hideLeft');
           }
        });

        specialCarouse.on('click',function() {
            moveToSelected($(this));
        });

        $('.special-carousel-wrap .prev-btn').on('click',function() {
            moveToSelected('prev');
        });

        $('.special-carousel-wrap .next-btn').on('click',function() {
            moveToSelected('next');
        });

        //custom-input-field
        $(".custom-input-field").on("change", function(){
            let self = $(this);
            self.find("span").attr("data-text", self.find('input').val().replace(/.*(\/|\\)/, '') );
        });

        /*back button*/
        $("#back-btn").on('click', function (e) {
            e.preventDefault();
            window.history.back();
        });

        if ( document.querySelector('.fw-flash-messages') ) {
            var coordinate = $('.form-wrapper ').offset().top;
            $body.scrollTo(coordinate-300,0);
        }

        //Custom Navigation
        (function () {
            let $carouseCustom = $('.owl-custom-nav');
            let $carouseCustomSection = $carouseCustom.closest('section');
            $carouseCustomSection.find('.owl-custom-nav .owl-prev').on('click', function (e) {
                e.preventDefault();
                $carouseCustomSection.find('.owl-carousel').trigger('prev.owl');
            });
            $carouseCustomSection.find('.owl-custom-nav .owl-next').on('click', function (e) {
                e.preventDefault();
                $carouseCustomSection.find('.owl-carousel').trigger('next.owl');
            });
        })();

        //Filters for grid tilled gallery

        (function () {
            let $container = $('.grid-container');
            var $filters = $container.attr('data-filters') ? $($container.attr('data-filters')) : $container.prev().find('.filters');
            // bind filter click
            if ($filters.length) {
                $filters.on( 'click', 'a', function( e ) {
                    e.preventDefault();
                    // Filters menu
                    var $thisA = $(this);
                    var filterValue = $thisA.attr('data-filter');
                    $thisA.siblings().removeClass('selected active');
                    $thisA.addClass('selected active');

                    // Filters elements
                    let boxs = document.querySelectorAll('.grid-box');
                    boxs.forEach( function (box) {
                        box.classList.add('hide');
                        let timeout = setTimeout(function () {
                            box.classList.add('d-none');
                        }, 300);
                        let toggle = function () {
                            box.classList.remove('hide');
                            clearTimeout(timeout);
                            box.classList.remove('d-none');
                        };
                        ( filterValue === '*' ||  box.classList.contains(filterValue.slice(1) ) ) ? toggle() : true;
                    } );
                });
            }
        })();


        /////////
        //SHOP///
        /////////

        (function () {
            if ( window.location.pathname.indexOf('forecast') > -1 ) {
                let location = window.location.pathname.slice(0,-1);
                let index = location.lastIndexOf('/');
                let nameForecast = location.slice(index+1);
                if ( document.getElementsByClassName(nameForecast)[0] ) {
                    document.getElementsByClassName(nameForecast)[0].classList.add('current-menu-item');
                }
            }
        })();

        // Toggle Button for shop
        (function () {
            let className = $('.products-selection').next().attr('class');
            let toggleView = $('.products-selection .toggle_view');
            let removeActive = () => {
                toggleView.find('.active').each(function () {
                    $(this).removeClass('active')
                });
            };
            let changeClassFromTo = (self, from, to) => {
                self.closest('.products-selection').next().removeClass(from).addClass(to);
            };
            toggleView.find('.full').on('click', function (e) {
                e.preventDefault();
                let self =  $(this);
                removeActive();
                changeClassFromTo(self, className, 'products columns-1');
                self.addClass('active');
            });

            toggleView.find('.grid').on('click', function (e) {
                e.preventDefault();
                let self =  $(this);
                removeActive();
                changeClassFromTo(self, 'products columns-1', className);
                self.addClass('active');
            });
        })();

        //Update shop card
        (function () {
            let updateCard = () => {
                let shopTable = $('.shop_table');
                shopTable.find('.quantity input[type="number"]').on('change', function () {
                    setTimeout(function () {
                        shopTable.find('button[name="update_cart"]').trigger('click');
                    },300)
                });
            };

            $('#toggle_shop_view').on('click', function (e) {
                e.preventDefault();
                $(this).toggleClass('grid-view');
                $('#products').toggleClass('grid-view list-view');
            });

            let quantity_init = () => {
                var $numberInput = $('input[type="number"]');
                $numberInput.before('<input type="button" value="+" class="plus"><i class="fa fa-caret-up" aria-hidden="true"></i>');
                $numberInput.after('<input type="button" value="-" class="minus"><i class="fa fa-caret-down" aria-hidden="true"></i>');

                $('.plus').on('click', function (e) {
                    var numberField = $(this).parent().find('[type="number"]');
                    var currentVal = ( numberField.val() === '' ) ? 0 : numberField.val();
                    numberField.val(parseFloat(currentVal) + 1).trigger('change');
                });
                $('.minus').on('click', function (e) {
                    var numberField = $(this).parent().find('[type="number"]');
                    var currentVal = numberField.val();
                    numberField.val(parseFloat(currentVal) - 1).trigger('change');
                    if(currentVal < 2){
                        numberField.val(1);
                    }
                });
            };

            quantity_init();
            updateCard();

            $body.on('updated_cart_totals', function (e) {
                quantity_init();
                updateCard();
            });
        })();

        // Review link
        $('a.woocommerce-review-link').on('click', function () {
            $('.reviews_tab a').trigger('click');
            return true;
        });

        //parsing URL hash
        var hash = window.location.hash;
        var url = window.location.href;
        var $tabs = $('.wc-tabs, ul.tabs').first();

        if (hash.toLowerCase().indexOf('comment-') >= 0 || hash === '#reviews' || hash === '#tab-reviews') {
            $tabs.find('li.reviews_tab a').trigger('click');
        } else if (url.indexOf('comment-page-') > 0 || url.indexOf('cpage=') > 0) {
            $tabs.find('li.reviews_tab a').trigger('click');
        } else if (hash === '#tab-additional_information') {
            $tabs.find('li.additional_information_tab a').trigger('click');
        } else {
            $tabs.find('li:first a').trigger('click');
        }


        //woocommerce related products, upsells products
        $('.related.products ul.products, .upsells.products ul.products, .cross-sells ul.products')
            .addClass('owl-carousel top-right-nav')
            .owlCarousel({
                loop: false,
                autoplay: true,
                margin: 0,
                nav: true,
                dots: false,
                items: 3,
                navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
                responsive: {
                    0: {
                        items: 1
                    },
                    767: {
                        items: 2
                    },
                    992: {
                        items: 2
                    },
                    1200: {
                        items: 3
                    }
                }
            });

            $("#owl").owlCarousel({
                loop: false,
                autoplay: true,
                margin: 0,
                nav: true,
                dots: false,
                items: 3,
                navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
                responsive: {
                    0: {
                        items: 1
                    },
                    767: {
                        items: 2
                    },
                    992: {
                        items: 2
                    },
                    1200: {
                        items: 3
                    }
                }
            });

        //color filter
        $(".color-filters").find("a[data-background-color]").each(function () {
            $(this).css({"background-color": $(this).data("background-color")});
        });

        (function () {
            $('.uws-products.carousel-layout').each(function(){
                var $products = $( this );
                var $carouselColumns = Number($products.attr('class').slice($products.attr('class').indexOf('carousel-col-')).replace('carousel_col_', ''));

                var $responsiveLg, $responsiveMd, $responsiveSm;
                switch ($carouselColumns) {
                    case 1:
                        $responsiveLg = 1;
                        $responsiveMd = 1;
                        $responsiveSm = 1;
                        break;
                    case 2:
                        $responsiveLg = 2;
                        $responsiveMd = 2;
                        $responsiveSm = 2;
                        break;
                    case 3:
                        $responsiveLg = 3;
                        $responsiveMd = 2;
                        $responsiveSm = 2;
                        break;
                    case 5:
                        $responsiveLg = 5;
                        $responsiveMd = 3;
                        $responsiveSm = 2;
                        break;
                    case 6:
                        $responsiveLg = 6;
                        $responsiveMd = 4;
                        $responsiveSm = 3;
                        break;
                    default:
                        $responsiveLg = 4;
                        $responsiveMd = 3;
                        $responsiveSm = 2;
                }

                $products.find('ul.products').addClass('owl-carousel').owlCarousel({
                    loop: true,
                    margin: 0,
                    nav: false,
                    dots: false,
                    autoplay: true,
                    center: !!$(this).hasClass('carousel-center'),
                    items: $carouselColumns,
                    responsive: {
                        0: {
                            items: 1
                        },
                        767: {
                            items: $responsiveSm
                        },
                        992: {
                            items: $responsiveMd
                        },
                        1200: {
                            items: $responsiveLg
                        }
                    },
                });
            });
        })();

        if ( document.querySelector('.owl-carousel.sync1') ) {
            $('.owl-carousel.sync1').each(function () {
                var $owl1 = $(this);
                var $owl2 = $('.owl-carousel.sync2');

                $owl1.on('click', '.owl-item', function() {
                    var carousel = $owl2.data('owl.carousel');
                    carousel.to(carousel.relative($(this).index()));
                });

                $owl1.on('change.owl.carousel', function (event) {
                    if (event.namespace && event.property.name === 'position') {
                        var target = event.relatedTarget.relative(event.property.value, true);
                        $owl2.owlCarousel('to', target, 300, true);
                    }
                });

            });
        }


        ////////////////
        // end of SHOP//
        ////////////////

        // Footer menu count
        var $list = $('.page_footer ul');
        var $length = $list.children().length;
        if ($length > 5) {
            $list.addClass('count');
        }


        //Unyson or other messages modal
        var $messagesModal = $('#messages_modal');
        if ($messagesModal.find('ul').length) {
            $messagesModal.modal('show');
        }

        //page preloader
        $(".preloader_img, .preloader_css").fadeOut(800);
        setTimeout(function () {
            $(".preloader").fadeOut(800, function () {

            });
        }, 200);
    }//eof windowLoadInit

    $(function () {
        documentReadyInit();
        initGoogleMap();
    });

    $window.on('load', function () {
        windowLoadInit();
    }); //end of "window load" event

    $window.on('resize', function () {

        $body.scrollspy('refresh');

        //header processing
        menuHideExtraElements();
        initMegaMenu(1);
        var headerStickedDisabled = ($body.hasClass('header_disable_affix_xl') && $body.hasClass('header_disable_affix_xs')) ? true : false;
        if (!headerStickedDisabled) {
            var $header = $('.page_header').first();
            //checking document scrolling position
            if ($header.length && !$(document).scrollTop() && $header.first().data('bs.affix')) {
                $header.first().data('bs.affix').options.offset.top = $header.offset().top;
            }
            if (!$header.closest('.boxed').length) {
                var affixed = false;
                if ($header.hasClass('affix')) {
                    affixed = true;
                    //animation duration
                    $header.removeClass('affix');

                    setTimeout(function () {
                        //editing header wrapper height for smooth stick and unstick
                        $(".page_header_wrapper").css({height: $header.first().outerHeight()});
                        $header.addClass('affix');
                    }, 350);
                }

                if (!affixed) {
                    //editing header wrapper height for smooth stick and unstick
                    $(".page_header_wrapper").css({height: $header.first().outerHeight()});
                }
            }
        }//headerStickedDisabled
    });
//end of IIFE function
})(jQuery);

