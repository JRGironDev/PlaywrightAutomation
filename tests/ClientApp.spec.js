import { expect, test } from '@playwright/test';


test('Client App Login', async ({ page }) => {
    const productName = "ZARA COAT 3";
    const products = page.locator('.card-body');
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill('joserobertoq@outlook.com');
    await page.locator('#userPassword').fill('2Hidroxil@');
    await page.locator('[value="Login"]').click();

    //await page.waitForLoadState('networkidle');

    await page.locator('.card-body b').first().waitFor();

    const titles = await page.locator('.card-body b').allTextContents();

    const count = await products.count();
    
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            //add to cart
            await products.nth(i).locator("text= Add to cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();

    await page.locator("div li").first().click();

    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();

    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();

    await page.locator("[placeholder*='Country']").pressSequentially('Ind');  

    const dropdown = page.locator(".ta-results")

    await dropdown.first().waitFor();

    const optionsCount = await dropdown.locator("button").count();

    for (let i = 0; i < optionsCount; i++) {
        const text = await dropdown.locator("button").nth(i).textContent();
        
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await page.pause();
});
