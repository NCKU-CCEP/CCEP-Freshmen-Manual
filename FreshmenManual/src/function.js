export{FetchJson}

function FetchJson(DataName)
{
    let Data = fetch(DataName + ".json")
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                return data
            })
    
    return Data;
}