<script lang="ts">
	import { onMount } from 'svelte';
	import { ArcheTypes, ArchetypePageTab } from './lib/components/archtypes';
	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';
	import { Dropdown } from 'carbon-components-svelte';
	import CodeMirror from 'svelte-codemirror-editor';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { javascript } from '@codemirror/lang-javascript';
	import { html } from '@codemirror/lang-html';
	import { css } from '@codemirror/lang-css';
	import 'carbon-components-svelte/css/g100.css';

	const Page = new ArcheTypes();
	let pageTabs: ArchetypePageTab[] = Page.getTabs();
	pageTabs.push(new ArchetypePageTab('Code', '', 0));

	const langs = [javascript(), html(), css()];
	let selectedLanguageIndex = '0';
	let selectedTabIndex = 0;

	function addNewTab() {
		const newIndex = Page.getLastIndex() + 1;
		const newTab = new ArchetypePageTab(
			`Tab:${newIndex}`,
			`NowIndex:${Page.getActiveIndex()}`,
			newIndex
		);
		Page.addTab(newTab);
		Page.setActiveIndex(newIndex);
		selectedTabIndex = Page.getActiveIndex();
		pageTabs = Page.getTabs();
	}

	function handleValueChange(index: number, event: any) {
		pageTabs[index].setContent(event.detail);
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.ctrlKey && event.code === 'KeyQ') {
			const activeIndex = Page.getActiveIndex();
			Page.removeTab(activeIndex);
			const newIndex = activeIndex > 0 ? activeIndex - 1 : 0;
			Page.setActiveIndex(newIndex);
			selectedTabIndex = Page.getActiveIndex();
			pageTabs = Page.getTabs();
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeyDown);
	});
</script>

<svelte:head>
	<title>Hack Editor</title>
</svelte:head>

<Tabs autoWidth bind:selected={selectedTabIndex}>
	{#each pageTabs as pageTab, index}
		<Tab label={pageTab.getName()} on:click={() => Page.setActiveIndex(index)} />
	{/each}
	<svelte:fragment slot="content">
		{#each pageTabs as pageTab, index}
			<TabContent>
				<CodeMirror
					on:change={(e) => handleValueChange(index, e)}
					value={pageTab.getContent()}
					lang={langs[Number(selectedLanguageIndex)]}
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
		bind:selectedId={selectedLanguageIndex}
		items={[
			{ id: '0', text: 'JavaScript' },
			{ id: '1', text: 'HTML' },
			{ id: '2', text: 'CSS' }
		]}
	/>
</footer>

<!-- @Todo
		#Footerに実装するもの
		- テーマ切り替えトグルスイッチ
		- フォーマットボタン
	 -->
