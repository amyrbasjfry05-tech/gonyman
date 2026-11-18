
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let noCount = 0;

noBtn.addEventListener("click", function () {
    noCount++;

    const newSize = Math.max(0.05, 1 - noCount * 0.18);

    noBtn.style.transform = `scale(${newSize})`;
    noBtn.style.opacity = Math.max(0, 1 - noCount * 0.18);

    yesBtn.style.transform = `scale(${1 + noCount * 0.25})`;
});

yesBtn.addEventListener("click", function () {
    alert("درخواست شما تأیید شد! به مرحله بعد خوش آمدید.");
});
