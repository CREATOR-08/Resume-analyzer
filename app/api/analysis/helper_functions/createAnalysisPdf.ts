
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";


export async function createAnalysisPdf(html: string) {
  const browser = await puppeteer.launch({
    args: chromium.args,

    executablePath: await chromium.executablePath(),
    headless: true,
  });

  try {
    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "load",
    });

    return Buffer.from(
      await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "18mm",
          right: "14mm",
          bottom: "18mm",
          left: "14mm",
        },
      })
    );
  } finally {
    await browser.close();
  }
}
