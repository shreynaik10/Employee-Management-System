
const fetchFromGraphQL = (query) =>{
    fetch("http://localhost:3001/graphql",{
        method:"POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query })
    }).then(async(response)=>{
        let apiResponse = await response.json()
        return apiResponse;
    })
}

export default fetchFromGraphQL;
