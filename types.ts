export interface Source {
    id: string;
    name: string;
}

export interface NewsSource {
    id?: string | null;
    name: string;
}

export interface NewsItem {
    source: NewsSource;
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content?: string;
}
