<script>
    import { page } from "$app/stores";
    import SectionTitle from "$lib/components/SectionTitle.svelte";
</script>

<SectionTitle><p slot="title">Business information</p></SectionTitle>
<div class="text-sm font-medium text-center0">
    <ul class="flex flex-wrap -mb-px">
        <li class="me-2">
            <a href="from-account" class="inline-block p-4 rounded-t-lg {$page.url.pathname.includes('from-account') ? 'active' : ''}">From account</a>
        </li>
        <li class="me-2">
            <a href="custom" class="inline-block p-4 text-blue-600 rounded-t-lg {$page.url.pathname.includes('custom') ? 'active' : ''}">Custom</a>
        </li>
    </ul>
</div>
<div>
    <slot />
</div>