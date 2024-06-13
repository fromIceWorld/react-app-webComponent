import { BarChart } from './bar-chart';
import { createRoot } from 'react-dom/client';

function createComponent(props = {}, seletor) {
    const root = createRoot(seletor, { ...props });
    let bar = new BarChart({ name: 123 });
    root.render(bar.render());
}

export { createComponent as createApp };
