const OpenAIApi = require("openai");
const Emitter = require('events').EventEmitter

module.exports = function (RED) {

    const emitter = new Emitter()

    function ChatGPTModelConfigNode(n) {
        const node = this

        RED.nodes.createNode(node, n);

        // Expose the emitter so that nodes can subscribe to the 'error' & 'connected' events
        node.emitter = emitter

        // setup the openAi API
        const configuration = {
            organization: node.credentials.orgid,
            apiKey: node.credentials.apikey,
        };
        node.openAIApi = new OpenAIApi(configuration);
        node.model = n.model

        /**
         * @function askGPT - Ask GPT a question
         * @param {string} prompt The prompt to send to the GPT API
         * @param {object} [config] Optional config object to override the node's config
         * @param {string} [config.model] Optional model to override the node's model
         * @param {object} [config.credentials] Optional credentials to override the node's settings
         * @param {string} [config.credentials.apikey] Optional apikey to override the node's settings
         * @param {string} [config.credentials.orgid] Optional orgid to override the node's settings
         * @param {boolean} [returnMsg=true] Optional flag to inhibit the `return msg` statement at the end of the code
         * @returns 
         */
        node.askGPT = function async(prompt, config, returnMsg = true) {
            let thisOpenAIApi = node.openAIApi
            const _model = (config ? config.model : null) || node.model
            if (config && config.credentials) {
                const oaiConfig = {
                    organization: config.credentials.orgid || node.credentials.orgid,
                    apiKey: config.credentials.apikey || node.credentials.apikey,
                };
                thisOpenAIApi = new OpenAIApi(oaiConfig);
            }

            const systemMessage = `Always respond with content for a Node-RED function node, always use const or let instead of var`
                + (returnMsg ? ", always return msg unless told otherwise" : ", don't return msg unless told otherwise")
                + ", don't use require() unless asked to use an external node module"
                + ", only respond with the code and inline code comments where necessary"
            // + ", don't add any additional commentary"
            // useful for debugging - we may wish to remove this later
            const dbgMessage =
                '\n################## GPT Request ########################\n' +
                '## GPT Request ##\n' +
                'system: ' + systemMessage + '\n' +
                'prompt: ' + prompt + '\n' +
                '#######################################################'
            node.log(dbgMessage)
            return thisOpenAIApi.chat.completions.create({
                model: _model,
                messages: [
                    { role: "system", content: systemMessage },
                    { role: "user", content: prompt }
                ],
            });
        }

        // Make sure we clean up after ourselves
        node.on('close', async function (done) {
            // TODO: ensure shutdown completes and doesn't error
            node.openAIApi = null
            done()
        })
    }

    RED.nodes.registerType("chatgpt-config", ChatGPTModelConfigNode, {
        credentials: {
            apikey: { type: "text" },
            orgid: { type: "text" }
        }
    });
}