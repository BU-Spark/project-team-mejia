import React, {Suspense} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'flag-icon-css/css/flag-icons.min.css';

import Map from './components/Map';
import './i18n/config'



const loadingMarkup = (
	<div className="py-4">
		<h2>Loading...</h2>
	</div>
)

function App() {
	return(
		<Suspense fallback={loadingMarkup}>
			<div>
				<Map />
			</div>
		</Suspense>
	);
}

export default App;
