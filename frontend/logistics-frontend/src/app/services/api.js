
const API_URL = "http://localhost:5000/api";

export const getItem = async () => {
    const res = await fetch(`$(API_URL)/items`)
    return await res.json();
}

export const apiRequest = async(endpoint, method = "GET", body, token) => {
    const res = await fetch(`${API}${endpoint}`, {
        method,
        header:{ 
            "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}`}),
        },
        body: body ? JSON.stringify(body) : null,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
};