# Glue42 Extension Template Examples - LinkedIn to Client List

Selecting a LinkedIn profile syncs the contact with the Client List application.

## Prerequisites

[**Glue42 Enterprise**](https://glue42.com) 3.9.1 or later, [`node` & `npm`](https://nodejs.org/en/)

## Running the Demo

1. Clone this repo: https://github.com/Tick42/glue42-extension-template
2. Place the `linkedin.json` file in the `%LocalAppData%\Tick42\UserData\<REG-ENV>\apps` folder, where `<REG-ENV>` should be replaced by the region and environment of your **Glue42 Enterprise** copy (e.g., T42-DEMO).
3. Add the path to the `linkedin-to-clientlist` folder to the `extensions` string array inside of the **Glue42 Enterprise** `system.json` file located in `%LOCALAPPDATA%\Tick42\GlueDesktop\config\system.json`.
4. Start **Glue42 Enterprise** and launch the LinkedIn (you need to login the first time) and Client List applications.
5. In LinkedIn, find the profile of one of the clients from the Client List application.
6. Opening the profile syncs the contact with the Client List application and displays a notification.