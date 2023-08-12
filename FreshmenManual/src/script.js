import * as MyFunction from './function.js';

$(document).ready(() => {
    MyFunction.setClick()

    $(".OPENGuide").on('click', () => {
        if($(".DataPageGuide").css('display') === 'none')
        {
            $(".DataPageGuide").css('display', 'block');
            $(".OPENGuide").text('(Close)>>');
            $(".OPENGuide").css("left","26.5%");
        }
        else
        {
            $(".DataPageGuide").css('display', 'none');
            $(".OPENGuide").text('<<(Guide)');
            $(".OPENGuide").css("left","3%");
        }

        
    })
})