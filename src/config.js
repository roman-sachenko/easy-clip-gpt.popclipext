const PROMPT = {
  PROOFREAD: {
    title: 'Proofread',
    promptText:
      'Proofread, fix typos and mistakes. Do not change text too much, I need it to be fixed: \n\n',
    icon: 'symbol:rectangle.and.pencil.and.ellipsis',
  },
  SUMMARIZE: {
    title: 'Summarize',
    promptText:
      'Please summarize the following text as concisely as possible, focusing on the key points and main ideas: \n\n',
    icon: 'symbol:message.badge.waveform.fill',
  },
  REFACTOR_CODE: {
    title: 'Refactor Code',
    promptText:
      'Refactor the following code snippet for improved readability and efficiency. Provide the refactored code only, without additional explanations: \n\n',
    icon: 'symbol:rectangle.portrait.rotate',
  },
  CONVERT_TO_CODE: {
    title: 'Convert to Code',
    promptText:
      'Convert the given description into a code snippet. If not language provided in request, use JavaScript. Ensure the code accurately represents the described functionality: \n\n',
    icon: 'symbol:function',
  },
  FORMAT_AS_TICKET: {
    title: 'Format as Ticket',
    promptText:
      'Format the provided text into a structured JIRA/GitHub Projects ticket format. The "What" section should detail the tasks to be completed. The "Why" section should explain the rationale behind these tasks. The "Outcome" section should describe the expected end result and outline the acceptance criteria: \n\n',
    icon: 'symbol:ticket.fill',
  },
}

const config = Object.freeze({
  clients: {
    openAi: {
      ApiUrl: 'https://api.openai.com/v1/chat/completions',
    },
  },
  prompt: PROMPT,
})

module.exports = {
  config,
}
