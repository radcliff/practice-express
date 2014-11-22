var userListData = [];

// DOM ready
$(document).ready(function(){
	// populate user table on initial page load
	populateTable();
	$('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
	$('#btnAddUser').on('click', addUser);
});

function populateTable(){
	var tableContent = '';
	$.getJSON('/users/userlist', function(data){
		userListData = data;
		//for each item in JSON, add to table
		$.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '" title="Show Details">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
    });
    $('#userList table tbody').html(tableContent);
	});
}

function showUserInfo(event){
	event.preventDefault();
	var thisUserName = $(this).attr('rel');
	// map over user list, find username, then index in original list
	var arrayPosition = userListData.map(function(arrayItem){
		return arrayItem.username;
	}).indexOf(thisUserName);
	//get user object
	var thisUserObject = userListData[arrayPosition];

	$('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);
};

function addUser(event){
	event.preventDefault();
	var newUser = {
		'username': $('#addUser fieldset input#inputUserName').val(),
		'email': $('#addUser fieldset input#inputUserEmail').val(),
		'fullname': $('#addUser fieldset input#inputUserFullname').val(),
		'age': $('#addUser fieldset input#inputUserAge').val(),
		'location': $('#addUser fieldset input#inputUserLocation').val(),
		'gender': $('#addUser fieldset input#inputUserGender').val()
	}
	$.ajax({
		type: 'POST',
		data: newUser,
		url: '/users/adduser',
		dataType: 'JSON'
	}).done(function(response){
		if (response.msg === ''){
			$('#addUser fieldset input').val('');
			populateTable();
		}
		else {
			alert('Error: ' + response.msg);
		}
	});
};