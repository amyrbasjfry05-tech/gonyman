
// ========================================
// GONYMAN - MAIN JAVASCRIPT
// ========================================

// ========================================
// صفحه اول: دکمه ها
// ========================================

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let noCount = 0;
let selectedColor = null;

const messages = [
    "مطمئنی؟",
    "منکه می‌دونم!",
    "جاویدنام به نظر میای",
    "سابقه جاویدنامیت چیز دیگه‌ای میگه",
    "اون یکی داشاق و بزن",
    "حالا گی بخور"
];

if (noBtn && yesBtn) {

    noBtn.addEventListener("click", function () {

        noCount++;

        document.getElementById("funMessage")?.remove();

        const message = document.createElement("p");
        message.id = "funMessage";
        message.textContent =
            messages[Math.min(noCount - 1, messages.length - 1)];

        document.querySelector("#page1 .question-box")
            .appendChild(message);

        const size = Math.max(0.05, 1 - noCount * 0.16);

        noBtn.style.transform = `scale(${size})`;
        noBtn.style.opacity = Math.max(0.05, 1 - noCount * 0.15);

        yesBtn.style.transform =
            `scale(${Math.min(1 + noCount * 0.1, 1.5)})`;

        const positions = [
            { left: "5%", top: "10%" },
            { left: "75%", top: "15%" },
            { left: "10%", top: "75%" },
            { left: "80%", top: "75%" },
            { left: "50%", top: "5%" },
            { left: "50%", top: "90%" }
        ];

        const position =
            positions[(noCount - 1) % positions.length];

        noBtn.style.position = "fixed";
        noBtn.style.left = position.left;
        noBtn.style.top = position.top;
        noBtn.style.zIndex = "1000";

        if (noCount >= 7) {
            noBtn.style.display = "none";
        }
    });


    yesBtn.addEventListener("click", function () {

        const rect = yesBtn.getBoundingClientRect();

        yesBtn.style.position = "fixed";
        yesBtn.style.left = rect.left + "px";
        yesBtn.style.top = rect.top + "px";
        yesBtn.style.width = rect.width + "px";
        yesBtn.style.height = rect.height + "px";

        yesBtn.style.transform = "none";
        yesBtn.classList.add("yes-final");

        yesBtn.offsetHeight;

        requestAnimationFrame(() => {
            yesBtn.style.left = "50%";
            yesBtn.style.top = "50%";
            yesBtn.style.width = "100vw";
            yesBtn.style.height = "100vh";
            yesBtn.style.transform = "translate(-50%, -50%)";
            yesBtn.style.fontSize = "35px";
        });

        yesBtn.textContent = "سوسیس شناسایی شد";

        setTimeout(() => {

            yesBtn.style.display = "none";

            document.getElementById("page1Header").style.display = "none";
            document.getElementById("page1").style.display = "none";
            document.getElementById("page2").style.display = "block";

        }, 1000);
    });
}


// ========================================
// صفحه دوم: انتخاب رنگ گونی
// ========================================

const colorCards = document.querySelectorAll(".color-card");
const colorsContainer = document.getElementById("colorsContainer");
const submitRequestBtn = document.getElementById("submitRequestBtn");

if (colorsContainer && submitRequestBtn) {

    const selectedMessage = document.createElement("p");

    selectedMessage.id = "selectedColorMessage";
    selectedMessage.textContent = "هنوز رنگی انتخاب نکردی!";

    colorsContainer.insertAdjacentElement("afterend", selectedMessage);

    submitRequestBtn.disabled = true;
    submitRequestBtn.style.opacity = "0.5";

    colorCards.forEach(card => {

        card.addEventListener("click", function () {

            colorCards.forEach(item =>
                item.classList.remove("selected")
            );

            this.classList.add("selected");

            selectedColor = this.dataset.color;

            selectedMessage.textContent =
                "رنگ انتخابی شما: " + selectedColor;

            selectedMessage.style.color = "#176b39";

            submitRequestBtn.disabled = false;
            submitRequestBtn.style.opacity = "1";
            submitRequestBtn.style.cursor = "pointer";

        });
    });

}


// ========================================
// ثبت درخواست
// ========================================

const colorCodes = {
    "قرمز": "#e53935",
    "آبی": "#2196f3",
    "سبز": "#43a047",
    "زرد": "#fdd835",
    "نارنجی": "#fb8c00",
    "بنفش": "#8e44ad",
    "صورتی": "#ec407a",
    "قهوه‌ای": "#795548",
    "مشکی": "#222222",
    "سفید": "#f5f5f5",
    "فیروزه‌ای": "#26c6da",
    "طلایی": "#d4af37"
};

if (submitRequestBtn) {

    submitRequestBtn.addEventListener("click", function () {

        if (!selectedColor) return;

        submitRequestBtn.disabled = true;

        const confirmationScreen = document.createElement("div");

        confirmationScreen.id = "confirmationScreen";

        confirmationScreen.style.cssText = `
            position: fixed;
            inset: 0;
            background: ${colorCodes[selectedColor]};
            z-index: 2147483647;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            transition: opacity .5s ease;
        `;

        confirmationScreen.innerHTML = `
            <h1 style="color:${
                ["سفید", "زرد", "طلایی", "صورتی"].includes(selectedColor)
                ? "#222" : "#fff"
            }">
                گونی ${selectedColor} شما انتخاب شد!
            </h1>
        `;

        document.body.appendChild(confirmationScreen);
        document.body.style.overflow = "hidden";

        setTimeout(() => {
            confirmationScreen.style.opacity = "0";

            setTimeout(() => {

                confirmationScreen.remove();

                document.getElementById("page2").style.display = "none";
                document.getElementById("page3").style.display = "block";

                document.body.style.overflow = "";
                window.scrollTo(0, 0);

                initializeGarage();

            }, 500);

        }, 2000);
    });
}


// ========================================
// صفحه سوم: GONYMAN GARAGE
// ========================================

let garageInitialized = false;

let selectedCar = "car1";

let selectedParts = new Set();

let selectedStickers = [];


const carNames = {
    car1: "خودروی گشت شماره ۱",
    car2: "خودروی گشت شماره ۲",
    car3: "خودروی گشت شماره ۳",
    car4: "خودروی گشت شماره ۴"
};


const parts = [
    {
        id: "wheel",
        name: "رینگ",
        image: "images/parts/wheel.png"
    },
    {
        id: "spoiler",
        name: "بال عقب",
        image: "images/parts/spoiler.png"
    },
    {
        id: "bumper",
        name: "سپر",
        image: "images/parts/bumper.png"
    },
    {
        id: "light",
        name: "چراغ",
        image: "images/parts/light.png"
    },
    {
        id: "hood",
        name: "کاپوت",
        image: "images/parts/hood.png"
    }
];


const stickers = [
    {
        id: "allah",
        name: "نشان الله",
        image: "images/stickers/allah.png"
    },
    {
        id: "sepah",
        name: "نشان سپاه",
        image: "images/stickers/sepah.png"
    }
];


// ========================================
// راه اندازی گاراژ
// ========================================

function initializeGarage() {

    if (garageInitialized) return;

    garageInitialized = true;

    const carCards = document.querySelectorAll(".car-card");
    const mainCarImage = document.getElementById("mainCarImage");

    const partsList = document.getElementById("partsList");
    const stickersList = document.getElementById("stickersList");

    const partsLayer = document.getElementById("carPartsLayer");
    const stickersLayer = document.getElementById("carStickersLayer");

    if (!mainCarImage || !partsList || !stickersList) {
        console.error("Garage HTML elements are missing!");
        garageInitialized = false;
        return;
    }


    // انتخاب خودرو

    carCards.forEach(card => {

        card.addEventListener("click", function () {

            carCards.forEach(item =>
                item.classList.remove("selected")
            );

            this.classList.add("selected");

            selectedCar = this.dataset.car;

            mainCarImage.src =
                `images/cars/${selectedCar}.jpg`;

            selectedParts.clear();
            partsLayer.innerHTML = "";

            selectedStickers = [];
            stickersLayer.innerHTML = "";

            document.querySelectorAll(".part-card")
                .forEach(item => item.classList.remove("selected"));

            renderStickers();
        });
    });


    // ساخت کارت های تجهیزات

    partsList.innerHTML = "";

    parts.forEach(part => {

        const card = document.createElement("div");

        card.className = "part-card";
        card.dataset.part = part.id;

        card.innerHTML = `
            <img src="${part.image}" alt="${part.name}">
            <p>${part.name}</p>
        `;

        card.addEventListener("click", function () {

            if (selectedParts.has(part.id)) {

                selectedParts.delete(part.id);
                card.classList.remove("selected");

            } else {

                selectedParts.add(part.id);
                card.classList.add("selected");
            }

            renderParts();
        });

        partsList.appendChild(card);
    });


    // ساخت گالری استیکرها

    function renderStickers() {

        stickersList.innerHTML = "";

        stickers.forEach(sticker => {

            const card = document.createElement("div");

            card.className = "sticker-card";

            card.innerHTML = `
                <img src="${sticker.image}" alt="${sticker.name}">
                <p>${sticker.name}</p>
                <button type="button">افزودن</button>
            `;

            card.querySelector("button").addEventListener("click", () => {
                addSticker(sticker);
            });

            stickersList.appendChild(card);
        });
    }


    // نمایش تجهیزات انتخاب شده

    function renderParts() {

        partsLayer.innerHTML = "";

        selectedParts.forEach(partId => {

            const part = parts.find(p => p.id === partId);

            if (!part) return;

            const img = document.createElement("img");

            img.src = part.image;
            img.alt = part.name;
            img.className = "installed-part";
            img.dataset.part = partId;

            partsLayer.appendChild(img);
        });
    }


    // افزودن استیکر

    function addSticker(sticker) {

        const id = Date.now() + Math.random();

        selectedStickers.push({
            id,
            image: sticker.image,
            name: sticker.name
        });

        renderStickerLayer();
    }


    // نمایش استیکرها

    function renderStickerLayer() {

        stickersLayer.innerHTML = "";

        selectedStickers.forEach(sticker => {

            const img = document.createElement("img");

            img.src = sticker.image;
            img.alt = sticker.name;
            img.className = "installed-sticker";

            img.style.left = "45%";
            img.style.top = "45%";

            img.addEventListener("pointerdown", startStickerDrag);

            stickersLayer.appendChild(img);
        });
    }


    // جابه جایی استیکر با ماوس یا لمس

    let draggingSticker = null;

    function startStickerDrag(event) {

        draggingSticker = event.currentTarget;

        const layerRect = stickersLayer.getBoundingClientRect();

        const moveSticker = e => {

            if (!draggingSticker) return;

            const x = ((e.clientX - layerRect.left) / layerRect.width) * 100;
            const y = ((e.clientY - layerRect.top) / layerRect.height) * 100;

            draggingSticker.style.left =
                Math.max(0, Math.min(95, x)) + "%";

            draggingSticker.style.top =
                Math.max(0, Math.min(90, y)) + "%";
        };

        const stopDrag = () => {

            draggingSticker = null;

            document.removeEventListener("pointermove", moveSticker);
            document.removeEventListener("pointerup", stopDrag);
        };

        document.addEventListener("pointermove", moveSticker);
        document.addEventListener("pointerup", stopDrag);

        event.preventDefault();
    }


    // بازنشانی

    const resetBtn = document.getElementById("resetTuningBtn");

    if (resetBtn) {

        resetBtn.addEventListener("click", () => {

            selectedParts.clear();
            selectedStickers = [];

            partsLayer.innerHTML = "";
            stickersLayer.innerHTML = "";

            document.querySelectorAll(".part-card")
                .forEach(item => item.classList.remove("selected"));

            renderStickers();
        });
    }


    // ذخیره طرح

    const saveBtn = document.getElementById("saveTuningBtn");

    if (saveBtn) {

        saveBtn.addEventListener("click", () => {

            const message = document.getElementById("tuningMessage");

            message.textContent =
                "طرح شما آماده است! برای ذخیره تصویر، از قابلیت اسکرین‌شات استفاده کنید.";

        });
    }


    // شروع گاراژ

    renderStickers();

    const firstCar = document.querySelector('.car-card[data-car="car1"]');

    if (firstCar) {
        firstCar.classList.add("selected");
    }

    console.log("GonyMan Garage initialized!");
}
