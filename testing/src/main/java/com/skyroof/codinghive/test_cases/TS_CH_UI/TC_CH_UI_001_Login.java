package com.skyroof.codinghive.test_cases.TS_CH_UI;

import com.skyroof.codinghive.test_utils.BaseTest;
import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TC_CH_UI_001_Login extends BaseTest {

    @Test
    public void TC_CH_UI_001_Login() {
        //input username
        driver.findElement(By.id("username")).sendKeys("user1");
        //input password
        driver.findElement(By.id("password")).sendKeys("kodikos");
        //submit
        driver.findElement(By.name("submit")).click();

        waitForLoad();
        Assert.assertTrue(isElementPresent(By.id("nested-list-subheader")));
    }
}
