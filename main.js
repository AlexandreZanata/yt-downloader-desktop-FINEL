const path = require('path');
const fs = require('fs');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { spawn } = require('child_process');

app.disableHardwareAcceleration();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'resources', 'icon.png.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  const downloadsPath = path.join(__dirname, 'downloads');
  if (!fs.existsSync(downloadsPath)) {
    fs.mkdirSync(downloadsPath);
  }
  createWindow();
});

ipcMain.on('download-video', (event, url, format) => {
  const devPath = path.join(__dirname, 'resources', 'yt-dlp', 'yt-dlp.exe');
  let ytDlpPath = fs.existsSync(devPath)
    ? devPath
    : path.join(process.resourcesPath, 'yt-dlp', 'yt-dlp.exe');

  if (!fs.existsSync(ytDlpPath)) {
    event.reply('download-status', 'Erro: yt-dlp.exe não encontrado.');
    return;
  }

  let filters;
  let defaultPath;

  if (format === 'audio') {
    filters = [{ name: 'Áudio', extensions: ['mp3'] }];
    defaultPath = path.join(app.getPath('downloads'), '%(title)s.mp3');
  } else {
    filters = [
      { name: 'Vídeo', extensions: ['mp4', 'mkv', 'webm'] },
      { name: 'Todos os Arquivos', extensions: ['*'] }
    ];
    defaultPath = path.join(app.getPath('downloads'), '%(title)s.%(ext)s');
  }

  dialog.showSaveDialog({
    title: 'Escolha o local para salvar',
    defaultPath: defaultPath,
    filters: filters
  }).then(result => {
    if (result.canceled) {
      event.reply('download-status', 'Download cancelado.');
      return;
    }

    let downloadPath = result.filePath;
    let args = [url, '-o', downloadPath, '--no-check-certificate'];

    // Para o formato de áudio
    if (format === 'audio') {
      args.push('-x', '--audio-format', 'mp3');
      downloadPath = downloadPath.replace(/\.[^.]+$/, ".mp3");
    }
    // Para o melhor vídeo + áudio
    else if (format === 'best') {
      args.push('-f', 'bestvideo');
    }
    // Para o vídeo padrão de 480p
    else if (format === 'default') {
      args.push('-f', 'bestvideo[height<=480]');
    }
    
    args.push('--newline');

    const child = spawn(ytDlpPath, args);

    child.stdout.on('data', (data) => {
      const output = data.toString();
      const match = output.match(/(\d+\.\d+)%/);
      if (match) {
        const percent = parseFloat(match[1]);
        event.reply('download-progress', percent);
      }
    });

    child.stderr.on('data', (data) => {
      console.error("yt-dlp stderr:", data.toString());
    });

    child.on('close', (code) => {
      if (code !== 0) {
        event.reply('download-status', `Erro: o processo terminou com código ${code}.`);
      } else {
        event.reply('download-progress', 100);
        event.reply('download-status', `Download concluído! Arquivo salvo em: ${downloadPath}`);
      }
      console.log(`yt-dlp finalizado com código ${code}`);
    });
  }).catch(err => {
    console.error('Erro ao mostrar a caixa de diálogo:', err);
    event.reply('download-status', 'Erro ao solicitar o local de download.');
  });
});
