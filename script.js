
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

// دکمه خیر
noBtn.addEventListener("click", function () {

    noCount++;

    let oldMessage = document.getElementById("funMessage");

    if (oldMessage) {
        oldMessage.remove();
    }

    const message = document.createElement("p");
    message.id = "funMessage";
    message.textContent = messages[Math.min(noCount - 1, messages.length - 1)];

    document.querySelector("#page1 .question-box").appendChild(message);

    // کوچک شدن دکمه خیر
    const size = Math.max(0.05, 1 - noCount * 0.16);

    noBtn.style.transform = `scale(${size})`;
    noBtn.style.opacity = Math.max(0.05, 1 - noCount * 0.15);

    // بزرگ شدن دکمه بله
    yesBtn.style.transform = `scale(${Math.min(1 + noCount * 0.1, 1.5)})`;

    // موقعیت های دکمه خیر
    const positions = [
        { left: "5%", top: "10%" },
        { left: "75%", top: "15%" },
        { left: "10%", top: "75%" },
        { left: "80%", top: "75%" },
        { left: "50%", top: "5%" },
        { left: "50%", top: "90%" }
    ];

    const position = positions[(noCount - 1) % positions.length];

    noBtn.style.position = "fixed";
    noBtn.style.left = position.left;
    noBtn.style.top = position.top;
    noBtn.style.zIndex = "1000";

    // ناپدید شدن دکمه خیر
    if (noCount >= 7) {
        noBtn.style.display = "none";
    }
});


// دکمه بله
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

    // انتقال به صفحه دوم
    setTimeout(() => {

        yesBtn.style.display = "none";

        document.getElementById("page1Header").style.display = "none";
        document.getElementById("page1").style.display = "none";

        document.getElementById("page2").style.display = "block";

    }, 1000);

});


// =================================
// انتخاب رنگ گونی
// =================================


const colorCards = document.querySelectorAll(".color-card");

const selectedMessage = document.createElement("p");

selectedMessage.id = "selectedColorMessage";
selectedMessage.textContent = "هنوز رنگی انتخاب نکردی!";

document.getElementById("colorsContainer")
    .insertAdjacentElement("afterend", selectedMessage);

colorCards.forEach(card => {

    card.addEventListener("click", function () {

        // حذف انتخاب قبلی
        colorCards.forEach(item => {
            item.classList.remove("selected");
        });

        // انتخاب کارت جدید
        this.classList.add("selected");

        // ذخیره رنگ
        selectedColor = this.dataset.color;

        // نمایش پیام
        selectedMessage.textContent =
            "رنگ انتخابی شما: " + selectedColor;

        selectedMessage.style.color = "#176b39";
        selectedMessage.style.fontWeight = "bold";
        selectedMessage.style.textAlign = "center";

    });

});
