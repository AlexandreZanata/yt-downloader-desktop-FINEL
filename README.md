```markdown
# YouTube Downloader

This is a YouTube video downloader application built with **Electron** and **yt-dlp**. The application allows users to download videos and audio from YouTube and other video-sharing platforms. It provides options to download in different formats, such as standard video quality, best quality, or audio only.

## Features

- Download YouTube videos in **MP4**, **MKV**, and **WEBM** formats.
- Download the **best quality video and audio**.
- Download **audio only** in **MP3** format.
- Simple and intuitive user interface built using **Electron**.
- Progress bar to show download status in real-time.
- Customizable download location for each file.
- Supports downloading videos from **YouTube, Instagram, Facebook, and Twitter (X)**.

## Requirements

Before using this application, ensure you have the following installed:

- **Node.js** (version 16 or later)
- **yt-dlp** (downloaded and bundled with the application)
- **Electron** (Electron will be installed automatically with dependencies)
- **FFmpeg** (optional but recommended for best quality downloads)

### Installing FFmpeg

FFmpeg is required to properly merge high-quality video and audio files. Without FFmpeg, high-quality videos may be downloaded as separate video and audio files instead of a single merged file.

#### How to Install FFmpeg:

- **Windows**:
  1. Download FFmpeg from the official website: [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html)
  2. Extract the downloaded file.
  3. Add the `bin` folder to the system PATH environment variable.
  
- **Windows (via Chocolatey)**:
  1. Open Command Prompt as Administrator.
  2. Run the following command:
     ```bash
     choco install ffmpeg
     ```
  3. Restart your system or update the PATH environment variable if necessary.

- **MacOS**:
  ```bash
  brew install ffmpeg
  ```

- **Linux**:
  ```bash
  sudo apt update && sudo apt install ffmpeg
  ```

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/youtube-downloader.git
   cd youtube-downloader
   ```

2. **Install dependencies**:

   Install the necessary dependencies using `npm` (Node Package Manager):

   ```bash
   npm install
   ```

3. **Run the application**:

   To start the application, run the following command:

   ```bash
   npm start
   ```

This will launch the application, and you will be able to download YouTube videos or audio directly.

## How to Use

1. **Open the Application**:
   - After starting the application, a window will open with a field to input the YouTube video URL.

2. **Enter the Video URL**:
   - Paste the YouTube, Instagram, Facebook, or Twitter (X) video URL in the text field.

3. **Choose the format**:
   - You will have three options to choose from:
     - **Vídeo Padrão** (Standard Video): Downloads the video in medium quality.
     - **Melhor Qualidade** (Best Quality): Downloads the best available quality for both video and audio.
     - **Somente Áudio** (Audio Only): Downloads only the audio in MP3 format.

4. **Start Download**:
   - Click the **"Baixar"** (Download) button to start downloading the file.

5. **Select Download Location**:
   - After clicking "Download", a file save dialog will appear, where you can choose the location and filename for the downloaded file.

6. **Progress Bar**:
   - The application will display a progress bar as the download is happening. You can track the download progress in real-time.

7. **Cancel Download**:
   - You can cancel the download at any time by closing the application or canceling the download process in the file dialog.

8. **Clear**:
   - Use the **"Limpar"** (Clear) button to clear the URL field and reset the download process.

## Customization

- You can change the look and feel of the application by modifying the **HTML**, **CSS**, and **JavaScript** files.
- The download options (e.g., quality or audio-only) can be adjusted in the `yt-dlp` command line arguments within the Electron app’s backend (`main.js` file).

## Known Issues

- Ensure you have **yt-dlp.exe** in the **resources/yt-dlp** folder, as the app relies on this for video downloads.
- Without **FFmpeg**, high-quality downloads will result in separate video and audio files instead of a single merged file.
- Download speed may vary based on the internet connection speed and video size.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository, make changes, and create a pull request. Any contributions are welcome!

---

Enjoy downloading your favorite videos and audio from YouTube, Instagram, Facebook, and Twitter (X)!
```
