var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

let left = document.querySelector('.left')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var isMouseDown = false
  
// var gradient = ctx.createLinearGradient(0, 0, 500, 0);

// gradient.addColorStop('0', 'blue')
// gradient.addColorStop('.50', 'cornflowerblue')
// gradient.addColorStop('1', 'skyblue')

// ctx.fillStyle = gradient;

// ctx.font = '50px fantasy'
// ctx.textAlign = 'center'
// ctx.fillText('Hello World', canvas.width / 2, canvas.height / 2)
  
// code
canvas.onmousedown = function(){
    isMouseDown = true
}
canvas.onmouseup = function(){
    isMouseDown = false
    ctx.beginPath()
}


let thickness = 10
let mainColor = '#000000'
let secondColor = '#000000'
canvas.onmousemove = function(e){
    if( isMouseDown ){
        ctx.lineWidth = thickness * 2
        ctx.lineTo(e.clientX, e.clientY)
        ctx.strokeStyle = mainColor
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(e.clientX, e.clientY, thickness, 0, Math.PI * 2)
        ctx.fillStyle = mainColor 
        ctx.fill()

        ctx.beginPath()
        ctx.moveTo(e.clientX, e.clientY)
    }
}

document.onkeydown = function(e){
    // console.log(e.keyCode)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault(); 
            save();
        }
        else if (e.ctrlKey && e.shiftKey &&e.keyCode === 67) {
            e.preventDefault(); 
            clear();
        }
        else if (e.ctrlKey && e.keyCode === 81) {
            e.preventDefault(); 
            [mainColor, secondColor] = [secondColor, mainColor]
        }
        else if (e.ctrlKey && e.shiftKey && e.keyCode === 70) {
            e.preventDefault();
            if($('.changeColor').css('display') == 'flex'){
                $('.changeColor').css('display', 'none')
            } else{
                $('.changeColor').css('display', 'flex')
            }
           
        }
        
}


document.onmousemove = function(e){
    $('.learnKey').mouseenter(function(){
        $('.learnHotKeysWindow').css('display', 'flex')
        $('.learnHotKeysWindow').css('left', (e.clientX + 10))
        $('.learnHotKeysWindow').css('top', (e.clientY - 90))
    })
    $('.learnKey').mouseleave(function(){
    $('.learnHotKeysWindow').css('display', 'none')
    })

    if(isMouseDown == false){
        if(e.clientX < 10){
            $('.controlContainer').css('left', '0px')
        }
    }
    $('.controlContainer').mouseleave(function(){
        $('.controlContainer').css('left', '-200px')
    })
    
    $('.changeColor').css('top', e.clientY - 60)
    $('.changeColor').css('left', e.clientX + 10)

    $('#firstColor').css('backgroundColor', mainColor)
    $('#secondColor').css('backgroundColor', secondColor)
}
$('#save').click( function() {
    save()
});

$(document).ready(function() {
    thickness = 10; 

    $('#thicknessCustom').on('input', function() {
        thickness = $(this).val();
        $('#textThickness').text(thickness);
    });


    $('#thicknessCustom').val(thickness);
    $('#textThickness').text(thickness);


    $('#colorCustom').on('input', function() {
        let color = $(this).val();
        $('#colorValue').text(color);
        mainColor = color;
        $('.colorBox').css('backgroundColor', mainColor);
    });

    $('#colorCustom').val(mainColor);    
    $('#colorValue').text(mainColor);

});



function clear(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    ctx.fillStyle = 'black'
}
function save() {
    $('.nameEnd').css('display', 'flex');
    let nameFileLet;

    $('#comfirnNameFile').off('click').on('click', function() {
        nameFileLet = $('#nameFile').val() + $('#fileType').val();
    
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png'); 
        link.download = nameFileLet;
        link.click();
        
        $('#nameFile').val('');
        $('.nameEnd').css('display', 'none');
    });
}