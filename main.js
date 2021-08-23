scoreLeftWrist = 0;
scoreRightWrist = 0;
song = "";

leftWrist_x = 0;
rightWrist_x = 0;

leftWrist_y = 0;
rightWrist_y = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(300, 300);
    video.position(700,400)
    canvas = createCanvas(300, 300);
    poseNet = ml5.poseNet(video, ModelLoaded);
    poseNet.on('pose', gotPoses)
}

function draw() {
    img(video, 0, 0, 300, 300);
    fill("#164975");

    if(scoreRightWrist > 0.2) {
    circle(RightWrist_x, RightWrist_y, 20);
    if(rightWrist_y > 0 && rightWrist_y <= 100) {
    song.rate(0.5);
    document.getElementById("speed").innerHTML="0.5x";
    }
    else if(rightWrist_y > 100 && rightWrist_y <= 200) {
    song.rate(1);
    document.getElementById("speed").innerHTML="1x";
    }
    else if(rightWrist_y > 200 && rightWrist_y <= 300) {
    song.rate(1.5);
    document.getElementById("speed").innerHTML="1.5x";
    }
    else if(rightWrist_y > 300 && rightWrist_y <= 400) {
    song.rate(2);
    document.getElementById("speed").innerHTML="2x";
    }
}

    if(scoreLeftWrist > 0.2) {
    circle(leftWrist_x, leftWrist_y, 20);
    leftWristY_NUMBER = NUMBER(leftWrist_y);
    removeDecimal = floor(leftWristY_NUMBER);
    volume = leftWristY_NUMBER/500;
    document.getElementById("volume").innerHTML=volume;
    song.setVolume(volume);
    }
}

function preload() {
    song = loadSound("AvengersThemeRemix.mp3");
}

function PLAY() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function ModelLoaded() {
    console.log("Model is loaded..")
}

function gotPoses(results) {
    if(results.length > 0) {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(results);
        rightWrist_x = results[0].pose.rightWrist.x;
        leftWrist_x = results[0].pose.leftWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        leftWrist_y = results[0].pose.leftWrist.y;
    }
}