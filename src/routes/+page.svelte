<script lang="ts">
	import { onMount } from 'svelte/internal';
	import CodeMirror from 'svelte-codemirror-editor';
	import { javascript } from '@codemirror/lang-javascript';
	import { html } from '@codemirror/lang-html';
	import { css } from '@codemirror/lang-css';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { ArcheTypes, ArchetypePageTab } from './lib/components/archtypes';
	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';
	import { Dropdown } from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/g100.css';

	let Page: ArcheTypes = new ArcheTypes();
	let PageTabs: ArchetypePageTab[] = Page.getTabs();
	PageTabs.push(new ArchetypePageTab('Code', '', 0));

	const langs = [javascript(), html(), css()];
	let selected: string = '0';

	function addNewTab() {
		const newTab = new ArchetypePageTab(
			`Tab:${Page.getLastIndex() + 1}`,
			`NowIndex:${Page.getActiveIndex()}`,
			Page.getLastIndex() + 1
		);
		Page.addTab(newTab);
		Page.setActiveIndex(Page.getLastIndex() + 1);
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

<svelte:head>
	<title>Hack Editor</title>
</svelte:head>

<Tabs autoWidth>
	{#each PageTabs as PageTab, index}
		<!-- Selectedではなくclass書き換えが必要？ -->
		<Tab
			label={PageTab.getName()}
			selected={index === Page.getActiveIndex()}
			on:click={() => console.log(`Clicked:${index}`)}
		/>
	{/each}
	<svelte:fragment slot="content">
		{#each PageTabs as PageTab}
			<TabContent>
				<CodeMirror
					value={PageTab.getContent()}
					lang={langs[Number(selected)]}
					theme={oneDark}
					styles={{ '&': { height: '80vh' } }}
				/>
			</TabContent>
		{/each}
	</svelte:fragment>
	<button on:click={addNewTab}>+</button>
</Tabs>

<footer style="margin-top:auto;">
	<Dropdown
		direction="top"
		titleText="Language"
		bind:selectedId={selected}
		items={[
			{ id: '0', text: 'JavaScript' },
			{ id: '1', text: 'HTML' },
			{ id: '2', text: 'CSS' }
		]}
	/>
</footer>

<!-- @Todo
		#Footerに実装するもの
		- 言語セレクタ
		- テーマ切り替えトグルスイッチ
		- フォーマットボタン
	 -->
