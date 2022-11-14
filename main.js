prediction_1 = "";
prediction_2 = "";

Webcam.attach("#camera");

Webcam.set({
  width: 300,
  height: 250,
  image_format: "png",
  png_quality: 300,
});

camera = document.getElementById("camera");

function take_snapshot() {
  Webcam.snap(function (data_uri) {
    document.getElementById("result").innerHTML =
      '<img id = "capture_image" src="' + data_uri + '"/>';
  });
}
console.log("ml5 version : ", ml5.version);

classifier = ml5.imageClassifier(
  'https://teachablemachine.withgoogle.com/models/iE_8qIvyF/model.json' ,
  modelLoaded
);

function modelLoaded() {
  console.log("Model Loaded!");
}

function speak() {
  var synth = window.speechSynthesis;
  speak_data_1 = "The prediction is " + prediction_1;
  var utterThis = new SpeechSynthesisUtterance(speak_data_1);
  synth.speak(utterThis);
}
function check() {
  img = document.getElementById("capture_image");
  classifier.classify(img, gotResult);
}
function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
      prediction_1 = results[0].label;
    speak();
    if (results[0].label == "amazing") {
      document.getElementById("update_emoji").innerHTML = "&#9996";
    }
    if (results[0].label == "best") {
      document.getElementById("update_emoji").innerHTML = "&#128077";
    }
    if (results[0].label == "victory") {
      document.getElementById("update_emoji").innerHTML = "&#128076";
    }
  }
}
