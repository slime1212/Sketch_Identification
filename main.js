function preload() {
    classifier = ml5.imageClassifier('DoodleNet')
}

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    background("#F0F8FF")
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis
}

function clearCanvas() {
    background("#f0f8ff")
}

function draw() {
    strokeWeight(6);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY)
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult)
}

function gotResult(e, results) {
    if (e) {
        console.error(e)
    }

    console.log(results);

    document.getElementById('label').innerHTML = 'Label: ' + results[0].label;
    document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis)
}