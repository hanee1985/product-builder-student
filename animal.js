const MODEL_PATH = "https://teachablemachine.withgoogle.com/models/I55N6h9vV/"; 

let model, labelContainer, maxPredictions;

// Load the model as soon as possible
async function loadModel() {
    const modelURL = MODEL_PATH + "model.json";
    const metadataURL = MODEL_PATH + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
}

loadModel();

function readURL(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('face-image');
            img.src = e.target.result;
            img.style.display = 'block';
            img.onload = async function() {
                await predict();
            };
        };
        reader.readAsDataURL(input.files[0]);
    }
}

async function predict() {
    if (!model) {
        alert("모델 로딩 중입니다. 잠시 후 다시 시도해주세요.");
        return;
    }
    const image = document.getElementById("face-image");
    const prediction = await model.predict(image);
    
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

        const rawLabel = prediction[i].className.toLowerCase();
        let className = prediction[i].className;
        if (rawLabel.includes('dog')) className = '강아지상';
        else if (rawLabel.includes('cat')) className = '고양이상';
        
        const probability = (prediction[i].probability * 100).toFixed(0);
        labelText.innerHTML = `${className} (${probability}%)`;
        barValue.style.width = probability + "%";
    }
}
