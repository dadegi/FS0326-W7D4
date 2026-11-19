import newUser from '../import/classes.js';
import { loadUsers } from '../import/functions.js';

const usersList = document.querySelector('#usersList');
const nameUser = document.querySelector('#nameUser');
const myForm = document.querySelector('form');
const userName = document.querySelector('#userName');
const userEmail = document.querySelector('#userEmail');

const myUsers = await loadUsers();
console.log(myUsers);

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
	saveUser(addedUser);
});

const saveUser = async (user) => {
	try {
		const response = await fetch(
			'https://jsonplaceholder.typicode.com/users',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(user),
			},
		);
		if (!response.ok) throw new Error(`${response.status}`);
		const newObject = await response.json();
		myUsers.push(newObject);
		printUsers();
	} catch (err) {
		console.log(err);
	}
};

printUsers();
sum(3, 4);
