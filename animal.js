const URL = "https://teachablemachine.withgoogle.com/models/I55N6h9vV/"; // Using a placeholder URL for dog/cat model

let model, webcam, labelContainer, maxPredictions;

async function init() {
    const startBtn = document.querySelector('.animal-start-btn');
    startBtn.style.display = 'none';
    
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true;
    webcam = new tmImage.Webcam(300, 300, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    const webcamContainer = document.getElementById("webcam-container");
    webcamContainer.appendChild(webcam.canvas);
    
    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = ''; 
    for (let i = 0; i < maxPredictions; i++) {
        const progressWrapper = document.createElement("div");
        progressWrapper.className = "prediction-bar-wrapper";
        
        const labelText = document.createElement("span");
        labelText.className = "prediction-label";
        
        const barContainer = document.createElement("div");
        barContainer.className = "prediction-bar-container";
        
        const barValue = document.createElement("div");
        barValue.className = "prediction-bar-value";
        
        barContainer.appendChild(barValue);
        progressWrapper.appendChild(labelText);
        progressWrapper.appendChild(barContainer);
        labelContainer.appendChild(progressWrapper);
    }
}

async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const className = prediction[i].className === "Dog" ? "강아지상" : "고양이상";
        const probability = (prediction[i].probability * 100).toFixed(0);
        
        const wrapper = labelContainer.childNodes[i];
        wrapper.querySelector('.prediction-label').innerHTML = `${className} (${probability}%)`;
        wrapper.querySelector('.prediction-bar-value').style.width = probability + "%";
    }
}
