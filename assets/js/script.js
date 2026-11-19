const usersList = document.querySelector('#usersList');
const nameUser = document.querySelector('#nameUser');
const myForm = document.querySelector('form');
const userName = document.querySelector('#userName');
const userEmail = document.querySelector('#userEmail');

class newUser {
	constructor(_name, _username, _email) {
		this.name = _name;
		this.username = _username;
		this.email = _email;
	}
}

const myUsers = [];

const loadUsers = async () => {
	try {
		const response = await fetch(
			'https://jsonplaceholder.typicode.com/users',
		);
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		const myData = await response.json();
		for (const data of myData) {
			myUsers.push(data);
		}
        console.log(myData);
		printUsers();
	} catch (err) {
		console.error(err);
	}
};

function sum(num1, num2) {
	console.log(num1 + num2);
}

const printUsers = () => {
    usersList.textContent = '';
	myUsers.forEach((user) => {
		const newLi = document.createElement('li');
		newLi.textContent = `${user.name} - Username: ${user.username} Email: ${user.email}`;
		usersList.appendChild(newLi);
	});
};

myForm.addEventListener('submit', (e) => {
    e.preventDefault();
	const addedUser = new newUser(
		nameUser.value,
		userName.value,
		userEmail.value,
	);
    console.log(addedUser);
	myUsers.push(addedUser);
    console.log(myUsers);
	printUsers();
});

loadUsers();
sum(3, 4);
