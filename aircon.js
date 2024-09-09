const numberInput = document.getElementById('air_temp');
const plusButton = document.querySelector('.plus');
const minusButton = document.querySelector('.minus');

numberInput.value = localStorage.getItem("room_air_temp");
plusButton.addEventListener('click', () => {
  let currentValue = parseInt(numberInput.value);
  if(numberInput.value <= 25)
  {numberInput.value = currentValue + 1;}
  // console.log(numberInput.value);
  localStorage.setItem("room_air_temp",numberInput.value);
  iot_public(numberInput.value-20,"air_temp");
});

minusButton.addEventListener('click', () => {
  let currentValue = parseInt(numberInput.value);
  if(numberInput.value >= 23)
  {numberInput.value = currentValue - 1;}
  // console.log(numberInput.value);
  localStorage.setItem("room_air_temp",numberInput.value);
  iot_public(numberInput.value-20,"air_temp");
});

const toggleButton = document.getElementById('toggleButton');
let isOn = true; // ตั้งค่าเริ่มต้นเป็น "On"

toggleButton.addEventListener('click', () => {
  if (isOn) {
    toggleButton.textContent = 'OFF';
    toggleButton.classList.add('off');
    isOn = false;
  } else {
    toggleButton.textContent = 'ON';
    toggleButton.classList.remove('off');
    isOn = true;
  }
});

let currentMode = "AUTO"; // ค่าเริ่มต้นเป็น AUTO

const modeSelect = document.getElementById('modeSelect');
modeSelect.addEventListener('change', () => {
    currentMode = modeSelect.value;
    // อัปเดต UI หรือเรียกฟังก์ชันอื่น ๆ ตามต้องการ
});

function changeMode(newMode) {
    currentMode = newMode;
    modeSelect.value = newMode;

    // อัปเดต UI เพิ่มเติมตามต้องการ
    // ... (ตัวอย่าง: เปลี่ยนสีปุ่ม แสดงไอคอน ฯลฯ)
}

const upModeBtn = document.getElementById('up_mode');
const downModeBtn = document.getElementById('down_mode');

upModeBtn.addEventListener('click', () => {
    // Logic สำหรับเปลี่ยนโหมดขึ้น
    let newMode = currentMode;
    switch (newMode) {
        case "AUTO":
            newMode = "COOL";
            break;
        case "COOL":
            newMode = "DRY";
            break;
        case "DRY":
            newMode = "AUTO";
            break;
    }
    changeMode(newMode);
});

downModeBtn.addEventListener('click', () => {
    // Logic สำหรับเปลี่ยนโหมดลง
    let newMode = currentMode;
    switch (newMode) {
        case "AUTO":
            newMode = "DRY";
            break;
        case "COOL":
            newMode = "AUTO";
            break;
        case "DRY":
            newMode = "COOL";
            break;
    }
    changeMode(newMode);
});

//MQTT
connectMQTT();