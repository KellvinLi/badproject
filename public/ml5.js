// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

let classifier;
let video;
let resultsP;

let objectList = [
    "orange",
    "toilet tissue",
    "Band Aid"
]
function setup() {
    noCanvas();
    // Create a camera input
    video = createCapture(VIDEO);
    // Initialize the Image Classifier method with MobileNet and the video as the second argument
    classifier = ml5.imageClassifier('MobileNet', video, modelReady);
    resultsP = createP('Loading model and video...');
}

function modelReady() {
    console.log('Model Ready');
    classifyVideo();
}

// Get a prediction for the current video frame
async function classifyVideo() {
    const predictions = await classifier.classify(gotResult);

}

// When we get a result
async function gotResult(err, results) {
    // The results are in an array ordered by confidence.
    resultsP.html(results[0].label + ' ' + nf(results[0].confidence, 0, 2));
    let cameraResult = results[0].label.split(',')[0]

    if (!objectList.includes(cameraResult)) {
        classifyVideo();
    } else {
        const res = await fetch('/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(cameraResult),
        })
        const data = await res.json()
        console.log(data)

    }

    return cameraResult;

}

