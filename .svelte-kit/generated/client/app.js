export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26'),
	() => import('./nodes/27'),
	() => import('./nodes/28'),
	() => import('./nodes/29'),
	() => import('./nodes/30'),
	() => import('./nodes/31'),
	() => import('./nodes/32'),
	() => import('./nodes/33')
];

export const server_loads = [2,4];

export const dictionary = {
		"/(connected)": [6,[2]],
		"/(connected)/account": [~7,[2]],
		"/auth/auth-code-error": [32],
		"/(connected)/automated": [8,[2]],
		"/(connected)/chat": [9,[2]],
		"/createpost": [33],
		"/(connected)/dashboard": [10,[2]],
		"/(connected)/insights": [11,[2]],
		"/(not-connected)/login": [~28,[5]],
		"/(not-connected)/logout": [29,[5]],
		"/(non-dashboard)/onboarding": [~27,[4]],
		"/(connected)/payment/payment": [~12,[2]],
		"/(connected)/payment/process": [13,[2]],
		"/(connected)/post": [14,[2]],
		"/(connected)/promotions": [16,[2]],
		"/(connected)/promo": [15,[2]],
		"/(not-connected)/reset-password": [30,[5]],
		"/(connected)/sandbox": [~17,[2]],
		"/(connected)/schedule": [18,[2]],
		"/(connected)/settings": [19,[2]],
		"/(connected)/settings/accounts": [~20,[2]],
		"/(connected)/settings/audience-profiles": [~21,[2]],
		"/(connected)/settings/billing": [22,[2]],
		"/(connected)/settings/business-info/custom": [23,[2,3]],
		"/(connected)/settings/business-info/from-account": [~24,[2,3]],
		"/(connected)/settings/users": [25,[2]],
		"/(connected)/sharepost": [26,[2]],
		"/(not-connected)/signup": [~31,[5]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';