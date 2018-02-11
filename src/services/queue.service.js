export function addToQueue(movie){
    var queue = getQueue();
    queue.push(movie);
    localStorage.queue = JSON.stringify(queue);
        //localStorage.queue = "[" + JSON.stringify(movie) + "]";
    
}
export function getQueue(){
    if(localStorage && localStorage.queue){
        return JSON.parse(localStorage.queue);
    }
    return [];
}
export function removeFromQueue(index){
    if(localStorage && localStorage.queue){
        var newQueue = JSON.parse(localStorage.queue);
        newQueue.splice(index, 1);
        localStorage.queue = JSON.stringify(newQueue);
    }
}
export function setQueue(queue){
    if(localStorage && localStorage.queue){
        localStorage.queue = JSON.stringify(queue);
    }    
}
export default {addToQueue, getQueue, removeFromQueue, setQueue};


