
  document.getElementById("submit").addEventListener('click', async () => {
    const inputValue = Number(document.getElementById("arabic-numeral").value);
    if (inputValue) {
        if (inputValue >= 1 && inputValue <= 100) {
            if (!!window.EventSource) {

                //Listening SSE
                const source = new EventSource(`/api/conversion/${inputValue}`)
                source.onopen = () => {
                    document.getElementById("connexionState").style.color = "GREEN";
                    document.getElementById("connexionState").value = `Client is plugged to the SSE`;
                };

                source.onerror = event => {
                    if (eventSource.readyState === EventSource.CLOSED) {
                        alert("Connexion closed like, forever :(");
                    }
                    if (eventSource.readyState === EventSource.CONNECTING) {
                        alert("Connexion lost");
                            /* Tentative re connexion */
                            eventSource.close();
                            connect();
                    }
                };

                source.addEventListener('result', function(e) {
                  document.getElementById("result").style.color = "BLACK";
                    document.getElementById("result").value = `${JSON.parse(e.data)}`;
                    source.close()
                }, false)

                source.addEventListener('error', function(e) {
                    document.getElementById("submit").disabled = false
                    alert("Erreur lors de la connexion avec le serveur")
                }, false)
 
            }


        } else {
            //The arabic-numeral variable is out of range (1 to 100)
            alert("Error : Invalid number");
            document.getElementById("result").style.color = "RED";
            document.getElementById("result").value = `Enter a Arabic numeral from 1 to 100 and ${inputValue} is not in this range`;
        }
    }
    else{
        //The arabic-numeral variable is undefined
        alert("Error : Enter a number");
        document.getElementById("result").style.color = "RED";
        document.getElementById("result").value = `Enter an Arabic numeral from 1 to 100`;
    }
});

document.getElementById("logout").addEventListener('click', async () => {
    if (!!window.EventSource) {
        let buttons = document.getElementsByTagName('button');
        const sourceDeux = new EventSource(`/api/conversion/${document.getElementById("logout").value}`);
        
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
            buttons[i].style.backgroundColor = "GREY";
        }
        
        document.getElementById("connexionState").style.color = "RED";
        document.getElementById("connexionState").value = `Client is unplugged from the SSE`;
    }
});
