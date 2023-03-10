status = ""
objects = []


function preload(){

}

function setup(){
    canvas=createCanvas(540,320)
    canvas.center()
    video = createCapture(VIDEO);
    video.hide()
}
function inicializar(){
    objDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "status: detectando objetos"
}
function modelLoaded(){
    console.log("modelo carregado")
    status = true;
    objDetector.detect(video,gotResult)
    
}
function gotResult(error, results){
    if(error){
        console.error(error)
    }else{
        console.log(results)
        objects = results
    }
}
function draw(){
    image(video,0,0,540,320) ;
    // fill("#FF0000")
    // text("dog",45,75)
    // noFill()
    // stroke("#FF0000")
    // rect(30,60,450,350);

    // fill("#FF0000")
    // text("cat",285,75)
    // noFill()
    // stroke("#FF0000")
    // rect(270,60,300,350)

    if(status != ""){
        red = random(255)
        blue = random(255)
        green = random(255)
        for(var i = 0; i < objects.length; i++){
            if(objects.length >= 1){
                document.getElementById("status").innerHTML = "status: objeto detectado"   
                document.getElementById("bbd").innerHTML = "bebê encontrado"+objects.length   
            }
            fill(red, green, blue)
            percente = floor(objects[i].confidence*100)
            text(objects[i].label + " " + percente + "%", objects[i].x, objects[i].y)
            noFill()
            stroke(red, green, blue)
            rect(objects[i].x ,objects[i].y ,objects[i].width ,objects[i].height)
        }
    }
}