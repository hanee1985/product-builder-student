const MODEL_PATH = "https://teachablemachine.withgoogle.com/models/I55N6h9vV/"; 

let model, labelContainer, maxPredictions;

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
        const loadingContainer = document.getElementById('loading-container');
        const progressValue = document.querySelector('.analysis-progress-value');
        const labelContainer = document.getElementById("label-container");
        const faceImage = document.getElementById('face-image');

        // Reset and Show Loading
        labelContainer.innerHTML = '';
        faceImage.style.display = 'none';
        loadingContainer.style.display = 'block';
        progressValue.classList.remove('animate-progress');
        void progressValue.offsetWidth; // trigger reflow
        progressValue.classList.add('animate-progress');

        reader.onload = function(e) {
            faceImage.src = e.target.result;
            faceImage.style.display = 'block';
            
            // Wait for animation to finish (2s) before showing results
            setTimeout(async () => {
                await predict();
                loadingContainer.style.display = 'none';
            }, 2000);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

async function predict() {
    if (!model) return;
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
        
        // Minor delay for the final results to "pop" in
        setTimeout(() => {
            barValue.style.width = probability + "%";
        }, 100);
    }
}
