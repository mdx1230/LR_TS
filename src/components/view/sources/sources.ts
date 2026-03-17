import './sources.css';
import { Source } from './types';

class Sources {
    draw(data: Source[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) return;

        data.forEach((item: Source) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const nameEl = sourceClone.querySelector<HTMLElement>('.source__item-name');
            const itemEl = sourceClone.querySelector<HTMLElement>('.source__item');

            if (nameEl) nameEl.textContent = item.name;
            if (itemEl) itemEl.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const container = document.querySelector<HTMLElement>('.sources');
        container?.append(fragment);
    }
}

export default Sources;
