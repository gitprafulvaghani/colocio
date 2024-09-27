<script>
  export let value;
</script>

{#if value >= 0}
  <span
    class="bg-[#E4FDEA] text-[#02AB46] text-sm font-normal px-2 py-[2px] rounded-full flex items-center gap-1"
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.3335 10.0002L4.5085 11.1752L9.16683 6.52516V16.6668H10.8335V6.52516L15.4835 11.1835L16.6668 10.0002L10.0002 3.3335L3.3335 10.0002Z"
        fill="#02AB46"
      />
    </svg>
    {value.toFixed(2)}%
  </span>
{:else}
  <span
    class="bg-[#FFEEED] text-[#FF4040] text-sm font-normal px-2.5 py-[2px] rounded-full flex items-center gap-1"
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.6666 10.0002L15.4916 8.82516L10.8333 13.4752V3.3335H9.16658V13.4752L4.51659 8.81683L3.33325 10.0002L9.99992 16.6668L16.6666 10.0002Z"
        fill="#FF4040"
      />
    </svg>
    {value.toFixed(2)}%
  </span>
{/if}
