let scan_pos = 0;

const color_number = 1280;
// maximum amplitude (avg ~100, max ~240)
const max = 100;
const pwr = color_number/Math.log10(max);

const draw = (pcm, canvas) => {
    const fft = FFT(pcm);
    const fs = freqs(fft);
    const canvasContext = canvas.getContext("2d");
    const pwrheight = canvas.height/Math.log10(canvas.height);

    fs.reverse().forEach((a, i) => {
        let s = Math.log10(a)*pwr;
        let h = Math.log10(canvas.height-i+1)*pwrheight;
        let color = colorCount(s);
        canvasContext.fillStyle = `rgb(${color.red}, ${color.green}, ${color.blue})`;
        canvasContext.fillRect(scan_pos, canvas.height-h, 1, canvas.height);
    });

    scan_pos = (scan_pos + 1) % canvas.width;
}

// black    blue    cyan    green   yellow  red     magenta white
// 000000   0000ff  00ffff  00ff00  ffff00  ff0000  ff00ff  ffffff
//       256      256     256     256     256     256     256
// 0        256     512     778     1024    1280    1536    1792
// 256*7 = 1792

const colorCount = (n) => {
    let red = n < 768 ? 0 : n < 1024 ? n-768 : 256;
    let green = n < 256 ? 0 : n < 512 ? n-256 : n < 1024 ? 256 : n < 1280 ? 256-(n-1024) : 0;
    let blue = n < 256 ? n : n < 512 ? 256 : n < 778 ? 256-(n-512) : 0;

    return {red, green, blue};
}