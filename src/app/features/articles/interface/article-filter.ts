export interface ArticleFilter {
    id: string|null;
    createdDateFrom: Date|null;
    createdDateTo:Date|null;
    lastUpdatedDateFrom: Date|null;
    lastUpdatedDateTo: Date|null;
    createdbyId: string|null;
    createdbyName: string|null;
    lastUpdatedbyId: string|null;
    lastUpdatedbyName: string|null;
    name: string|null;
    title: string|null;
    publishDate: Date|null;
    status: number|null;
    viewsCount: number|null;
    description: string|null;
    content: string|null;
    tags: [
      string|null
    ]
}
