const userContainer = document.getElementById("userContainer");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const search = document.getElementById("search");

let allUsers = [];

async function getUsers() {

    try {

        loading.style.display = "block";

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if(!response.ok){
            throw new Error("Failed to fetch data");
        }

        const users = await response.json();

        allUsers = users;

        displayUsers(users);

    }

    catch(err){
        error.textContent = err.message;
    }

    finally{
        loading.style.display = "none";
    }
}

function displayUsers(users){

    userContainer.innerHTML = "";

    users.forEach(user => {

        userContainer.innerHTML += `
            <div class="card">
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
                <p>Phone: ${user.phone}</p>
                <p>Company: ${user.company.name}</p>
            </div>
        `;
    });

}

search.addEventListener("input", () => {

    const keyword = search.value.toLowerCase();

    const filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(keyword)
    );

    displayUsers(filteredUsers);

});

getUsers();