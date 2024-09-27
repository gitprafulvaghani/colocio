<script lang="ts">
  // import type { PageData } from "./$types";
  import type OpenAI from "openai";
  import { SSE } from "sse.js";
  import DOMPurify from "dompurify";
  // import { isWithinTokenLimit, encode } from "gpt-tokenizer";
  import ChatMessage from "$lib/components/chat/ChatMessage.svelte";

  // export let data: PageData;
  const tokenLimit = 8192;

  let query: string = "";
  let answer: string = "";
  let loading: boolean = false;
  let chatMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [];
  // let tokensArray: number[] = [];
  // let tokensWithinLimit: number | false = 0;
  // let tokenCount: number = 0;

  let scrollToDiv: HTMLDivElement;

  function scrollToBottom() {
    setTimeout(function () {
      scrollToDiv.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 100);
  }

  const handleSubmit = async () => {
    loading = true;
    chatMessages = [
      ...chatMessages,
      {
        role: "user",
        content: DOMPurify.sanitize(query, {
          FORBID_TAGS: ["a"],
        }),
      },
    ];

    // Check token limits and encode chat messages
    //
    // chatMessages.forEach((message) => {
    // 	if (message.content) {
    // 		tokensWithinLimit = isWithinTokenLimit(message.content, tokenLimit);
    // 		if (typeof tokensWithinLimit === "number") {
    // 			tokenCount += tokensWithinLimit;
    // 		}
    // 		const messageTokens: number[] = encode(message.content);
    // 		tokensArray = [...tokensArray, ...messageTokens];
    // 	}
    // });
    // console.info(tokensArray);

    const eventSource = new SSE("/api/chat", {
      headers: { "Content-Type": "application/json" },
      payload: JSON.stringify({ messages: chatMessages }),
    });
    query = "";
    eventSource.addEventListener("error", handleError);
    eventSource.addEventListener("message", (e) => {
      scrollToBottom();
      try {
        loading = false;

        if (JSON.parse(e.data) === "[DONE]") {
          chatMessages = [
            ...chatMessages,
            { role: "assistant", content: answer },
          ];
          answer = "";
          return;
        }

        const completionResponse = JSON.parse(e.data);
        if (completionResponse) {
          answer += completionResponse ?? "";
        }
      } catch (err) {
        handleError(err);
      }
    });
    eventSource.stream();
    scrollToBottom();
  };

  function handleError<T>(err: T) {
    loading = false;
    query = "";
    answer = "";
    console.error(err);
  }
</script>

<dialog>
  <div class="max-w-3xl mx-auto h-screen flex flex-col justify-end py-10">
    <div class="flex flex-col space-y-4 overflow-y-scroll px-8">
      <div class="flex flex-col gap-2" />
      {#each chatMessages as message}
        {#if message.content && typeof message.content === "string"}
          <ChatMessage message={message.content} type={message.role} />
        {/if}
      {/each}
      {#if answer}
        <ChatMessage message={answer} type="assistant" />
      {/if}
      {#if loading}
        <ChatMessage message="..." type="assistant" />
      {/if}
      <div class="" bind:this={scrollToDiv} />
    </div>
    <form
      on:submit|preventDefault={() => handleSubmit()}
      class="space-y-4 px-8"
    >
      <input
        type="text"
        bind:value={query}
        disabled={loading}
        class=" rounded-lg w-full bg-transparent text-white shadow-sm ring-1 border-white focus:border-white ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-white sm:leading-6 focus:shadow-[0_0_0_4px] focus:shadow-white/25 transition-shadow"
      />
      <button type="submit" disabled={loading}>&nbsp;</button>
    </form>
  </div>
</dialog>

<style lang="scss">
  dialog {
    @apply bg-custom-gradient block fixed z-50 inset-0 w-full;
  }
</style>
