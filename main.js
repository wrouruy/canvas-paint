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
ctx.lineWidth = 10
canvas.onmousemove = function(e){
    if( isMouseDown ){
        ctx.lineTo(e.clientX, e.clientY)
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(e.clientX, e.clientY, 5, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.moveTo(e.clientX, e.clientY)
    }
}
function clear(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    ctx.fillStyle = 'black'
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
    
}




$('#save').click( function() {
    save()
});







function save(){
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'my_drawing.png';
    link.click();
}