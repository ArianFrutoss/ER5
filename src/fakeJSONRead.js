export default function logJSON(){
    fetch('../cards.json')
        .then((response) => response.json())
        .then(function(json){
            
            console.log(json);
        });
}
