document.addEventListener('DOMContentLoaded', () => {
    const eventSource = new EventSource('https://remote-access.onrender.com/status');
    
    eventSource.onmessage = (event) => {
        if(JSON.parse(event.data).status == 2){
            document.forms.item(0).remove()
            eventSource.close();
        }else if(JSON.parse(event.data).status == 1){
            eventSource.close();
        }
    }

})