const ws = new WebSocket(`ws://${window.location.hostname}:3000`);

let lastX = null, lastY = null, touchStartX = null, touchStartY = null, isScrolling = false;

ws.onopen = () => console.log("Connected to WebSocket!");
ws.onerror = (err) => console.error("WebSocket error:", err);
ws.onclose = () => console.log("Disconnected!");

// Send mouse movement data
function sendMouseMove(dx, dy) {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ dx, dy }));
    }
}

// Send left click
function sendClick() {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ click: true }));
    }
}

// Send right click
function sendRightClick() {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ rightClick: true }));
    }
}

// Send keyboard key press
function sendKeyPress(key) {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ key: key }));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const pad = document.querySelector(".mouse-pad");

    // 🖱️ Mouse movement (Desktop)
    pad.addEventListener("mousemove", (event) => {
        if (lastX !== null && lastY !== null) {
            let dx = event.movementX;
            let dy = event.movementY;
            sendMouseMove(dx, dy);
        }
        lastX = event.clientX;
        lastY = event.clientY;
    });

    // 📱 Touchpad movement (Mobile - Fixed accidental clicks)
    pad.addEventListener("touchstart", (event) => {
        if (event.touches.length > 0) {
            let touch = event.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
            isScrolling = false;
        }
    });

    pad.addEventListener("touchmove", (event) => {
        if (event.touches.length > 0) {
            let touch = event.touches[0];

            if (lastX !== null && lastY !== null) {
                let dx = touch.clientX - lastX;
                let dy = touch.clientY - lastY;
                sendMouseMove(dx, dy);
            }

            // Detect scrolling
            if (Math.abs(touch.clientX - touchStartX) > 10 || Math.abs(touch.clientY - touchStartY) > 10) {
                isScrolling = true;
            }

            lastX = touch.clientX;
            lastY = touch.clientY;
        }
    });

    pad.addEventListener("touchend", (event) => {
        if (!isScrolling) {
            sendClick();
            let touch = event.changedTouches[0];
            createTapEffect(touch.clientX, touch.clientY);
        }

        lastX = null;
        lastY = null;
    });

    pad.addEventListener("click", (event) => {
        sendClick();
        createTapEffect(event.clientX, event.clientY);
    });

    function createTapEffect(x, y) {
        let effect = document.createElement("div");
        effect.classList.add("tap-effect");
        effect.style.left = `${x}px`;
        effect.style.top = `${y}px`;
        document.body.appendChild(effect);
        setTimeout(() => effect.remove(), 300);
    }

    // 🎹 Keyboard functionality
    document.querySelectorAll(".key").forEach((button) => {
        button.addEventListener("click", () => {
            let key = button.dataset.key;
            sendKeyPress(key);
        });
    });

    // Left Click Button
    document.getElementById("left-click").addEventListener("click", () => {
        sendClick();
    });

    // Right Click Button
    document.getElementById("right-click").addEventListener("click", () => {
        sendRightClick();
    });
});
