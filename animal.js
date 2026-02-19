const MODEL_PATH = "https://teachablemachine.withgoogle.com/models/I55N6h9vV/"; 

let model, webcam, labelContainer, maxPredictions;

async function init() {
    try {
        const startBtn = document.querySelector('.animal-start-btn');
        if (startBtn) startBtn.textContent = '모델 로딩 중...';
        
        const modelURL = MODEL_PATH + "model.json";
        const metadataURL = MODEL_PATH + "metadata.json";

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        if (startBtn) startBtn.style.display = 'none';

        const flip = true;
        webcam = new tmImage.Webcam(300, 300, flip);
        await webcam.setup();
        await webcam.play();
        window.requestAnimationFrame(loop);

        const webcamContainer = document.getElementById("webcam-container");
        webcamContainer.innerHTML = ''; // Clear previous if any
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
    } catch (error) {
        console.error("Initialization failed:", error);
        alert("카메라 권한이 필요하거나 모델을 불러오는 데 실패했습니다.");
        const startBtn = document.querySelector('.animal-start-btn');
        if (startBtn) {
            startBtn.textContent = '테스트 시작하기';
            startBtn.style.display = 'block';
        }
    }
}

async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    if (!model || !webcam) return;
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        // Handle different model labels (Dog/Cat or generic labels)
        const rawLabel = prediction[i].className.toLowerCase();
        let className = prediction[i].className;
        if (rawLabel.includes('dog')) className = '강아지상';
        else if (rawLabel.includes('cat')) className = '고양이상';
        
        const probability = (prediction[i].probability * 100).toFixed(0);
        
        const wrapper = labelContainer.childNodes[i];
        if (wrapper) {
            wrapper.querySelector('.prediction-label').innerHTML = `${className} (${probability}%)`;
            wrapper.querySelector('.prediction-bar-value').style.width = probability + "%";
        }
    }
}
