const axios = require('axios')

const { config } = require('./config')

const AI_DEFAULT_MODEL = 'gpt-3.5-turbo'

const callOpenAi = async (prompt, { aiModel, apiKey }) => {
  if (!prompt.length) {
    throw new Error('Prompt is empty')
  }

  if (!apiKey) {
    throw new Error('API key is empty')
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  }

  const apiUrl = config.clients.openAi.ApiUrl
  const requestBody = {
    model: aiModel || AI_DEFAULT_MODEL,
    messages: [{ role: 'user', content: prompt }],
  }

  try {
    const { data } = await axios.post(apiUrl, requestBody, { headers })
    const response = data.choices[0].message.content.trim()
    return response
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = {
  callOpenAi,
}
