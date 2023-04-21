const { Configuration, OpenAIApi } = require("openai");
const Emitter = require('events').EventEmitter

module.exports = function(RED) {

    const emitter = new Emitter()
    
    function ChatGPTModelConfigNode(n) {
        const node = this

        const model = n.model

        RED.nodes.createNode(node, n);

        const configuration = new Configuration({
            organization: node.credentials.orgid,
            apiKey: node.credentials.apikey,
        });
        let openai = new OpenAIApi(configuration);

        // Expose hte emitter so that nodes can subscribe to the 'error' & 'connected' events
        node.emitter = emitter

        node.askGPT = function async (prompt) {
            return openai.createChatCompletion({
                model: model,
                messages: [
                    {role: "system", content: "always respond with content for a Node-RED function node, and don't add any commentary, always use const or let instead of var. Always return msg, unless told otherwise."},
                    {role: "user", content: prompt}
                ],
            });
        }

        // Make sure we clean up after ourselves
        node.on('close', async function (done) {
            // TODO: ensure shutdown completes and doesn't error
            openai = null
            done()
        })
        
        node.openai = openai
    }

    RED.nodes.registerType("chatgpt-config", ChatGPTModelConfigNode, {
        credentials: {
            apikey: {type: "text"},
            orgid: {type: "text"}
        }
    });
}