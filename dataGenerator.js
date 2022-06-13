users = []

function errorMsg(msg) {
    console.error('Error: ' + msg);
    alert('Error: ' + msg);
}

// generate random user data from given seed
// generated fields should be: username, email, address, phoneNo, likesHaggis (boolean)
function generateData() {
    // get seed from form
    var seed = document.getElementById('seed').value;
    if (seed === '' || seed === null) {
        errorMsg('Seed cannot be null!');
        return;
    }

    if (users.length > 0) {
        for (var i = 0; i < users.length; i++) {
            if (users[i][0] === seed) {
                errorMsg('User already exists!');
                return;
            }
        }
    }
    console.debug('Generating data from seed: ', seed);

    // generate random data from seed
    username = seed;
    email = seed + '@example.com';
    address = (Math.floor(Math.random() * (999 - 1 + 1)) + 1).toString() + ' Example St.';
    phoneNo = '07' + Math.random().toString().slice(2, 5) + Math.random().toString().slice(2, 5) + Math.random().toString().slice(2, 5);
    likesHaggis = Math.random() > 0.5;

    // array of generated data
    data = [username, email, address, phoneNo, likesHaggis];
    users.push(data);
    console.debug('Generated data: ', data);

    // check if table already exists
    var table = document.getElementById('dataTable');
    if (table === null) {
        console.debug('Table does not exist, creating new table');

        // create HTML table
        var table = document.createElement('table');
        table.setAttribute('id', 'dataTable');
        
        // create table head
        var tableHead = document.createElement('thead');
        // create top table row (columns)
        var topTableRow = document.createElement('tr');
        topTableRow.setAttribute('id', 'tableHeader');
        columns = ['Username', 'Email', 'Address', 'Phone No', 'Likes Haggis'];
        for (var i = 0; i < columns.length; i++) {
            var th = document.createElement('th');
            th.innerHTML = columns[i];
            topTableRow.appendChild(th);
        }
        tableHead.appendChild(topTableRow);
        table.appendChild(tableHead);

        // create table body
        var tableBody = document.createElement('tbody');
        tableBody.setAttribute('id', 'tableBody');

        // add table to HTML
        table.appendChild(tableBody);
        document.getElementById('data').appendChild(table);
    }

    // add data to HTML table
    console.debug('Adding data to table');
    var tbody = document.getElementById('tableBody');
    var row = tbody.insertRow(tbody.rows.length);
    for (var i = 0; i < data.length; i++) {
        var cell = row.insertCell(i);
        cell.innerHTML = data[i];
    }
}

function generateCSV() {
    console.debug('Generating CSV file...');

    // genereate a CSV file from the users 2d array
    var csv = '';
    for (var i = 0; i < users.length; i++) {
        for (var j = 0; j < users[i].length; j++) {
            csv += users[i][j] + ',';
        }
        csv += '\n';
    }
    
    // prompt to download csv
    console.debug('Downloading CSV file...');
    var blob = new Blob([csv], {type: 'text/csv'});
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
}
