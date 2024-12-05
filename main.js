var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var coords = []

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var isMouseDown = false

let typeDraw = {
    pen: true,
    eraser: false
}

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

$('#toEraser').click(function(){checkDraw('eraser')})


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

canvas.onmousemove = function(e){
    var selectElement = document.getElementById('options');

    var selectedValue = selectElement.value;
    if( isMouseDown ){
        if(typeDraw.pen == true){
            if(selectedValue == 'pixel-art'){
                $('.logo').css('font-family', '"Pixelify Sans", sans-serif')
                ctx.fillRect(Math.floor(Math.round(e.clientX / thickness) * thickness) - (thickness / 2), (Math.round(e.clientY / thickness) * thickness) - (thickness / 2), thickness, thickness)
                
                $('#customCursor').css('borderRadius', 0)
            } else if(selectedValue == 'classic') {
                $('.logo').css('font-family', 'Montserrat')
                $('#customCursor').css('borderRadius', '50%')
                coords.push([e.clientX, e.clientY])
        
                ctx.lineWidth = thickness * 2
                ctx.lineTo(e.clientX, e.clientY)
                
                ctx.stroke()
        
                ctx.beginPath()
                ctx.arc(e.clientX, e.clientY, thickness, 0, Math.PI * 2)

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
        
                if(typeDraw.eraser == true){
                    ctx.fillStyle = 'white'
                    ctx.strokeStyle = 'white'
                } else {
                    ctx.fillStyle = mainColor 
                    ctx.strokeStyle = mainColor 
                }
                ctx.fill()

            }
        }
    }

}

document.onkeydown = function(e){   
    if (e.ctrlKey && e.keyCode === 83) { e.preventDefault(); save(); } // save draw
    if (e.ctrlKey && e.shiftKey &&e.keyCode === 67) { e.preventDefault(); clear(); }  // clear draw 
        
    if (e.keyCode == 32) { e.preventDefault(); play()} // play animation
    if (e.ctrlKey && e.keyCode === 71) { e.preventDefault(); $('.learnHotKeysWindow').css('display', 'none');  learnKeyLet = false} // close learn hot keys window
    if(e.keyCode === 13){
        ctx.fillStyle = 'white'
        ctx.strokeStyle = 'white'
    }
}


document.onmousemove = function(e){
    if(isMouseDown == false){
        if(e.clientX < 10){
            $('.controlContainer').css('left', '0px')
           
        } else if(e.clientX > 200){
            $('.controlContainer').css('left', '-200px')
        
        }
    }
    

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
function play(){
    clear()
    var timer = setInterval(function(){
        if( !coords.length ){
            clearInterval(timer)
            ctx.beginPath()
            return
        }
        var 
            crd = coords.shift(),
            e = {
                clientX: crd["0"],
                clientY: crd["1"]
            }
            ctx.lineWidth = thickness * 2
            ctx.lineTo(e.clientX, e.clientY)
            ctx.stroke()

            ctx.beginPath()
            ctx.arc(e.clientX, e.clientY, thickness, 0, Math.PI * 2)

            ctx.fillStyle = coords.push()
            ctx.strokeStyle = coords.push()

            ctx.fill()

            ctx.beginPath()
            ctx.moveTo(e.clientX, e.clientY)
            
    }, 30)

}



document.addEventListener('mousemove', (e) => {
    $('#customCursor').css('padding', `${thickness}px`);

    $('#customCursor').css('left', `${e.clientX}px`);
    $('#customCursor').css('top', `${e.clientY}px`);
});
canvas.onmouseenter = function(){ $('#customCursor').css('display', 'flex') }
canvas.onmouseleave = function(){ $('#customCursor').css('display', 'none'); ctx.beginPath(); isMouseDown = false}



document.querySelectorAll('.trigger').forEach(button => {
    button.addEventListener('click', () => {
      const parent = button.parentElement;
      parent.classList.toggle('active');
    });
  });
  