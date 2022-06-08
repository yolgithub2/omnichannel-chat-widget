import { Browser, BrowserContext } from "playwright";
import * as playwright from "playwright";
import { TestSettings } from "../../../configuration/test-settings";
import { BasePage } from "../../pages/base.page";
import { CustomLiveChatWidgetConstants, TimeoutConstants } from "e2e/utility/constants";

describe("Proactive Chat Default Tests", () => {
    let newBrowser: Browser;
    let context: BrowserContext;
    let page: BasePage;

    beforeEach(async () => {
        newBrowser = await playwright[TestSettings.Browsers as any].launch(
            TestSettings.LaunchBrowserSettings
        );
        context = await newBrowser.newContext({
            viewport: TestSettings.Viewport,
        });
    });

    afterEach(async () => {
        await context?.close();
        await newBrowser?.close();
    });

    test("Verify proactive chat shows for a default timeout", async () => {
        page = new BasePage(await context.newPage());
        await page.openLiveChatWidget();
        await page.startProactiveChat();
        expect(await page.Page.isVisible(CustomLiveChatWidgetConstants.ProactiveChatId)).toBeTruthy();
        await page.Page.waitForTimeout(TimeoutConstants.OneMinTimeout);
        expect(await page.Page.isVisible(CustomLiveChatWidgetConstants.LiveChatButtonId)).toBeTruthy();
        expect(await page.Page.isVisible(CustomLiveChatWidgetConstants.ProactiveChatId)).toBeFalsy();
    });
});
