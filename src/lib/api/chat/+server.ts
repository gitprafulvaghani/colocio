import { PRIVATE_OPENAI_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import OpenAI from 'openai';
import { context } from '$lib/context';
// import { encode } from "gpt-tokenizer";

const openai = new OpenAI({ apiKey: PRIVATE_OPENAI_KEY });
// const tokenLimit = 8192;

export const POST: RequestHandler = async ({ request }) => {
  try {
    if (!PRIVATE_OPENAI_KEY) {
      throw new Error('Missing OpenAI key');
    }

    const requestData = await request.json();

    if (!requestData) {
      throw new Error('No request data');
    }

    const reqMessage: OpenAI.Chat.ChatCompletionMessageParam[] =
      requestData.messages;

    if (!reqMessage) {
      throw new Error('No message');
    }

    const moderationRes = await fetch('https://api.openai.com/v1/moderations', {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${PRIVATE_OPENAI_KEY}`,
      },
      method: 'POST',
      body: JSON.stringify({
        input: reqMessage[reqMessage.length - 1].content,
      }),
    });
    const moderationData = await moderationRes.json();
    const [results] = moderationData.results;

    if (results.flagged) {
      throw new Error('Message flagged');
    }

    const prompt = context();

    const systemMessage: OpenAI.Chat.ChatCompletionSystemMessageParam = {
      role: 'system',
      content: prompt,
    };

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      systemMessage,
      ...reqMessage,
    ];

    const chatRequestOpts: OpenAI.Chat.ChatCompletionCreateParamsStreaming = {
      model: 'gpt-4-1106-preview',
      messages,
      temperature: 0.5,
      stream: true,
    };

    const stream = await openai.chat.completions.create(chatRequestOpts);

    const formatSSE = (id: number, data: string) =>
      `id: ${id}\ndata: ${JSON.stringify(data)}\n\n`;

    let eventId = 0;

    const readable = new ReadableStream({
      start(controller) {
        (async () => {
          let messageData = '';
          for await (const part of stream) {
            if (part.choices[0].finish_reason === 'stop') {
              controller.enqueue(formatSSE(eventId, '[DONE]'));
              break;
            } else {
              messageData += part.choices[0].delta.content;
              controller.enqueue(formatSSE(eventId, messageData));
              eventId++;
              messageData = '';
            }
          }
          controller.close();
        })();
      },
    });

    return new Response(readable, {
      headers: { 'Content-Type': 'text/event-stream' },
    });
  } catch (err) {
    console.error(err);
    return json({ error: 'there was an error' }, { status: 500 });
  }
};
