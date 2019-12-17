package com.skyroof.codinghive.test_cases.TS_CH_UI;

import com.skyroof.codinghive.test_utils.BaseTest;
import org.testng.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.annotations.Test;

public class TC_CH_UI_002_Search extends BaseTest {

    @Test
    public void TC_CH_UI_002_Search(){
        //login
        //input username
        driver.findElement(By.id("username")).sendKeys("user1");
        //input password
        driver.findElement(By.id("password")).sendKeys("kodikos");
        //submit
        driver.findElement(By.name("submit")).click();

        waitForLoad();
        //logged in

        //input title
        driver.findElement(By.id("title")).sendKeys("testTitle");

        //input status as closed
        driver.findElement(By.xpath("//div[contains(@class,'MuiFormControl-root') and contains(.,'Κατάσταση')]")).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@class, 'MuiFormControl-root') and contains(.,'Κατάσταση')]")));
        driver.findElement(By.xpath("//li[contains(@class,'MuiListItem-button') and contains(.,'Closed')]")).click();

        waitForLoad();

        driver.findElement(By.id("search-btn-s")).click();
        waitForLoad();

        //check if wanted issue appeared after search
        Assert.assertTrue(isElementPresent(By.xpath("//td[contains(.,'testTitle')]")));


    }
}
