Yeah, I do! Your GitHub username is **MarsToPluto**. Here's the corrected `README.md` with your GitHub link:  

```md
# Remote Mouse & Keyboard Control via WebSockets

This project allows users to control a remote computer's mouse and keyboard using a web interface. It uses WebSockets to send real-time input events.

## 🚀 Features

- ✅ **Mouse Control**: Move the mouse using touch gestures or drag on the pad.
- ✅ **Left & Right Clicks**: Supports both left and right mouse clicks.
- ✅ **Keyboard Input**: Send key presses using an on-screen keyboard.
- ✅ **Touch Support**: Works on both desktop and mobile devices.
- ✅ **Tap Gesture**: Simulates a mouse click when tapping on the touchpad.
- ✅ **WebSocket Communication**: Ensures real-time interaction with minimal latency.

## 📦 Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/MarsToPluto/w-CURsED.git
cd w-CURsED
```

### 2️⃣ Install Dependencies
Make sure you have **Node.js** installed, then run:
```sh
npm install
```

### 3️⃣ Run the WebSocket Server
Start the server to handle WebSocket connections:
```sh
node server.js
```

### 4️⃣ Open the Web Interface
1. Open your browser.
2. Navigate to `http://localhost:3000`.

Now you can use the interface to control the mouse and keyboard remotely.

## 🔧 Usage

- **Mouse Movement**: Click and drag on the virtual touchpad.
- **Click Actions**: Use the on-screen buttons for left and right clicks.
- **Keyboard Input**: Click on a key from the on-screen keyboard to send keystrokes.
- **Touch Support**: Tap to click, swipe to move the cursor.

## 🐞 Bugs & Issues

- ⚠ **Special Key Handling Issue**: Some keys like `Shift`, `Ctrl`, `Alt`, `Enter`, `Backspace`, and `Arrow Keys` may not work correctly.
  - Possible cause: Special keys need different event handling when sending via WebSocket.
  - Temporary workaround: Use an external keyboard if needed.
  - Fix needed: Implement a better key event system that correctly maps special keys.

## 📜 Code Overview

### 🔹 `server.js`
Handles WebSocket connections and receives input events from the client.

### 🔹 `public/script.js`
Manages user input from the webpage and sends events via WebSocket.

### 🔹 `public/index.html`
Contains the UI elements for the virtual mouse and keyboard.

### 🔹 `public/style.css`
Styles the touchpad, buttons, and tap effect animations.

## 🛠️ To-Do

- [ ] Fix special key handling for keyboard inputs.
- [ ] Improve mobile gesture recognition.
- [ ] Add multi-touch support for scrolling and zooming.

## 🏆 Contributions

Feel free to open issues or submit pull requests. Your feedback and improvements are welcome! 🚀

## 📄 License

This project is open-source under the [MIT License](LICENSE).

---
Made with ❤️ by [MarsToPluto](https://github.com/MarsToPluto)
```

Now it's personalized! 🚀 Let me know if you want any more tweaks. 🔥