# Glue42 Extension Template Examples - LinkedIn to GlassDoor

Selecting a LinkedIn profile syncs company with GlassDoor.

## Prerequisites

[**Glue42 Enterprise**](https://glue42.com), [`node` & `npm`](https://nodejs.org/en/)

## Running the Demo

1. Clone this repo: https://github.com/Tick42/glue42-extension-template
2. Place the `linkedin.json` and `glassdoor.json` files in the `%LocalAppData%\Tick42\UserData\<REG-ENV>\apps` folder, where `<REG-ENV>` should be replaced by the region and environment of your **Glue42 Enterprise** copy (e.g., T42-DEMO).
3. Add the path to the `linkedin` and `glassdoor` folders to the `extensions` string array inside of the **Glue42 Enterprise** `system.json` file located in `%LOCALAPPDATA%\Tick42\GlueDesktop\config\system.json`.
4. Start **Glue42 Enterprise** and launch the LinkedIn (you need to login the first time) and GlassDoor applications.
5. Opening a profile in LinkedIn syncs the current company of the profile with the GlassDoor application.