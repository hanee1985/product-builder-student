const MODEL_PATH = "https://teachablemachine.withgoogle.com/models/I55N6h9vV/"; 

let model, labelContainer, maxPredictions;
let isModelLoading = false;

async function loadModel() {
    if (isModelLoading) return;
    isModelLoading = true;
    try {
        const modelURL = MODEL_PATH + "model.json";
        const metadataURL = MODEL_PATH + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        console.log("Model loaded successfully. Classes:", maxPredictions);
    } catch (error) {
        console.error("Failed to load model:", error);
    } finally {
        isModelLoading = false;
    }
}

// Start loading the model
loadModel();

function readURL(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        const loadingContainer = document.getElementById('loading-container');
        const progressValue = document.querySelector('.analysis-progress-value');
        const labelContainer = document.getElementById("label-container");
        const faceImage = document.getElementById('face-image');

        // Reset UI
        labelContainer.innerHTML = '';
        faceImage.style.display = 'none';
        
        // Start Analysis UI
        loadingContainer.style.display = 'block';
        progressValue.classList.remove('animate-progress');
        void progressValue.offsetWidth; // trigger reflow
        progressValue.classList.add('animate-progress');

        reader.onload = function(e) {
            faceImage.src = e.target.result;
            faceImage.style.display = 'block';
            
            // Wait for visual progress (2s)
            setTimeout(async () => {
                try {
                    console.log("Starting prediction...");
                    await predict();
                    console.log("Prediction finished.");
                } catch (err) {
                    console.error("Prediction error:", err);
                    labelContainer.innerHTML = '<p class="loading-text" style="color:red;">분석 중 오류가 발생했습니다.</p>';
                } finally {
                    loadingContainer.style.display = 'none';
                }
            }, 2000);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

async function predict() {
    if (!model) {
        console.warn("Model not ready, attempting to reload...");
        await loadModel();
        if (!model) throw new Error("Model could not be loaded.");
    }

    const image = document.getElementById("face-image");
    const prediction = await model.predict(image);
    console.log("Raw predictions:", prediction);
    
    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = ''; 

    // Sort predictions by probability
    prediction.sort((a, b) => b.probability - a.probability);

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
        
        // Extended mapping for animal types
        if (rawLabel.includes('dog')) className = '강아지상';
        else if (rawLabel.includes('cat')) className = '고양이상';
        else if (rawLabel.includes('rabbit')) className = '토끼상';
        else if (rawLabel.includes('dinosaur')) className = '공룡상';
        else if (rawLabel.includes('bear')) className = '곰상';
        
        const probability = (prediction[i].probability * 100).toFixed(0);
        labelText.innerHTML = `${className} (${probability}%)`;
        
        // Visual effect for results appearing
        setTimeout(() => {
            barValue.style.width = probability + "%";
        }, 100 + (i * 100));
    }
}
