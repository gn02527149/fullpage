$(function() {
    //--init--
    var $imgItems = $('.gallery__items').children(),
        $prevBtn = $('.gallery__navIcon--prev'),
        $nextBtn = $('.gallery__navIcon--next'),
        _len = $imgItems.length,
        _currIdx = 0, //當前 image id
        _isLoop = true; //是否循環播放

    //--helper--
    function isPrev(id) {
        if (_currIdx === 0) {
            return id === _len - 1;
        } else {
            return id === _currIdx - 1;
        }
    }

    function isNext(id) {
        if (_currIdx === _len - 1) {
            return id === 0;
        } else {
            return id === _currIdx + 1;
        }
    }

    function isActive(id) {
        return id === _currIdx;
    }

    function hasNext() {
        return _currIdx < _len - 1;
    }

    function hasPrev() {
        return _currIdx > 0;
    }

    function nextPage() {
        if (_currIdx < _len - 1) {
            _currIdx++;
        } else {
            _currIdx = 0;
        }
        return;
    }

    function prevPage() {
        if (_currIdx > 0) {
            _currIdx--;
        } else {
            _currIdx = _len - 1;
        }
        return;
    }

    function renderView() {
        //render btns 
        if (!hasNext() && !_isLoop) {
            $nextBtn.hide();
        } else if (!hasPrev() && !_isLoop) {
            $prevBtn.hide();
        } else {
            $nextBtn.show();
            $prevBtn.show();
        }
        //render gallery
        $imgItems.each(function(id, item) {
            $(item).removeClass().addClass('gallery__item gallery__item--hide');
            if (isPrev(id)) {
                $(item).addClass('gallery__item--prev');
            }
            if (isNext(id)) {
                $(item).addClass('gallery__item--next');
            }
            if (isActive(id)) {
                $(item).addClass('gallery__item--active');
            }
        });
    }

    function init() {
        renderView();
    }

    //--event--
    $nextBtn.on('click', function() {
        nextPage();
        renderView();
    });

    $prevBtn.on('click', function() {
        prevPage();
        renderView();
    });

    init();
});