var url="http://localhost:5000/todo/api/v1.0/bank"

function send()
    {   
            var data = {};
            data.sender= document.getElementById("enterSName").value + "@gmail.com";
            data.receiver = document.getElementById("enterName").value + "@gmail.com";
            data.amt=document.getElementById("enterAmount").value;

            var json = JSON.stringify(data);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            xhr.onload = function () {
                var users = JSON.parse(xhr.responseText);
                var rec=JSON.parse(xhr.responseText);
                
                s=rec['task']['sender']
                r=rec['task']['receiver']
                val=rec['task']['amt'];
                
                if (val==0)
                {
                    alert("Wrong username");
                }
                else
                {
                    document.getElementById(s).innerHTML = String(val[1]);
                    document.getElementById(r).innerHTML = String(val[2]);
                    alert("Transaction between " + String(s) + " and " + String(r)+ "of Rs. " + String(val[0])+ " has been done successfully");
                }
                
                //valp=rec['task']['validp'];
	        if (xhr.readyState == 4 && xhr.status == "201") {
		    console.table(users);
	        } else {
		    console.error(users);
	        }
            }
        xhr.send(json);
    }

