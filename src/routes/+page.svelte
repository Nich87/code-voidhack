<svelte:head>
	<title>Hack Editor</title>
</svelte:head>

<script lang="ts">
	import { onMount } from 'svelte/internal';
	import CodeMirror from 'svelte-codemirror-editor';
	import { javascript } from '@codemirror/lang-javascript';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { ArcheTypes, ArchetypePageTab } from './lib/components/archtypes';
	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/g100.css';

	let Page: ArcheTypes = new ArcheTypes();
	let PageTabs: ArchetypePageTab[] = Page.getTabs();

	function addNewTab() {
		const newTab = new ArchetypePageTab(`Tab:${Page.getLastIndex() + 1}`, `NowIndex:${Page.getActiveIndex()}`, Page.getLastIndex() + 1);
		Page.addTab(newTab);
		Page.setActiveIndex(Page.getLastIndex()+1);
		PageTabs = PageTabs;
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.ctrlKey && event.code === 'KeyQ') {
			const activeIndex = Page.getActiveIndex();
			Page.removeTab(activeIndex);
			const newIndex = activeIndex > 0 ? activeIndex - 1 : 0;
			Page.setActiveIndex(newIndex);
			PageTabs = PageTabs;
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeyDown);
	});
</script>


<main>
	<Tabs autoWidth>
		{#each PageTabs as PageTab, index}
			<!-- Selectedではなくclass書き換えが必要？ -->
			<Tab label={PageTab.getName()} selected={index === Page.getActiveIndex()} on:click={() => console.log(`Clicked:${index}`)} />
		{/each}
		<svelte:fragment slot="content">
			{#each PageTabs as PageTab}
				<TabContent>
					<CodeMirror value={PageTab.getContent()} lang={javascript()} theme={oneDark} styles={{ '&': { height: '90vh' } }} />
				</TabContent>
			{/each}
		</svelte:fragment>
		<button on:click={addNewTab}>+</button>
	</Tabs>

	<!-- @Todo
		#Footerに実装するもの
		- 言語セレクタ
		- テーマ切り替えトグルスイッチ
		- フォーマットボタン
	 -->
</main>
