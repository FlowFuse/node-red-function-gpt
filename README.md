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

## How to Use

### Basic Example

<img width="652" alt="Screenshot 2023-05-17 at 12 45 08" src="https://github.com/FlowFuse/node-red-function-gpt/assets/99246719/3684d81a-1591-4fe2-a632-dfa8e3a3af93">

1. Add the Function GPT nodes to your editor
2. Configure your ChatGPT credentials 
3. Deploy your nodes
4. Open the function-gpt node
5. Type your prompt into the text input at the bottom of the editor panel and click "Ask ChatGPT".

### Inline Prompts

If you want to inject code into already written content, you can write an inline prompt. These prompts are written as comments, e.g.:

```js
//$PROMPT: Double the input
```
If you've configured Node-RED to use the "Monaco" editor, this will then show an "Ask ChatGPT" hyperlink above the inserted comment, that you can click to ask this to ChatGPT.

<img width="266" alt="Screenshot 2023-05-17 at 12 43 51" src="https://github.com/FlowFuse/node-red-function-gpt/assets/99246719/cc16e946-ad78-4f68-99f2-ae35898c55c2">

You can have as many of these within the function node as you like.

## Troubleshooting 

After adding the node to the palette, you do currently need
to "Deploy", before you can use the integrated ChatGPT prompt.


## Copyright

This code is derived from the [core Node-RED Function node](https://github.com/node-red/node-red/blob/master/packages/node_modules/%40node-red/nodes/core/function/10-function.js) that is copyright OpenJS Foundation and licensed under the Apache License, Version 2.0
