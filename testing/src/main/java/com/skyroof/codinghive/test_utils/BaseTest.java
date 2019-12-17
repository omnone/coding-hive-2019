package com.skyroof.codinghive.test_utils;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class BaseTest {

    public static WebDriver driver;
    public static WebDriverWait wait;

    @BeforeTest
    public void setUp() {

        //Open browser
        System.setProperty("webdriver.chrome.driver", "/usr/bin/chromedriver");

        //create new chrome driver
        driver = new ChromeDriver();

        //navigate to web application
        driver.get("localhost:3000");

        //define global wait variable
        wait = new WebDriverWait(driver, 10);

        //maximize window
        driver.manage().window().maximize();
    }

    @AfterTest
    public void tearDown() {
        //driver.quit();
    }



    public void waitForLoad() {
        ExpectedCondition<Boolean> expectation = new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver webDriver) {
                return ((JavascriptExecutor) driver).executeScript("return document.readyState").toString().equals("complete");
            }
        };
        try {
            Thread.sleep(500);
            WebDriverWait wait = new WebDriverWait(driver, 30);
            wait.until(expectation);
        } catch (Throwable error) {
            Assert.fail("Timeout waiting for Page Load Request to complete");
        }
    }

    public Boolean isElementPresent(By by) {
        return driver.findElements(by).size() > 0;
    }

}
