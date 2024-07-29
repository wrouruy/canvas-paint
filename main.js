var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var coords = []

let left = document.querySelector('.left')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var isMouseDown = false
let learnKeyLet = false

let typeDraw = {
    pen: true,
    fill: false,
    text: false,
    eraser: false,
    pipette: false,
    zoom: false
}
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
    coords.push('mouseup')
}
function checkDraw(draw){
    Object.keys(typeDraw).forEach(key => {
        typeDraw[key] = false;
    });
    typeDraw[draw] = true
    console.log(typeDraw)
}
$('#toPen').click(function(){checkDraw('pen')})
$('#toFill').click(function(){checkDraw('fill')})
$('#toText').click(function(){checkDraw('text')})
$('#toEraser').click(function(){checkDraw('eraser')})
$('#toPipette').click(function(){checkDraw('pipette')})
$('#toZoom').click(function(){checkDraw('zoom')})
function clearArc(ctx, x, y, radius, startAngle, endAngle) {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fill();
    ctx.restore();
}

let thickness = 10
let mainColor = '#000000'
let secondColor = '#000000'
canvas.onmousemove = function(e){
    var selectElement = document.getElementById('options');

    var selectedValue = selectElement.value;
    if(learnKeyLet == true){
        $('.learnHotKeysWindow').css('display', 'flex')
        $('.learnHotKeysWindow').css('left', (e.clientX - 310))
        $('.learnHotKeysWindow').css('bottom', (e.clientY - 955) * -1)
    }
    if( isMouseDown ){
        if(typeDraw.pen == true){
            if(selectedValue == 'pixel-art'){
                $('.logo').css('font-family', '"Pixelify Sans", sans-serif')
                ctx.fillRect((Math.round(e.clientX / thickness) * thickness) - (thickness / 2), (Math.round(e.clientY / thickness) * thickness) - (thickness / 2), thickness, thickness)
                ctx.fillStyle = mainColor
            } else if(selectedValue == 'classic') {
                $('.logo').css('font-family', 'Montserrat')
                coords.push([e.clientX, e.clientY])
        
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
        else if(typeDraw.eraser == true){
            if(selectedValue == 'pixel-art'){
                $('.logo').css('font-family', '"Pixelify Sans", sans-serif')
                ctx.clearRect((Math.round(e.clientX / thickness) * thickness) - (thickness / 2), (Math.round(e.clientY / thickness) * thickness) - (thickness / 2), thickness, thickness)
            } else if(selectedValue == 'classic') {
                $('.logo').css('font-family', 'Montserrat')
                coords.push([e.clientX, e.clientY])
        
                clearArc(ctx, 100, 100, 25, 0, 2 * Math.PI);
                ctx.fill()

            }
        }
    }

}

document.onkeydown = function(e){
    // console.log(e.keyCode)
        if (e.ctrlKey && e.keyCode === 83) { e.preventDefault(); save(); } // save draw
        if (e.ctrlKey && e.shiftKey &&e.keyCode === 67) { e.preventDefault(); clear(); }  // clear draw 
        if (e.ctrlKey && e.keyCode === 81) { e.preventDefault(); [mainColor, secondColor] = [secondColor, mainColor] } // fast change color
        if (e.ctrlKey && e.shiftKey && e.keyCode === 70) { e.preventDefault(); if($('.changeColor').css('display') == 'flex'){$('.changeColor').css('display', 'none')} else{$('.changeColor').css('display', 'flex')}} // close window color
        // if (e.keyCode == 32) { e.preventDefault(); play()} // play animation
        if (e.ctrlKey && e.keyCode === 71) { e.preventDefault(); $('.learnHotKeysWindow').css('display', 'none');  learnKeyLet = false} // close learn hot keys window
}


document.onmousemove = function(e){
    $('.learnKey').mouseenter(function(){
        learnKeyLet = true
    })
    // $('.learnKey').mouseleave(function(){
    // $('.learnHotKeysWindow').css('display', 'none')
    // })

    if(isMouseDown == false){
        if(e.clientX < 10){
            $('.controlContainer').css('left', '0px')
        } else if(e.clientX > 200){
            $('.controlContainer').css('left', '-200px')
        }
    }
    
    $('.changeColor').css('bottom', (e.clientY - 955) * -1)
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
        coords.push(mainColor)
        console.log(mainColor)
    });

    $('#colorCustom').val(mainColor);    
    $('#colorValue').text(mainColor);

});



function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
clear()
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
// function play(){
//     clear()
//     var timer = setInterval(function(){
//         if( !coords.length ){
//             clearInterval(timer)
//             ctx.beginPath()
//             return
//         }
//         var 
//             crd = coords.shift(),
//             e = {
//                 clientX: crd["0"],
//                 clientY: crd["1"]
//             }
//             ctx.lineWidth = thickness * 2
//             ctx.lineTo(e.clientX, e.clientY)
//             ctx.stroke()

//             ctx.beginPath()
//             ctx.arc(e.clientX, e.clientY, thickness, 0, Math.PI * 2)

//             ctx.fillStyle = coords.push()
//             ctx.strokeStyle = coords.push()

//             ctx.fill()

//             ctx.beginPath()
//             ctx.moveTo(e.clientX, e.clientY)
            
//     }, 30)

// }