
// ========================================
// GONYMAN - MAIN JAVASCRIPT
// ========================================


// دکمه های صفحه اول

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let noCount = 0;
let selectedColor = null;


// پیام های طنز دکمه خیر

const messages = [
    "مطمئنی؟",
    "منکه می‌دونم!",
    "جاویدنام به نظر میای",
    "سابقه جاویدنامیت چیز دیگه‌ای میگه",
    "اون یکی داشاق و بزن",
    "حالا گی بخور"
];


// ========================================
// دکمه خیر
// ========================================

noBtn.addEventListener("click", function () {

    noCount++;

    let oldMessage = document.getElementById("funMessage");

    if (oldMessage) {
        oldMessage.remove();
    }

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


// ========================================
// دکمه بله
// ========================================

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


// ========================================
// انتخاب رنگ گونی
// ========================================

const colorCards = document.querySelectorAll(".color-card");

const colorsContainer = document.getElementById("colorsContainer");

const submitRequestBtn =
    document.getElementById("submitRequestBtn");


// پیام انتخاب رنگ

const selectedMessage = document.createElement("p");

selectedMessage.id = "selectedColorMessage";
selectedMessage.textContent = "هنوز رنگی انتخاب نکردی!";

selectedMessage.style.textAlign = "center";
selectedMessage.style.fontWeight = "bold";
selectedMessage.style.marginTop = "25px";

colorsContainer.insertAdjacentElement(
    "afterend",
    selectedMessage
);


// دکمه ثبت در ابتدا غیرفعال

submitRequestBtn.disabled = true;

submitRequestBtn.style.opacity = "0.5";
submitRequestBtn.style.cursor = "not-allowed";


// ========================================
// کلیک روی کارت های رنگ
// ========================================

colorCards.forEach(card => {

    card.addEventListener("click", function () {

        // حذف انتخاب قبلی

        colorCards.forEach(item => {
            item.classList.remove("selected");
        });

        // انتخاب کارت جدید

        this.classList.add("selected");

        // ذخیره رنگ انتخابی

        selectedColor = this.dataset.color;

        // نمایش رنگ انتخابی

        selectedMessage.textContent =
            "رنگ انتخابی شما: " + selectedColor;

        selectedMessage.style.color = "#176b39";

        // فعال شدن دکمه ثبت

        submitRequestBtn.disabled = false;

        submitRequestBtn.style.opacity = "1";
        submitRequestBtn.style.cursor = "pointer";

        console.log("Selected color:", selectedColor);

    });

});


// ========================================
// رنگ های گونی
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


// ========================================
// ثبت نهایی درخواست
// ========================================


submitRequestBtn.addEventListener("click", function () {

    if (!selectedColor) return;

    submitRequestBtn.disabled = true;

    const selectedHex = colorCodes[selectedColor];

    const confirmationScreen = document.createElement("div");

    confirmationScreen.id = "confirmationScreen";

    confirmationScreen.style.cssText = `
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        background-color: ${selectedHex};
        z-index: 2147483647;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-sizing: border-box;
        text-align: center;
        opacity: 0;
        transition: opacity 0.5s ease;
    `;

    const textColor =
        ["سفید", "زرد", "طلایی", "صورتی"].includes(selectedColor)
        ? "#222222"
        : "#ffffff";

    confirmationScreen.style.color = textColor;

    confirmationScreen.innerHTML = `
        <h1 style="
            font-size: clamp(25px, 5vw, 42px);
            text-align: center;
        ">
            گونی ${selectedColor} شما انتخاب شد!
        </h1>
    `;

    document.body.appendChild(confirmationScreen);

    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
        confirmationScreen.style.opacity = "1";
    });

    setTimeout(() => {

        confirmationScreen.style.opacity = "0";

        setTimeout(() => {

            confirmationScreen.remove();

            document.getElementById("page2").style.display = "none";
            document.getElementById("page3").style.display = "block";

            document.getElementById("finalColorMessage").textContent =
                `گونی ${selectedColor} شما انتخاب شد!`;

            document.body.style.overflow = "";

            window.scrollTo(0, 0);

        }, 500);

    }, 2000);

});
