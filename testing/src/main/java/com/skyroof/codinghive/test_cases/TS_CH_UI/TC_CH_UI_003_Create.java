package com.skyroof.codinghive.test_cases.TS_CH_UI;

import com.skyroof.codinghive.test_utils.BaseTest;
import com.skyroof.codinghive.test_cases.TS_CH_UI.TC_CH_UI_001_Login;


import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.annotations.Test;

public class TC_CH_UI_003_Create extends BaseTest {

    @Test
    public void TC_CH_UI_003_Create() {

        //login
        //input username
        driver.findElement(By.id("username")).sendKeys("user1");
        //input password
        driver.findElement(By.id("password")).sendKeys("kodikos");
        //submit
        driver.findElement(By.name("submit")).click();

        waitForLoad();
        //logged in


        //click create
        driver.findElement(By.id("create-button")).click();

        //wait for create page to load
        waitForLoad();

        //insert to input fields

        //dropdown for project
        driver.findElement(By.id("project")).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("MuiAutocomplete-popper")));

        driver.findElement(By.xpath("//div[contains(@class,'MuiAutocomplete-popper') and contains(.,'Construction project')]")).click();

        //title
        driver.findElement(By.id("title")).sendKeys("testTitle");

        //description
        driver.findElement(By.id("description_")).sendKeys("This is a test description");

        //other details
        driver.findElement(By.id("otherDetails")).sendKeys(
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae. ");

        //assignor dropdown
        driver.findElement(By.id("assignor")).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("MuiAutocomplete-popper")));

        driver.findElement(By.xpath("//div[contains(@class,'MuiAutocomplete-popper') and contains(.,'user1')]")).click();

        //assignee dropdown
        driver.findElement(By.id("assignee")).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("MuiAutocomplete-popper")));
        driver.findElement(By.xpath("//div[contains(@class,'MuiAutocomplete-popper') and contains(.,'mia')]")).click();

        //status
        driver.findElement(By.xpath("//div[contains(@class,'MuiFormControl-root') and contains(.,'Κατάσταση')]")).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@class, 'MuiFormControl-root') and contains(.,'Κατάσταση')]")));
        driver.findElement(By.xpath("//li[contains(@class,'MuiListItem-button') and contains(.,'Closed')]")).click();

        //category
        driver.findElement(By.xpath("//div[contains(@class,'MuiSelect-root')")).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@class,'MuiFormControl-root') and contains(.,'Κατηγορία')]")));
        driver.findElement(By.xpath("//li[contains(@class,'MuiListItem-button') and contains(.,'Error')]")).click();

        //click create button

        driver.findElement(By.id("create-issue-btn")).click();

        //wait for page to load
        waitForLoad();

        //check if successful creation message appeared
        Assert.assertTrue(isElementPresent(By.className("fade.alert.alert-success show")));


    }
}
