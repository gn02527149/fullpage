$(function() {
    // ------------- VARIABLES ------------- //
    var ticking = false;
    var isFirefox = (/Firefox/i.test(navigator.userAgent));
    var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
    var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive) 
    var slideDurationSetting = 600; //Amount of time for which slide is "locked"
    var currentSlideNumber = 0;
    var totalSlideNumber = $(".background").length;
    var delayTime = 100;

    // ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
    function parallaxScroll(evt) {
        if (isFirefox) {
            //Set delta for Firefox
            delta = evt.detail * (-120);
        } else if (isIe) {
            //Set delta for IE
            delta = -evt.deltaY;
        } else {
            //Set delta for all other browsers
            delta = evt.wheelDelta;
        }

        if (ticking != true) {
            if (delta <= -scrollSensitivitySetting) {
                next();
            }
            if (delta >= scrollSensitivitySetting) {
                prev();
            }
        }

    }

    // ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
    function slideDurationTimeout(slideDuration) {
        setTimeout(function() {
            ticking = false;
        }, slideDuration);
    }

    // ------------- ADD EVENT LISTENER ------------- //
    var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
    window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

    // ------------- SLIDE MOTION ------------- //
    function nextItem() {
        var $previousSlide = $(".background").eq(currentSlideNumber - 1);
        $previousSlide.removeClass("up-scroll").addClass("down-scroll");
    }

    function previousItem() {
        var $currentSlide = $(".background").eq(currentSlideNumber);
        $currentSlide.removeClass("down-scroll");
    }

    function prev() {
        //Up scroll
        ticking = true;
        if (currentSlideNumber !== 0) {
            currentSlideNumber--;
        }
        previousItem();
        slideDurationTimeout(slideDurationSetting);
        $(".side-nav li").eq(currentSlideNumber).addClass("active").siblings().removeClass("active");
    }

    function next() {
        //Down scroll
        ticking = true;
        if (currentSlideNumber !== totalSlideNumber - 1) {
            currentSlideNumber++;
            nextItem();
            $(".side-nav li").eq(currentSlideNumber).addClass("active").siblings().removeClass("active");
        }
        slideDurationTimeout(slideDurationSetting);
    }

    function doTimes(time, direction) {
        if (direction === "next") {
            next();
        } else {
            prev();
        }

        if (time > 1) {
            time -= 1;
            for (var i = 0; i < time; i++) {
                if (direction === "next") {
                    setTimeout(function() {
                        next();
                    }, delayTime);
                } else {
                    setTimeout(function() {
                        prev();
                    }, delayTime);
                }
            }
        }
    }

    $(".side-nav li").click(function() {
        var dataId = $(this).attr("data-id");
        if (currentSlideNumber == dataId) return
        if (currentSlideNumber > dataId) {
            doTimes((currentSlideNumber - dataId), "prev");
        } else {
            doTimes((dataId - currentSlideNumber), "next");
        }
    });
});