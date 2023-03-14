import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  organization: 'org-mMgRv6E22Z9PRKzuTo1J2Q7U',
  apiKey: process.env.OPENAI_API_KEY,
})

export const openai = new OpenAIApi(configuration)

