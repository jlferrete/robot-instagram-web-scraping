const puppeteer = require("puppeteer");
const tag = "dogs";
const likes = 3;
const colors = require("colors");
const dotenv = require('dotenv');
let counter = 0;
//Dotenv config
require("dotenv").config();
const user = process.env.USER;
const password = process.env.PASSWORD;

(async() => {
    try {
        console.log(`Iniciating the robot 🚀`.blue);
        const browser = await puppeteer.launch({
            headless: false,
            devtools: true,
        });
        const page = await browser.newPage();
        await page.goto("https://instagram.com");
        console.log(`Login in ⚛️`.blue);
        // Esperar que cargue selector de cookies
        await page.waitForSelector("div[class='mt3GC'] > button:nth-child(1)", {
            visible: true,
        });
        await page.click("div[class='mt3GC'] > button:nth-child(1)");
        // Seleccionar y escribir en usuario y contraseña
        await page.waitForSelector("input[name='username']", {
            visible: true,
            //   timeout: 5000,
        });
        await page.type("input[name='username']", user, { delay: 200 });
        await page.type("input[name='password']", password, { delay: 200 });
        // clickear en iniciar sesion
        await page.click("button[type='submit']");
        // Esperar que cargue
        await page.waitForSelector("div[class='cmbtv'] > button", {
            visible: true,
        });
        console.log(`Succefully logged in ✅`.bgGreen.black);
        await page.click("div[class='cmbtv'] > button");
        // esperar que cargue y saltar
        await page.waitForSelector("div[class='mt3GC'] > button:nth-child(1)", {
            visible: true,
        });
        await page.click("div[class='mt3GC'] > button:nth-child(1)");
        console.log(`Going to ${tag} ##hashtag##`.blue);
        await page.goto(`https://www.instagram.com/explore/tags/${tag}/`);
        await page.waitForSelector("div[class='EZdmt']", {
            visible: true,
        });
        await page.click("div[class='EZdmt'] + h2 + div > div > div > div > a");
        console.log(`Starting to like`.blue);
        // dar like y seguir
        for (let i = 0; i < likes; i++) {
            await page.waitForSelector("span.fr66n > button[class='wpO6b ']", {
                visible: true,
            });
            await page.click("span.fr66n > button[class='wpO6b ']");
            await page.click("a[class=' _65Bje  coreSpriteRightPaginationArrow']");
            counter++;
            console.log(`You gave ${i + 1} like ❤️`.green);
            await page.waitForTimeout(2000);
        }
        console.log(
            `You've liked ❤️  #${tag} recent pictures ${counter} times`.bgGreen.black
        );
        await process.exit();
    } catch (error) {
        console.error(error);
    }
})();