const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

const onSubmit = (e) => {
  e.preventDefault();
  clear();
  const urlEl = document.getElementById("url");
  const sizeEl = document.getElementById("size");
  const url = urlEl.value;
  const size = sizeEl.value;
  if (!url) return;
  showSpinner();
  setTimeout(() => {
    hideSpinner();
    generate(url, size);
    setTimeout(() => {
      const saveUrl = qr.querySelector("img").src;
      createSaveBtn(saveUrl);
    }, 50);
  }, 1000);
};
form.addEventListener("submit", onSubmit);
const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};
const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};
const clear = () => {
  qr.innerHTML = "";
  const btn = document.getElementById("save-link");
  if (btn) btn.remove();
};
const createSaveBtn = (pngUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.href = pngUrl;
  link.download = "qrcode";
  link.innerHTML = "Save Image";
  document.getElementById("generated").appendChild(link);
};
const generate = (url, size) => {
  const qrCode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
};
