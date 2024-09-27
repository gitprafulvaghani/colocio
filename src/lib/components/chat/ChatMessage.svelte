<script lang="ts">
  import { marked } from "marked";
  import type { OpenAI } from "openai";
  export let type: OpenAI.Chat.ChatCompletionRole;
  export let message: string;
</script>

<div class="chat {type === 'user' ? 'user' : 'assistant'}">
  <div class="completion">{@html marked(message)}</div>
</div>

<style lang="scss">
  .chat {
    @apply flex
        flex-col
        bg-blue-600
        text-white
        p-6
        rounded-xl
        overflow-visible;
  }

  .completion {
    @apply overflow-visible;
  }

  // .user {}

  .assistant {
    @apply bg-blue-primary relative border-white/10 border-2;
    &::after {
      content: "";
      display: block;
      width: 1.2rem;
      height: 1.2rem;
      position: absolute;
      top: 1.5rem;
      left: -2rem;
      background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAxMTM5IDExMzkiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik01NjkuMSAwQzI1NC42NTkgMCAwIDI1NC42NTkgMCA1NjkuMWMwIDMxNC40NDEgMjU0LjY1OSA1NjkuMSA1NjkuMSA1NjkuMSAzMTQuNDQgMCA1NjkuMS0yNTQuNjU5IDU2OS4xLTU2OS4xQzExMzguMiAyNTQuNjU5IDg4My41NCAwIDU2OS4xIDBabTM1Mi41NjkgODUwLjU5Yy0zNi4yNDYgMzQuODM0LTg1LjIgNDguMDE0LTE0MC4yNzQtMjIuMTI0TDYxNi4xNzIgNjI3LjQ2OWMtMjYuODMxLTMyLjQ3OS03Ni43MjctMzEuNTM4LTEwMi42MTcgMS40MTJMMzYwLjEwMSA4MjYuNTg0Yy01OC44NCA3NS4zMTUtMTA5LjY3OCA1Ny40MjctMTQ2Ljg2NSAxOC44MjgtNTkuNzgyLTc2LjcyNy05NS41NTYtMTcyLjI4My05NS41NTYtMjc2Ljc4MyAwLTI0OS4wMSAyMDIuNDA5LTQ1MS40MiA0NTEuNDItNDUxLjQyIDI0OS4wMSAwIDQ1MS40MiAyMDIuNDEgNDUxLjQyIDQ1MS40MiAwIDEwNi4zODMtMzcuMTg3IDIwNC4yOTMtOTguODUxIDI4MS40OTF2LjQ3WiIvPjwvc3ZnPg==");
      background-size: cover;
    }
  }
</style>
