const { createProvider } = require('packages/bot/index')

const MetaProvider = require('packages/provider/src/meta/index')
const MockAdapter = require('packages/database/src/mock/index')

const { createBotDialog } = require('packages/contexts/src/dialogflow/index')

/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */

// const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer([
//     '📄 Aquí tenemos el flujo secundario',
// ])

// const flowDocs = addKeyword([
//     'doc',
//     'documentacion',
//     'documentación',
// ]).addAnswer(
//     [
//         '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
//         'https://bot-whatsapp.netlify.app/',
//         '\n*2* Para siguiente paso.',
//     ],
//     null,
//     null,
//     [flowSecundario]
// )

// const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
//     [
//         '🙌 Aquí encontras un ejemplo rapido',
//         'https://bot-whatsapp.netlify.app/docs/example/',
//         '\n*2* Para siguiente paso.',
//     ],
//     null,
//     null,
//     [flowSecundario]
// )

// const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
//     [
//         '🚀 Puedes aportar tu granito de arena a este proyecto',
//         '[*opencollective*] https://opencollective.com/bot-whatsapp',
//         '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
//         '[*patreon*] https://www.patreon.com/leifermendez',
//         '\n*2* Para siguiente paso.',
//     ],
//     null,
//     null,
//     [flowSecundario]
// )

// const flowDiscord = addKeyword(['discord']).addAnswer(
//     [
//         '🤪 Únete al discord',
//         'https://link.codigoencasa.com/DISCORD',
//         '\n*2* Para siguiente paso.',
//     ],
//     null,
//     null,
//     [flowSecundario]
// )

// const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
//     .addAnswer('🙌 Hola bienvenido a este *Chatbot*')
    // .addAnswer(
    //     [
    //         'te comparto los siguientes links de interes sobre el proyecto',
    //         '👉 *doc* para ver la documentación',
    //         '👉 *gracias*  para ver la lista de videos',
    //         '👉 *discord* unirte al discord',
    //     ],
    //     null,
    //     null,
    //     [flowDocs, flowGracias, flowTuto, flowDiscord]
    // )

const main = async () => {
    const adapterDB = new MockAdapter()
    // const adapterFlow = createFlow([flowPrincipal])

    const adapterProvider = createProvider(MetaProvider, {
        jwtToken: process.env.TOKEN_WA,
        numberId: process.env.NUMBER_ID,
        verifyToken: process.env.VERIFY_TOKEN,
    })

    /* Bot personalizado */
    // createBot({
    //     flow: adapterFlow,
    //     provider: adapterProvider,
    //     database: adapterDB,
    // })

    /* Bot con Dialogflow */
    createBotDialog({
        provider: adapterProvider,
        database: adapterDB,
    })
}

main()
