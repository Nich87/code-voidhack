export class ArcheTypes {
  private Tabs: ArchetypePageTab[];
  private activeIndex: number;

  constructor() {
    this.Tabs = [];
    this.activeIndex = 0;
  }

  public addTab(page: ArchetypePageTab) {
    this.Tabs.push(page);
  }

  public removeTab(index: number) {
    this.Tabs.splice(index, 1);
    if (index <= this.activeIndex) {
      this.activeIndex--;
    }
  }

  public getTabs(): ArchetypePageTab[] {
    return this.Tabs;
  }

  public setActiveIndex(index: number) {
    this.activeIndex = index;
  }

  public getActiveIndex(): number {
    return this.activeIndex;
  }

  public getActiveTab(): ArchetypePageTab {
    return this.Tabs[this.activeIndex];
  }

  public getLastIndex(): number {
    return this.Tabs.length - 1;
  }
}

export class ArchetypePageTab {
  private name: string;
  private content: string;
  private id : number;

  constructor(name: string, content: string, id: number) {
    this.name = name;
    this.content = content;
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getContent(): string {
    return this.content;
  }

  public setContent(content: string) {
    this.content = content;
  }

    public setId(id: number) {
    this.id = id;
  }

      public getId(): number {
    return this.id;
  }

}