export async function fetchDataFromApiCall(autocomplete: any, searchTerm: any) {
    const result = await fetch(
        `https://geo.api.vlaanderen.be/geolocation/suggestion?q=${searchTerm}&c=${autocomplete.maxSuggestions}`
    );
    const responseBody = await result.json();
    autocomplete.matches = responseBody.SuggestionResult.map((obj: string) => ({
        title: obj,
        value: obj,
    }));
}
