export function getProductJSON() {
    return fetch("./data.json")
    .then (Response => {
        return Response.json();
})
    .then (data => {
        return data
})
    .catch (error => {
        console.log("Error :" ,error);
    });
}
