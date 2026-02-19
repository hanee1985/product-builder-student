// 사용자가 Teachable Machine에서 생성한 모델 URL을 이곳에 붙여넣으세요.
// 예: "https://teachablemachine.withgoogle.com/models/XXXXXXX/"
const MODEL_PATH = "https://teachablemachine.withgoogle.com/models/I55N6h9vV/"; 

let model, labelContainer, maxPredictions;
let isModelLoading = false;

async function loadModel() {
    if (isModelLoading) return;
    isModelLoading = true;
    try {
        const modelURL = MODEL_PATH + "model.json";
        const metadataURL = MODEL_PATH + "metadata.json";
        
        console.log("Loading model from:", MODEL_PATH);
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        console.log("Model loaded successfully. Classes:", maxPredictions);
    } catch (error) {
        console.error("Failed to load model. Please check the MODEL_PATH in animal.js.", error);
    } finally {
        isModelLoading = false;
    }
}

// 초기 로드 시 모델 불러오기
loadModel();

function readURL(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        const loadingContainer = document.getElementById('loading-container');
        const progressValue = document.querySelector('.analysis-progress-value');
        const labelContainer = document.getElementById("label-container");
        const faceImage = document.getElementById('face-image');

        // UI 초기화
        labelContainer.innerHTML = '';
        faceImage.style.display = 'none';
        
        // 분석 UI 시작
        loadingContainer.style.display = 'block';
        progressValue.classList.remove('animate-progress');
        void progressValue.offsetWidth; // 리플로우 트리거
        progressValue.classList.add('animate-progress');

        reader.onload = function(e) {
            faceImage.src = e.target.result;
            faceImage.style.display = 'block';
            
            // 시각적 프로그레스 대기 (2초)
            setTimeout(async () => {
                try {
                    console.log("Starting prediction...");
                    await predict();
                    console.log("Prediction finished.");
                } catch (err) {
                    console.error("Prediction error:", err);
                    labelContainer.innerHTML = `
                        <p class="loading-text" style="color:red; font-size:13px;">
                            분석 중 오류가 발생했습니다.<br>
                            모델 URL이 유효한지 확인해주세요.
                        </p>`;
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
        if (!model) throw new Error("Model not loaded. Check MODEL_PATH.");
    }

    const image = document.getElementById("face-image");
    const prediction = await model.predict(image);
    
    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = ''; 

    // 확률 높은 순 정렬
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
        
        // 라벨 매핑 (모델의 클래스 이름에 따라 수정이 필요할 수 있습니다)
        if (rawLabel.includes('dog')) className = '강아지상';
        else if (rawLabel.includes('cat')) className = '고양이상';
        else if (rawLabel.includes('rabbit')) className = '토끼상';
        else if (rawLabel.includes('dinosaur')) className = '공룡상';
        else if (rawLabel.includes('bear')) className = '곰상';
        
        const probability = (prediction[i].probability * 100).toFixed(0);
        labelText.innerHTML = `${className} (${probability}%)`;
        
        // 결과 바 애니메이션
        setTimeout(() => {
            barValue.style.width = probability + "%";
        }, 100 + (i * 100));
    }
}
