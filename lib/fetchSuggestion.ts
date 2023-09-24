import formatTodosForAI from "./formatTodosForAI";



const fetchSuggestion = async (board: Board) => {
    try {
        const todos = formatTodosForAI(board);
        // console.log('Formatted TODOS to send >>', todos);

        const res = await fetch("/api/generateSummary", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ todos }),
        });

        if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`);
        }

        const GPTdata = await res.json();
        const { content } = GPTdata;

        return content;
    } catch (error) {
        console.error("Error fetching suggestion:", error);
        // Handle the error gracefully, e.g., show a user-friendly error message.
        throw error; // Optionally rethrow the error for higher-level error handling.
    }
};

export default fetchSuggestion;