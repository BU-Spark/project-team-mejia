import React from 'react';
import cookie from 'js-cookie';
import classNames from 'classnames';

import i18n from '../../i18n/config';


// array containing information about the languages that we support
const languages = [
		{
			code: 'en',
			name: 'English',
			country_code: 'us',
		},
		{
			code: 'es',
			name: 'Español',
			country_code: 'es',
		},
];

const GlobeIcon = ({width=24, height = 24}) => (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="currentColor" className="bi bi-globe2"
			 viewBox="0 0 16 16">
			<path
				d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5H4.51zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008h2.49zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z"/>
		</svg>
	);

export default function LanguageMenu() {
    // expand is a state of the dropdown menu. When expand is true, we show the dropdown menu,
    // when expand is false, we don't show the dropdown menu
    const [expand, setExpand] = React.useState(false);
    const currentLanguageCode = cookie.get('i18next') || 'en';
    // console.log(currentLanguageCode);

    return (
        <div className="container">
            <div className="language-select">
                <div className="d-flex justify-content-start align-items-center language-select-root">
                    <div className="dropdown">
                        <button
                            className="btn btn-link dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-toggle="dropdown"
                            onClick={() => setExpand(!expand)}
                            aria-haspopup="true"
                            aria-expanded={expand}
                        >
                            <GlobeIcon />
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            {languages.map(({code, name, country_code}) => (
                                <li key={country_code}>
                                    <button
                                        className={classNames('dropdown-item', {
                                            disabled: false,
                                        })}
                                        onClick={() => {
                                            i18n.changeLanguage(code);
                                        }}
                                    >
                                        <span
                                            className={`flag-icon flag-icon-${country_code} mx-2`}
                                            style={{
                                                opacity: 1,
                                            }}
                                        > </span>
                                        {name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}