const softwareInfo = document.querySelector(".SoftwareInfo");

const items = [
        `<div class="SoftwareInfo-Heading Heading">
            Software Data
        </div>`,
        `<div class="SoftwareInfo-Item">
            <span class="SoftwareInfo-Title">OS Version:</span> <span id="chargeValue" class="SoftwareInfo-Value">11.3.2</span>
        </div>`,
        `<div class="SoftwareInfo-Item">
            <span class="SoftwareInfo-Title">RAM Usage:</span> <span id="chargeValue" class="SoftwareInfo-Value">27.3 GB / 64 GB (42%)</span>
        </div>`,
        `<div class="SoftwareInfo-Item">
            <span class="SoftwareInfo-Title">CPU Usage:</span> <span id="chargeValue" class="SoftwareInfo-Value">72%</span>
        </div>`,
        `<div class="SoftwareInfo-Item">
            <span class="SoftwareInfo-Title">Packet Loss:</span> <span id="chargeValue" class="SoftwareInfo-Value">13%</span>
        </div>`,
    ];

softwareInfo.innerHTML = items.join("");
    // for (const item of items) {
    //     softwareInfo.append(item)
    // }

const cameraView = document.querySelector(".CameraView");
cameraView.classList.add('Background_white');
// $('.CameraView').addClass('Background_white');