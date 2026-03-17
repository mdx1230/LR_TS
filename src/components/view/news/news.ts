import './news.css';

class News {
    draw(data:NewsItem[]:void) {
        const news:NewsItem[] = data.length >= 10 ? data.slice(0,10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) return;

        news.forEach((item: NewsItem, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            const itemEl = newsClone.querySelector<HTMLElement>('.news__item');
            if (idx % 2 && itemEl) itemEl.classList.add('alt');

            const photo = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (photo) {
                photo.style.backgroundImage = url(${item.urlToImage || 'img/news_placeholder.jpg'});
            }

            const author = newsClone.querySelector<HTMLElement>('.news__meta-author');
            if (author) {
                author.textContent = item.author || item.source.name;
            }

            const date = newsClone.querySelector<HTMLElement>('.news__meta-date');
            if (date) {
                date.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
            }

            const title = newsClone.querySelector<HTMLElement>('.news__description-title');
            if (title) title.textContent = item.title;

            const source = newsClone.querySelector<HTMLElement>('.news__description-source');
            if (source) source.textContent = item.source.name;

            const content = newsClone.querySelector<HTMLElement>('.news__description-content');
            if (content) content.textContent = item.description;

            const link = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');
            if (link) link.href = item.url;

            fragment.append(newsClone);
        });

        const container = document.querySelector<HTMLElement>('.news');
        if (container) {
            container.innerHTML = '';
            container.appendChild(fragment);
        }
    }
}

export default News;
