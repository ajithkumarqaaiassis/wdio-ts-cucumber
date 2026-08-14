Feature: WDIO Demo App Login

  As a mobile application user
  I want to use the login functionality
  So that I can verify the login feature works correctly

  @smoke @login
  Scenario: Login successfully with valid credentials
    Given the user navigates to the Login screen
    When the user enters valid login credentials
    And the user taps the Login button
    Then the message "You are logged in!" should be displayed