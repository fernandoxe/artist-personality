import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { apiKey } from '../config';

const configuration = new Configuration({
  apiKey,
});

const openai = new OpenAIApi(configuration);

export const getResponse = async (songs: string[]) => {
  const newUserMessage = getUserMessage(songs);

  const messages: ChatCompletionRequestMessage[] = [
    // systemMessage,
    newUserMessage,
  ];
  const { data } = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 1,
    // top_p: 1,
    max_tokens: 200,
  });
  
  return `Eres ${data.choices[0].message?.content}`;
};

export const getUserMessage = (songs: string[]) => {
  const message: ChatCompletionRequestMessage = {
    role: 'user',
    content: `Based on these ${process.env.ARTIST} songs: ${songs.join(', ')}. Analyzing the lyrics. Without write these song names. Without write the words: "these songs", "lyrics", "songs", "album", "track", "artist", "${process.env.ARTIST}". In only one paragraph. Write a text that describes a person. Write in spanish, continue the text: Eres`,
  };
  return message;
};
