export const msalConfig = {
	auth: {
		redirectUri: "/",
		clientId: "e9c17bad-826c-4d45-a4fe-1c1c7ccce9e5",
		authority:
			"https://login.microsoftonline.com/638fcbaf-ba4c-43e1-adae-5475c970fe10",
	},
	cache: {
		cacheLocation: "memoryStorage", // This configures where your cache will be stored
		storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
		secureCoookies: true,
	},
};

export const enMsalConfig = {
	auth: {
		clientId: "6610531d-6422-48bc-b6fe-f3a1de6884b1",
		authority:
			"https://login.microsoftonline.com/1bd10004-1aeb-4e11-93cb-33661bb1e860", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
		redirectUri: "/",
		postLogoutRedirectUri: "/",
	},
	cache: {
		cacheLocation: "memoryStorage", // This configures where your cache will be stored
		storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
		secureCookies: true,
	},
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
	scopes: ["user.read"],
};
// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
	graphMeEndpoint: "https://graph.microsoft.com",
};
