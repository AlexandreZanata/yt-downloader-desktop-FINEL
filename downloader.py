import yt_dlp
import sys

def download_video(url, output_path):
    ydl_opts = {
        'outtmpl': f'{output_path}/%(title)s.%(ext)s',
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Uso: downloader.exe <url> <caminho_saida>")
        sys.exit(1)
    
    url = sys.argv[1]
    output_path = sys.argv[2]
    download_video(url, output_path)
