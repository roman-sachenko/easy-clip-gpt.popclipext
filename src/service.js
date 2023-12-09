const { config } = require('./config')
const { callOpenAi } = require('./open-ai-client')

const PROMPT_MAPPER = config.prompt

const displayAnswer = (answer) => {
  /* eslint-disable no-undef */
  if (popclip.modifiers.command) {
    popclip.showText(answer, { preview: true })
  } else {
    popclip.pasteText(answer, { restore: true })
    popclip.showSuccess()
  }
  /* eslint-enable no-undef */
}

const ask = async (prompt, options) => {
  const answer = await callOpenAi(prompt, options)
  displayAnswer(answer)
}

const createPrompt = (input, task) => {
  const prompt = task.promptText
  return `${prompt}${input.text.trim()}`
}

const createHandler = (taskKey) => {
  const task = PROMPT_MAPPER[taskKey]
  return {
    title: task.title,
    icon: task.icon,
    code: async (input, options) =>
      await ask(createPrompt(input, task), options),
  }
}

module.exports = {
  createPrompt,
  createHandler,
  ask,
  actionHandlers: Object.keys(PROMPT_MAPPER).map(createHandler),
}
