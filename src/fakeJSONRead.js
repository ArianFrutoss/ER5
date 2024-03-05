export default function logJSON(){
    fetch('../cards.json')
        .then((response) => response.json())
        .then((json) => console.log(json));

}
