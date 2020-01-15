(function ($) {
    $.fn.TreeSixtyImageRotate = function (options) {
        let base = this;

        let settings = $.extend({
            // These are the defaults.
            totalFrames: 36,                                // Total number of image you have
            endFrame: 36,                                   // end frame for the auto spin animation
            currentFrame: 0,                                // This the start frame for auto spin
            speed: 50,                                      // speed of auto rotate option
            dragSpeed: 6,                                   // speed of rotation when dragging elements
            progress: ".spinner",                           // selector to show the loading progress
            extension: ".jpg",                              // extension for the images
            imgPrefix: "",
            navigation: true,                               // display navigation
            spinner: true,                                  // disable spinner for loading
            imagesFolder: "images/",                        // path to folder with images
            smallWidth: 400,                                // smaller width for images
            smallHeight: 400,                               // smaller height for images
            largeWidth: 800,                                // larger width for images
            largeHeight: 800,                               // larger height for images
            imagePlaceholderClass: "images-placeholder",    // class for images placeholder
            imgList: "threesixty-images-rotate"             // selector for image list
        }, options);

        /**
         * @method initTreeSixty
         * The function starts creation process of TreeSixtyImageRotate
         */
        base.initTreeSixty = function () {
            base.css({
                "height": settings.smallHeight,
                "width": settings.smallWidth,
                "position": "relative",
                "margin": "auto"
            });
            if (settings.spinner) {
                base.spinner("start");
            }
            this.loadImages();
            if (settings.navigation) {
                base.createNavigation();
            }
            let changeSlide = false, previousSlide = false, nextNext = false, xAxis, nextXAxis;
            base.find(".images-list").on("mousedown touchstart", function (e) {
                e.preventDefault();
                if (e.type === "mousedown") {
                    xAxis = e.pageX;
                } else {
                    xAxis = e.originalEvent.touches[0].pageX;
                }
                changeSlide = true;
            }).on("mousemove touchmove", function (e) {
                if (changeSlide) {
                    if (e.type === "mousemove") {
                        nextXAxis = e.pageX;
                    } else {
                        nextXAxis = e.originalEvent.touches[0].pageX;
                    }
                    if (nextXAxis > xAxis + settings.dragSpeed) {
                        previousSlide = true;
                        xAxis = nextXAxis;
                        base.previous();
                    } else if (nextXAxis < xAxis - settings.dragSpeed) {
                        nextNext = true;
                        xAxis = nextXAxis;
                        base.next();
                    }
                }
            }).on("mouseleave mouseup touchend", function (e) {
                changeSlide = false;
            });
            if (settings.spinner) {
                base.spinner("stop");
            }
        };
        /**
         * @method initTreeSixty
         * Loads images from provided directory
         */
        base.loadImages = function () {
            let imagesDisplay, imagesList, imageContainer, image;

            imagesDisplay = $("<div/>").attr({
                "class": "images-display"
            });

            imagesList = $("<ul/>").attr({
                "class": "images-list"
            });

            for (let i = 0; i < settings.totalFrames + 1; i++) {
                imageContainer = $("<li/>").attr({
                    "class": "images-display image-" + i + ((i === 0) ? " active" : "")
                });
                image = $("<img/>").attr({
                    "src": settings.imagesFolder + settings.imgPrefix + i + settings.extension,
                });

                imageContainer.append(image);
                imagesList.append(imageContainer);
            }
            imagesDisplay.append(imagesList);

            base.append(imagesDisplay);
        };
        /**
         * @method createNavigation
         * Creates navigation menu for TreeSixtyImageRotate display
         */
        base.createNavigation = function () {
            let navigationBarWrapper, navigationBar, next, previous, playStop, resize;

            navigationBarWrapper = $("<div/>").attr("class", "navigation-bar-wrapper");

            navigationBar = $("<div/>").attr("class", "navigation-bar");

            next = $("<div/>").attr({
                "class": "navigation-bar-next"
            });

            previous = $("<div/>").attr({
                "class": "navigation-bar-previous"
            });

            playStop = $("<div/>").attr({
                "class": "navigation-bar-play"
            });

            resize = $("<div/>").attr({
                "class": "navigation-bar-resize"
            });

            navigationBar.append(previous);
            navigationBar.append(playStop);
            navigationBar.append(next);
            navigationBar.append(resize);

            navigationBarWrapper.append(navigationBar);

            base.append(navigationBarWrapper);

            let nextInterval;
            next.on("mousedown touchstart", function (e) {
                e.preventDefault();
                nextInterval = setInterval(function () {
                    base.next()
                }, settings.speed)
            }).on("mouseleave mouseup touchend", function () {
                clearInterval(nextInterval);
            });

            let previousInterval;
            previous.on("mousedown touchstart", function (e) {
                e.preventDefault();
                previousInterval = setInterval(function () {
                    base.previous()
                }, settings.speed)
            }).on("mouseleave mouseup touchend", function () {
                clearInterval(previousInterval);
            });

            let play = false, playStopInterval;
            playStop.on("mousedown touchstart", function (e) {
                e.preventDefault();
                if (!play) {
                    base.find('.navigation-bar-play').addClass('navigation-bar-stop');
                    play = true;
                    playStopInterval = setInterval(function () {
                        base.next()
                    }, settings.speed)
                } else {
                    base.find('.navigation-bar-play').removeClass('navigation-bar-stop');
                    play = false;
                    clearInterval(playStopInterval)
                }
            });
            resize.on("mousedown touchstart", function (e) {
                e.preventDefault();
                base.togleFullScreen();
                // base.resize();
            });

        };
        /**
         * @method spinner
         * Creates loader to be display during content creation
         * Also can hide loader depending on status
         */
        base.spinner = function (status) {
            let spinner;
            spinner = $("<div/>").attr({
                "class": "loading-spinner"
            });
            base.append(spinner);
            if (status === "start") {
                let winWidth = $(window).width();
                if (winWidth > 991) {
                    base.find('.loading-spinner').css({
                        "height": settings.smallHeight,
                        "width": settings.smallWidth,
                    })
                } else {
                    base.find('.loading-spinner').css({
                        "max-height": settings.largeHeight,
                        "max-width": settings.largeWidth,
                        "height": winWidth,
                        "width": winWidth,
                    });
                }
            } else if (status === "stop") {
                base.find('.loading-spinner').css({
                    "display": "none"
                });
            } else {
                console.log("Invalid status for spinner");
            }
        };
        /**
         * @method next
         * Hide current image and next image
         */
        base.next = function () {
            let currentSlide = base.find(".active");
            let imgPositionClass = currentSlide.attr("class").split(/\s+/)[1];
            let imgPossition = parseInt(imgPositionClass.substring(6));
            imgPossition--;
            if (imgPossition < 0) {
                imgPossition = settings.totalFrames;
            }
            let nextImgClass = "image-" + imgPossition;
            base.find("." + nextImgClass).addClass("active");
            currentSlide.removeClass("active");

        };
        /**
         * @method previous
         * Hide current image and previous image
         */
        base.previous = function () {
            let currentSlide = base.find(".active");
            let imgPositionClass = currentSlide.attr("class").split(/\s+/)[1];
            let imgPossition = parseInt(imgPositionClass.substring(6));
            imgPossition++;
            if (imgPossition > settings.totalFrames) {
                imgPossition = 0;
            }
            let nextImgClass = "image-" + imgPossition;
            base.find("." + nextImgClass).addClass("active");
            currentSlide.removeClass("active");
        };
        /**
         * @method togleFullScreen
         * Activates and dissactivates full screen state
         */
        base.togleFullScreen = function () {
            if (!$(document)[0].fullscreenElement &&
                !$(document)[0].mozFullScreenElement && !$(document)[0].webkitFullscreenElement && !$(document)[0].msFullscreenElement) {  // current working methods
                if ($(this)[0].requestFullscreen) {

                    $(this)[0].requestFullscreen();
                } else if ($(this)[0].msRequestFullscreen) {
                    $(this)[0].msRequestFullscreen();
                } else if ($(this)[0].mozRequestFullScreen) {
                    $(this)[0].mozRequestFullScreen();
                } else if ($(this)[0].webkitRequestFullscreen) {
                    $(this)[0].webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                if ($(document)[0].exitFullscreen) {
                    $(document)[0].exitFullscreen();
                } else if ($(document)[0].msExitFullscreen) {
                    $(document)[0].msExitFullscreen();
                } else if ($(document)[0].mozCancelFullScreen) {
                    $(document)[0].mozCancelFullScreen();
                } else if ($(document)[0].webkitExitFullscreen) {
                    $(document)[0].webkitExitFullscreen();
                }
            }
        };
        /**
         * @method resize
         * Toggles style for TreeSixtyImageRotate display when entering/leaving full screen state
         */
        base.resize = function () {
            base.find('.navigation-bar-resize').toggleClass('navigation-bar-resize-small-icon');
            if (!$(document)[0].fullscreenElement &&
                !$(document)[0].mozFullScreenElement && !$(document)[0].webkitFullscreenElement && !$(document)[0].msFullscreenElement) {
                base.find('.images-display').css({
                    "height": "100%",
                    "width": "100%",
                    "margin": "auto"
                });
            } else {
                base.find('.images-display').css({
                    "height": settings.largeHeight,
                    "width": settings.largeWidth,
                    "margin": "auto"
                });
            }
        };


        base.on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function (e) {
            base.resize();
        });
        $(window).resize(function (e) {
            let winWidth = $(window).width();
            if (winWidth > 991) {
                base.css({
                    "height": settings.smallHeight,
                    "width": settings.smallWidth,
                })
            } else {
                base.css({
                    "max-height": settings.largeHeight,
                    "max-width": settings.largeWidth,
                    "height": winWidth,
                    "width": winWidth,
                });
            }
        });
        $(document).ready(function (e) {
            let winWidth = $(window).width();
            if (winWidth > 991) {
                base.css({
                    "height": settings.smallHeight,
                    "width": settings.smallWidth,
                })
            } else {
                base.css({
                    "max-height": settings.largeHeight,
                    "max-width": settings.largeWidth,
                    "height": winWidth,
                    "width": winWidth,
                });
            }
        });

        return base;
    };
})
(jQuery);



