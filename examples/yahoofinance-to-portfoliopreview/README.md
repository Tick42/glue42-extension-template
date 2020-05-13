# Glue42 Extension Template Examples - Yahoo Finance to Portfolio Preview

An "Open in Glue42" button inserted inside the Yahoo Finance instrument page that launches Portfolio Preview with the selected instrument.

## Prerequisites

[**Glue42 Enterprise**](https://glue42.com), [`node` & `npm`](https://nodejs.org/en/)

## Running the Demo

1. Clone this repo: https://github.com/Tick42/glue42-extension-template
2. Place the `yahoofinance.json` file in the `%LocalAppData%\Tick42\UserData\<REG-ENV>\apps` folder, where `<REG-ENV>` should be replaced by the region and environment of your **Glue42 Enterprise** copy (e.g., T42-DEMO).
3. Add the path to the `yahoofinance-to-portfoliopreview` folder to the `extensions` string array inside of the **Glue42 Enterprise** `system.json` file located in `%LOCALAPPDATA%\Tick42\GlueDesktop\config\system.json`.
4. Start **Glue42 Enterprise** and launch the Yahoo Finance application.
5. Search for an instrument (e.g., "AAPL").
6. Click on the inserted "Open in Glue42" button to open the Portfolio Preview application with the selected instrument.