'use strict';
require('dotenv').config();
const puppeteer = require('puppeteer')

exports.printPDF = async() => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://blog.risingstack.com', {waitUntil: 'networkidle0'});
  const pdf = await page.pdf({ format: 'A4' });

  await browser.close();
  return pdf
};