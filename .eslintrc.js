module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"node": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"react/jsx-uses-react": "error",
		"react/jsx-uses-vars": "error",
		"react/react-in-jsx-scope": "error"
	},
	"settings": {
		"react": {
			"createClass": "createReactClass",
			"pragma": "React",
			"version": "detect",
			"flowVersion": "0.53"
		},
		"propWrapperFunctions": [
			"forbidExtraProps",
			{ "property": "freeze", "object": "Object" },
			{ "property": "myFavoriteWrapper" }
		],
		"linkComponents": [
			"Hyperlink",
			{ "name": "Link", "linkAttribute": "to" }
		]
	}
};