const { chromium, devices: playwrightDevices } = require("playwright");
const fs = require("fs");

const BASE_URL =
  process.env.BASE_URL || "http://localhost:5173";


// ============================================================
// USUÁRIOS
// ============================================================

const users = {
  secretary: {
    email: "secretary@example.com",
    password: "password",
  },

  warehouse: {
    email: "warehouse@example.com",
    password: "password",
  },

  ubs: {
    email: "ubs@example.com",
    password: "password",
  },

  beneficiary: {
    email: "beneficiary@example.com",
    password: "password",
  },
};


// ============================================================
// DISPOSITIVOS
// ============================================================

const devices = {
  desktop: {
    viewport: {
      width: 1440,
      height: 900,
    },
    isMobile: false,
  },

  mobile: {
    ...playwrightDevices["iPhone 13"],
    isMobile: true,
  },
};

// ============================================================
// ROTAS
// ============================================================

const routes = {
  secretary: [
    "/secretaria",
    "/secretaria/novo-beneficiario",
    "/secretaria/novo-ubs",
    "/secretaria/novo-almoxarifado",

    "/secretaria/beneficiario/ultima-veriricacao",
    "/secretaria/beneficiario/lista",
    "/secretaria/beneficiario/desativados",
    "/secretaria/beneficiario/status/suspensoes/ubs",

    "/secretaria/configuracoes",
    "/secretaria/relatorios",

    "/secretaria/agendamento/lista",

    "/secretaria/almoxarifado/lista",
    "/secretaria/ubs/lista",

    "/secretaria/retirada/lista",
  ],

  warehouse: [
    "/almoxarifado",
    "/almoxarifado/configuracoes",
    "/almoxarifado/configuracoes/funcionamento",

    "/almoxarifado/relatorios",

    "/almoxarifado/agendamento/hoje",
    "/almoxarifado/agendamento/lista",

    "/almoxarifado/beneficiario/lista",

    "/almoxarifado/retirada/lista",
    "/almoxarifado/retirada/registrar",
  ],

  ubs: [
    "/ubs",
    "/ubs/configuracoes",
    "/ubs/atualizar-localizacao",

    "/ubs/beneficiario/lista",
    "/ubs/beneficiario/ultima-veriricacao",
  ],

  beneficiary: [
    "/beneficiario",
    "/beneficiario/retirada/historico",
    "/beneficiario/dados",
    "/beneficiario/ubs",

    "/beneficiario/agendamento/historico",
    "/beneficiario/agendamento/criar",
    "/beneficiario/agendamento/cancelaveis",

    "/beneficiario/configuracoes",
  ],
};


// ============================================================
// ROTAS DINÂMICAS
// ============================================================

const dynamicRoutes = {
  secretary: [
    "/secretaria/beneficiario/desabilitar-conta/10",
    "/secretaria/beneficiario/editar/prescricao/10",
    "/secretaria/beneficiario/detalhes/1",
    "/secretaria/beneficiario/editar/status/10",
    "/secretaria/beneficiario/pdf/10",

    "/secretaria/agendamento/detalhes/1",
    "/secretaria/agendamento/pdf/2",

    "/secretaria/usuario/detalhes/1",
    "/secretaria/ubs/detalhes/1",

    "/secretaria/retirada/detalhes/1",
    "/secretaria/retirada/pdf/1",
  ],

  warehouse: [
    "/almoxarifado/agendamento/criar/1",
    "/almoxarifado/agendamento/cancelar/1",
    "/almoxarifado/agendamento/ausente/1",
    "/almoxarifado/agendamento/detalhes/1",
    "/almoxarifado/agendamento/pdf/1",

    "/almoxarifado/beneficiario/detalhes/1",
    "/almoxarifado/beneficiario/pdf/2",

    "/almoxarifado/retirada/detalhes/1",
    "/almoxarifado/retirada/pdf/1",
  ],

  ubs: [
    "/ubs/beneficiario/detalhes/123",
    "/ubs/beneficiario/editar/status/123",
    "/ubs/beneficiario/pdf/123",
  ],

  beneficiary: [
    // Coloque IDs reais aqui quando tiver
    // "/beneficiario/agendamento/detalhes/2",
    // "/beneficiario/agendamento/cancelar/123",
    // "/beneficiario/agendamento/pdf/123",
    // "/beneficiario/retirada/detalhes/123",
    // "/beneficiario/retirada/pdf/123",
  ],
};


// ============================================================
// NOME DO ARQUIVO
// ============================================================

function routeName(route) {
  return (
    route
      .replace(/^\/+/, "")
      .replace(/\//g, "_")
      .replace(/[?=:]/g, "-") || "home"
  );
}


// ============================================================
// LOGIN
// ============================================================

async function login(page, user) {
  console.log(`\n🔐 Fazendo login como ${user.email}`);

  await page.goto(`${BASE_URL}/login`, {
    waitUntil: "networkidle",
  });

  console.log("📍 Página atual:", page.url());


  // ----------------------------------------------------------
  // Botão que abre o formulário
  // ----------------------------------------------------------

  const loginButton = page.locator(
    'xpath=//*[@id="root"]/main/div/div/div/div[2]/div/button[2]'
  );

  await loginButton.waitFor({
    state: "visible",
    timeout: 10000,
  });

  await loginButton.click();

  console.log("✅ Formulário de login aberto");


  // ----------------------------------------------------------
  // EMAIL
  // ----------------------------------------------------------

  const emailInput = page.locator(
    'xpath=//*[@id="root"]/main/div/div/div/div[3]/div/form/div[1]/input'
  );

  await emailInput.waitFor({
    state: "visible",
    timeout: 10000,
  });

  await emailInput.fill(user.email);


  // ----------------------------------------------------------
  // SENHA
  // ----------------------------------------------------------

  const passwordInput = page.locator(
    'xpath=//*[@id="root"]/main/div/div/div/div[3]/div/form/div[2]/input'
  );

  await passwordInput.fill(user.password);


  console.log("✍️ Credenciais preenchidas");


  // ----------------------------------------------------------
  // ENVIAR
  // ----------------------------------------------------------

  const submitButton = page.locator(
    'xpath=//*[@id="root"]/main/div/div/div/div[3]/div/form/button'
  );

  await submitButton.click();

  console.log("📤 Login enviado");


  // ----------------------------------------------------------
  // ESPERA LOGIN
  // ----------------------------------------------------------

  await page.waitForTimeout(3000);

  console.log(
    "📍 URL depois do login:",
    page.url()
  );


  // ----------------------------------------------------------
  // VERIFICA SE LOGIN DEU CERTO
  // ----------------------------------------------------------

  if (page.url().includes("/login")) {
    await page.screenshot({
      path: `login-falhou-${user.email.replace(
        "@",
        "-at-"
      )}.png`,
      fullPage: true,
    });

    throw new Error(
      `Login falhou para ${user.email}. URL atual: ${page.url()}`
    );
  }

  console.log(
    `✅ Login realizado: ${user.email}`
  );
}


// ============================================================
// SCREENSHOT
// ============================================================

async function takeScreenshot(
  page,
  role,
  deviceName,
  route
) {
  const name = routeName(route);

  const directory =
    `screenshots/${role}/${deviceName}`;

  fs.mkdirSync(directory, {
    recursive: true,
  });


  console.log(
    `📸 [${deviceName}] ${role}: ${route}`
  );


  try {
    await page.goto(`${BASE_URL}${route}`, {
      waitUntil: "networkidle",
    });


    // Aguarda componentes React/API
    await page.waitForTimeout(1000);


    await page.screenshot({
      path: `${directory}/${name}.png`,

      // Captura página inteira
      fullPage: true,
    });


    console.log(
      `   ✅ ${directory}/${name}.png`
    );


  } catch (error) {

    console.log(
      `   ❌ Erro em ${route}`
    );

    console.log(
      `   ${error.message}`
    );
  }
}


// ============================================================
// EXECUÇÃO
// ============================================================

async function main() {

  const browser = await chromium.launch({

    // false = mostra o navegador
    // true = roda escondido
    headless: false,

    slowMo: 100,
  });


  // ==========================================================
  // CADA USUÁRIO
  // ==========================================================

  for (const [role, user] of Object.entries(users)) {

    console.log(
      "\n========================================"
    );

    console.log(
      `👤 PERFIL: ${role}`
    );

    console.log(
      "========================================"
    );


    // ========================================================
    // CADA DISPOSITIVO
    // ========================================================

    for (const [deviceName, deviceConfig] of Object.entries(
      devices
    )) {

      console.log(
        `\n📱 DISPOSITIVO: ${deviceName}`
      );


      // ------------------------------------------------------
      // Cria contexto
      // ------------------------------------------------------

      const context =
        await browser.newContext(
          deviceConfig
        );


      const page =
        await context.newPage();


      try {

        // ----------------------------------------------------
        // LOGIN
        // ----------------------------------------------------

        await login(
          page,
          user
        );


        // ----------------------------------------------------
        // ROTAS NORMAIS
        // ----------------------------------------------------

        for (
          const route of routes[role]
        ) {

          await takeScreenshot(
            page,
            role,
            deviceName,
            route
          );
        }


        // ----------------------------------------------------
        // ROTAS DINÂMICAS
        // ----------------------------------------------------

        for (
          const route of dynamicRoutes[role]
        ) {

          await takeScreenshot(
            page,
            role,
            deviceName,
            route
          );
        }


      } catch (error) {

        console.log(
          `❌ Erro no perfil ${role}`
        );

        console.log(
          error.message
        );
      }


      // ------------------------------------------------------
      // Fecha contexto
      // ------------------------------------------------------

      await context.close();
    }
  }


  await browser.close();


  console.log(
    "\n========================================"
  );

  console.log(
    "🎉 TODOS OS SCREENSHOTS FORAM FINALIZADOS"
  );

  console.log(
    "========================================"
  );
}


main();
