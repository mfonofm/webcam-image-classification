let mobileNet;
let video;
let label;
let confidence;

function modelReady() {
    console.log('Model is ready!');
    mobileNet.predict(gotResults);
}

function setup() {
    createCanvas(640, 550);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobileNet = ml5.imageClassifier('MobileNet', video, modelReady);
}

function draw() {
    background(0);
    image(video, 0, 0);
    fill(255);
    textSize(18);
    text(label, 20, height - 25);
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    } else {
        label = `I'm ${confidence}% confident that this is an image of a ${results[0].label}`;
        confidence = Math.round(results[0].confidence * 100);
        mobileNet.predict(gotResults);
    }
}