var url="http://localhost:5000/todo/api/v1.0/trans"
function sendtrans()
    {   
            var data = {};
            data.transactions= [];
            

            var json = JSON.stringify(data);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            xhr.onload = function () {
                var users = JSON.parse(xhr.responseText);
                var rec=JSON.parse(xhr.responseText);
                s=rec['task']['transactions']
                for(i=2;i>=0;i--)
                {
                    document.getElementById("t"+String(i+1)+"1").innerHTML = String(s[i][0]);
                    document.getElementById("t"+String(i+1)+"2").innerHTML = String(s[i][1]);
                    document.getElementById("t"+String(i+1)+"3").innerHTML = String(s[i][2]);
                    document.getElementById("t"+String(i+1)+"4").innerHTML = String(s[i][3]);
                    document.getElementById("t"+String(i+1)+"5").innerHTML = String(s[i][4]);
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