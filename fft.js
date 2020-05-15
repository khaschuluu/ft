// Real = Number
// Imaginary = Number
// Radian = Number
// Complex = [Real, Imaginary]

// Complex add.
// In: a: Complex
//     b: Complex
// Out: Complex
const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];

// Complex subtract.
// In: a: Complex
//     b: Complex
// Out: Complex
const csub = (a, b) => [a[0] - b[0], a[1] - b[1]];

// Complex multiply.
// In: a: Complex
//     b: Complex
// Out: Complex
const cmul = (a, b) => [
    a[0]*b[0] - a[1]*b[1],
    a[0]*b[1] + a[1]*b[0]
];

// Complex exponential.
// In: phi: Radian
// Out: Complex
const cexp = (phi) => [
    parseFloat(Math.cos(phi).toFixed(10)),
    parseFloat(Math.sin(phi).toFixed(10))
];

// Complex amplitude.
// In: c: Complex
// Out: Number
const camp = (c) => Math.sqrt(c[0]**2 + c[1]**2);

// Complex swap (I don't know right name for that. But it swaps real and imaginary parts).
// In: c: Complex
// Out: Complex
const cswap = (c) => [c[1], c[0]];

// Complex normalize.
// In: c: Complex
//     n: Number
// Out: Complex
const cnorm = (c, n) => [c[0]/n, c[1]/n];

// Complex amplitude with sign.
// In: c: Complex
// Out: Number
const scamp = (c) => c[0]/Math.abs(c[0]) * Math.sqrt(c[0]**2 + c[1]**2);

// Fast Fourier Transform.
// In: x: [Complex|Number]
// Out: [Complex]
const FFT = (x) => {
    let N = x.length;

    // recursion
    if (N > 1) {
        // seperate samples as index is even or odd
        let even = [];
        let odd = [];

        for (let i=0; i<parseInt(N/2); i+=1) {
            even[i] = x[i*2];
            odd[i] = x[i*2+1];
        }

        // calculate FFT recursively on each seperated samples
        even = FFT(even);
        odd = FFT(odd);

        // main calculation
        for (let k=0; k<parseInt(N/2); k+=1) {
            let t = even[k];
            let exp = cexp(-2*Math.PI*k/N);
            even[k] = cadd(t, cmul(exp, odd[k]));
            odd[k] = csub(t, cmul(exp, odd[k]));
        }

        // join even and odd samples and return
        return [...even, ...odd];
    } else {
        // recursion bounce point
        // convert sample to Complex number when sample is Number
        if (Array.isArray(x[0])) {
            return [x[0]];
        } else {
            return [[x[0], 0]];
        }
    }
}

// Inverse Fast Fourier Transform.
// In: x: [Complex]
// Out: [Complex]
const IFFT = (x) => FFT(x.map(cswap)).map(cswap).map((c) => cnorm(c, x.length));

// Amplitudes.
// In: x: [Complex]
// Out: [Number]
const amps = (x) => x.map(camp);

// Amplitudes with sign.
// In: x: [Complex]
// Out: [Number]
const samps = (x) => x.map(scamp);

// Frequencies.
// In: x: [Complex]
// Out: [Number]
const freqs = (x) => x.slice(0, x.length).map((c) => camp(c)*2);

// Export functions as module for node.js.
if (typeof exports !== 'undefined') {
    exports.FFT = FFT;
    exports.FFT = IFFT;
    exports.amps = amps;
    exports.samps = samps;
    exports.freqs = freqs;
}

// example samples
// const s = [0, 1, 0, -1];
// const s = [1, 1, 1, 1, 0, 0, 0, 0];
// const s = [0, 0.707, 1, 0.707, 0, -0.707, -1, -0.707];
// const s = [1, 0, -1, -2, -3, -2, -3, -4, -3, -4];

// console.log(FFT(s));