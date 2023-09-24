// import { kayle } from "kayle";
// import kaylePkg from 'kayle';
import kaylePkg from 'kayle';
const { autoKayle, setLogging } = kaylePkg;
// const { kayle, setLogging } = kaylePkg;
import { writeFileSync } from "fs";

// const kayle = kaylePkg.kayle;
// const { chromium } = require('playwright-chromium');
import { chromium } from 'playwright-chromium';


// with slowMo 2000 : endTime: 6689.554900050163
// with slowMo 200 : endTime: 3513.2085000276566
const browser = await chromium.launch({ headless: true, slowMo: 200 });
const context = await browser.newContext({
	bypassCSP: true,
	javaScriptEnabled: true,
	userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
	// javaScriptEnabled: false
});

// Playwright 🎭 or Puppeteer 🤖
const page = await browser.newPage();
// enable kayle log output
setLogging(true);
const startTime = performance.now();


// const browser = await chromium.launch({ headless: true });
// const page = await browser.newPage();

// crawls are continued to the next page automatically fast!
// const results = await autoKayle({
//   page,
//   browser,
//   runners: ["htmlcs", "axe"],
//   includeWarnings: true,
//   origin: "https://www.snelste.nl",
//   waitUntil: "domcontentloaded",
//   timeout: 60,
//   cb: function callback(result) {
//     console.log(result);
//   },
// });


function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error(`Function timed out after ${ms} milliseconds`));
        }, ms);
    });
}

const name = 'snelste'
try {
    const results = await autoKayle({
	page,
	browser,
	origin: "https://www." + name + ".nl",
	runners: ["htmlcs", "axe"],
	allowImages: true,
	clip: true, // get the clip cords to display in browser. Use clipDir or clip2Base64 to convert to image.
	// clipDir: "./essent", // optional: directory to store the clip as an image.
	clip2Base64: true, //
	// html: "<html>...</html>"
  });

writeFileSync(name + "htmlcs.json", JSON.stringify(results, null, 2),
    "utf8"
  );

} catch (error) {
    console.error('An error occurred:', error.message);
    // Handle the error as needed
}

const endTime = performance.now() - startTime;
console.log('endTime:', endTime)