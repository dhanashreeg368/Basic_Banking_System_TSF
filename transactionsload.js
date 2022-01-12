var url="http://localhost:5000/todo/api/v1.0/load"
function sendload()
    {   
            var data = {};
            data.sender= ["123"];
            

            var json = JSON.stringify(data);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            xhr.onload = function () {
                var users = JSON.parse(xhr.responseText);
                var rec=JSON.parse(xhr.responseText);
                s=rec['task1']['sender']
                
                    document.getElementById("dhanashree@gmail.com").innerHTML = String(s[0]);
                    document.getElementById("anuja@gmail.com").innerHTML = String(s[1]);
                    document.getElementById("tanya@gmail.com").innerHTML = String(s[2]);
                    document.getElementById("katrina@gmail.com").innerHTML = String(s[3]);
                    document.getElementById("ana@gmail.com").innerHTML = String(s[4]);
                    document.getElementById("nikita@gmail.com").innerHTML = String(s[5]);
                    document.getElementById("tanmay@gmail.com").innerHTML = String(s[6]);
                    document.getElementById("harsh@gmail.com").innerHTML = String(s[7]);
                    document.getElementById("ankita@gmail.com").innerHTML = String(s[8]);
                    document.getElementById("arya@gmail.com").innerHTML = String(s[9]);

            
                
                //valp=rec['task']['validp'];
	        if (xhr.readyState == 4 && xhr.status == "201") {
		    console.table(users);
	        } else {
		    console.error(users);
	        }
            }
        xhr.send(json);
    }