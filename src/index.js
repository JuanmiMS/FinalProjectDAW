import ReactDOM from 'react-dom';
import './pages/base/index.css';
import * as serviceWorker from './serviceWorker';
import routing from './routes'

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
