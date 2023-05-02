# Node-RED Function Node with integrated ChatGPT

A Node-RED node that adds an "Ask ChatGPT" input and button to a duplicate of the built-in function node.

<img width="1728" alt="Screenshot 2023-04-21 at 16 08 47" src="https://user-images.githubusercontent.com/99246719/233671631-fefa36c1-6db4-4392-a057-314c16fd91b7.png">


## Installation

To add the node to your own instance of Node-RED:

1. Open the "Menu" inside Node-RED
1. Click "Manage palette"
1. Select the "Install" tab
1. Search "chatgpt"
1. Install the `node-red-function-gpt` node

You will need a [valid API Key from OpenAI](https://platform.openai.com/account/api-keys)

## Troubleshooting 

After adding the node to the palette, you do currently need
to "Deploy", before you can use the integrated ChatGPT prompt.


## Copyright

This code is derived from the [core Node-RED Function node](https://github.com/node-red/node-red/blob/master/packages/node_modules/%40node-red/nodes/core/function/10-function.js) that is copyright OpenJS Foundation and licensed under the Apache License, Version 2.0