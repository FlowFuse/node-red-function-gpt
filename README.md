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


## Release process

In this project, the [Release Please](https://github.com/googleapis/release-please) is used to automatically determine the next release version based on the commit messages in the codebase.

By using the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), the project adheres to a standardized format for commit messages, which `Release Please` uses to determine whether the next release should be a major, minor, or patch release.

### Components

1. The `Prepare release` GitHub Action workflow:

    * A Release Please action that analyzes commit messages to determine the type of release required (major, minor, patch) based on the Conventional Commits specification
    * Creates a pre-release pull request with the proposed version bump and changelog
    * Once merged, automatically updates the version number in `package.json` and creates a new release on GitHub with the appropriate changelog

2. The `Lint Pull Request Title` GitHub Action workflow:

    * A workflow that runs on pull request creation and uses the `amannn/action-semantic-pull-request` action to validate that pull request titles follow the Conventional Commits format
    * Together with adjusted default merge commit message, this ensures that all commits merged into the main branch adhere to the expected format, allowing Release Please to function correctly

3. The `Release Published` GitHub Action workflow:

    * A workflow that runs when a new git tag in `v*.*.*` format is pushed and is responsible for publishing the new version of the package to the public npm registry using the `JS-DevTools/npm-publish` action
    * Once package is published, the workflow updates the package version in the Node-RED Flow Library catalogue

### Pull Request Title Format

The Conventional Commits preset expects pull request titles to be in the following format:

```
<type>(<scope>): <subject>
```

* Type: Describes the category of the commit. Examples include:
    * `feat`: A new feature (triggers a minor version bump).
    * `fix`: A bug fix (triggers a patch version bump).
    * `perf`: A code change that improves performance (triggers a patch version bump).
    * `refactor`: A code change that neither fixes a bug nor adds a feature (does not trigger a release unless it's accompanied by a BREAKING CHANGE).
    * `docs`: Documentation-only changes (does not trigger a release).
    * `chore`: Changes to the build process or auxiliary tools and libraries (does not trigger a release).
* Scope: An optional part that provides additional context about what was changed (e.g., module, component).
* Subject: A brief description of the changes.

### Handling Breaking Changes

To indicate a breaking change, the exclamation mark `!` should be used immediately after the type/scope:

* `feat!:`
* `fix!:`
* `refactor!:`

## Copyright

This code is derived from the [core Node-RED Function node](https://github.com/node-red/node-red/blob/master/packages/node_modules/%40node-red/nodes/core/function/10-function.js) that is copyright OpenJS Foundation and licensed under the Apache License, Version 2.0
