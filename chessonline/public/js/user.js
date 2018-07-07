console.log($('.chess-background').offset().left-$('.user_box').width()-20+'px');
$('.user_box').css('left', $('.chess-background').offset().left-$('.user_box').width()-20+'px');
$('.ready_button').css('left', $('.chess-background').offset().left+$('.chess-background').width()/2-$('.ready_button').width()/2+'px');

