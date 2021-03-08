let mobileNet;
let classifier;
let happyBtn = document.querySelector(".happy");
let sadBtn = document.querySelector(".sad");
let scissorBtn = document.querySelector(".scissor");
let trainBtn = document.querySelector(".train");

function modelReady() {
  console.log("Model is Ready!!");
}

function gotResults(err, result) {
  if (err) {
    console.log(err);
  } else {
    let msg;
    if (result[0].label === "Stone") {
      msg = "Asad, You selected Stone";
    } else if (result[0].label === "Paper") {
      msg = "Asad, You selected Paper";
    } else {
      msg = "Asad, You selected Scissor";
    }
    document.querySelector("h1").innerText = msg;
    classifier.classify(gotResults);
  }
}

var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}

function whileTraining(loss) {
  if (loss === null) {
    console.log("Training complete");
    classifier.classify(gotResults);
    happyBtn.style.display = "none";
    sadBtn.style.display = "none";
    scissorBtn.style.display = "none";
    trainBtn.style.display = "none";
  } else {
    console.log(loss);
  }
}

function start() {
  mobileNet = ml5.featureExtractor(
    "MobileNet",
    {
      numLabels: 3,
    },
    modelReady
  );
  classifier = mobileNet.classification(video, () => {
    console.log("Video is ready");
  });
  happyBtn.addEventListener("click", () => {
    classifier.addImage("Stone");
  });
  sadBtn.addEventListener("click", () => {
    classifier.addImage("Paper");
  });
  scissorBtn.addEventListener("click", () => {
    classifier.addImage("Scissor");
  });
  trainBtn.addEventListener("click", () => {
    classifier.train(whileTraining);
  });
}

window.onload = start;
