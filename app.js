const express = require("express");
const WebSocket = require("ws");
const robot = require("robotjs");
const { execSync } = require("child_process");

const app = express();
const port = 3000;

// ✅ Function to Get Wi-Fi IPv4 Address
function getWiFiIPv4() {
    try {
        const output = execSync("netsh interface ip show config").toString();
        const wifiSection = output.split(/\r?\n\r?\n/).find(section =>
            /Wireless|Wi-Fi|WLAN/i.test(section)
        );

        if (!wifiSection) {
            console.warn("❌ Wi-Fi adapter not found. Falling back to localhost.");
            return "127.0.0.1";
        }

        const ipv4Match = wifiSection.match(/IP(v4)? Address[^:]*:\s+([\d.]+)/i);
        return ipv4Match ? ipv4Match[2] : "127.0.0.1";
    } catch (err) {
        console.error("❌ Error fetching Wi-Fi IPv4:", err);
        return "127.0.0.1";
    }
}

// 🌍 Get Wi-Fi IP
const wifiIPv4 = getWiFiIPv4();
console.log(`🌍 Server running at: http://${wifiIPv4}:${port}`);

app.use(express.static("public"));

// ✅ Start HTTP Server
const server = app.listen(port, wifiIPv4, () => {
    console.log(`✅ Server active: http://${wifiIPv4}:${port}`);
});

// ✅ WebSocket Server
const wss = new WebSocket.Server({ server });

let lastClickTime = 0;

wss.on("connection", (ws) => {
    console.log("📡 New client connected");

    ws.on("message", (data) => {
        try {
            const msg = JSON.parse(data);
            const now = Date.now();

            // ✅ Mouse Movement (Smooth)
            if (msg.dx !== undefined && msg.dy !== undefined) {
                let { x, y } = robot.getMousePos();
                let newX = x + msg.dx;
                let newY = y + msg.dy;
                console.log(`🖱️ Moving Mouse: dx=${msg.dx}, dy=${msg.dy}`);
                robot.moveMouseSmooth(newX, newY, 0.8);
            }

            // ✅ Left Click (No Limit)
            if (msg.click === "left") {
                console.log("🖱️ Left Click");
                robot.mouseClick("left");
                return
            }

            // ✅ Right Click (No Limit)
            if (msg.click === "right") {
                console.log("🖱️ Right Click");
                robot.mouseClick("right");
                return
            }

            // ✅ Trackpad Click (200ms Debounce)
            if (msg.click) {
                if (now - lastClickTime > 200) {
                    console.log("🖱️ Trackpad Click");
                    robot.mouseClick("left");
                    lastClickTime = now;
                } else {
                    console.warn("⚠️ Ignored rapid trackpad click");
                }
            }

            // ✅ Keyboard Press Handling
            if (msg.key) {
                if (msg.hold) {
                    console.log(`⌨️ Holding Key: ${msg.key}`);
                    robot.keyToggle(msg.key, "down");
                } else {
                    console.log(`⌨️ Pressing Key: ${msg.key}`);
                    robot.keyTap(msg.key);
                }
            }

            // ✅ Key Release
            if (msg.release) {
                console.log(`⌨️ Releasing Key: ${msg.release}`);
                robot.keyToggle(msg.release, "up");
            }

        } catch (error) {
            console.error("⚠️ Error processing message:", error);
        }
    });

    ws.on("close", () => console.log("❌ Client disconnected"));
});

// ✅ WebSocket Error Handling
wss.on("error", (err) => console.error("⚠️ WebSocket error:", err));
