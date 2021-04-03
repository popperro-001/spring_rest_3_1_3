const uri = "api/users";
let users = [];

function getUserItem() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error("Unable to get books.", error));
}

function displayDeleteForm(id) {
    const item = users.find(item => item.id === id);
    document.getElementById("delete-id").value = item.id;
    document.getElementById("delete-username").value = item.username;
    document.getElementById("delete-password").value = item.password;
    document.getElementById("delete-email").value = item.email;
}

function displayEditForm(id) {
    const item = users.find(item => item.id === id);
    document.getElementById("edit-id").value = item.id;
    document.getElementById("edit-username").value = item.username;
    document.getElementById("edit-password").value = item.password;
    document.getElementById("edit-email").value = item.email;
}


function _displayItems(data) {
    const tBody = document.getElementById("users");
    tBody.innerHTML = "";

    const button = document.createElement("button");

    data.forEach(item => {
        let editButton = document.createElement("a");
        editButton.href = "#editUserModal";
        editButton.className = "edit";
        editButton.setAttribute("onclick", `displayEditForm(${item.id})`);
        editButton.setAttribute("data-toggle", "modal");
        editButton.innerHTML =
            "<i class='btn btn-primary' data-toggle='tooltip' title='Edit'>Edit</i>";

        let deleteButton = document.createElement("a");
        deleteButton.href = "#deleteUserModal";
        deleteButton.className = "delete";
        deleteButton.setAttribute("onclick", `displayDeleteForm(${item.id})`);
        deleteButton.setAttribute("data-toggle", "modal");
        deleteButton.innerHTML =
            "<i class='btn btn-danger' data-toggle='tooltip' title='Delete'>Delete</i>";

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textTitle = document.createTextNode(item.id);
        td1.appendChild(textTitle);

        let td2 = tr.insertCell(1);
        let textAuthor = document.createTextNode(item.username);
        td2.appendChild(textAuthor);

        let td3 = tr.insertCell(2);
        let textPublisher = document.createTextNode(item.email);
        td3.appendChild(textPublisher);

        let td4 = tr.insertCell(3);
        let textRoleUser = document.createTextNode(item.roles[0].name);
        td4.appendChild(textRoleUser);

        let td6 = tr.insertCell(4);
        td6.appendChild(editButton);
        td6.appendChild(deleteButton);
    });

    users = data;
}
function addUserItem() {
    const usernameInputText = document.getElementById("add-username");
    const passwordInputText = document.getElementById("add-password");
    const emailInputText = document.getElementById("add-email");
    let roles = document.getElementById('add-role')


    function rolesSelect() {
        let option = roles;
        let optionArr = [];

        for (let i = 0; i < option.length; i++) {
            if (option.options[i].selected) {
                let elementHash = {};
                elementHash['id'] = option.options[i].value;
                elementHash['name'] = option.options[i].text;
                optionArr.push(elementHash);
            }
        }
        return optionArr;
    }

    roles.addEventListener('click', () => {
        rolesSelect();
    })


    const item = {
        username: usernameInputText.value.trim(),
        password: passwordInputText.value.trim(),
        email: emailInputText.value.trim(),
        roles: rolesSelect()
    };
    console.log(JSON.stringify(item));
    fetch(uri, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
        //.then(response => response.json())
        .then(() => {
            getUserItem()
            usernameInputText.value = "";
            passwordInputText.value = "";
            emailInputText.value = "";
            roles.value = "";
        })
        .catch(error => console.error("Unable to add User.", error))
}

function updateUserItem() {

    const itemId = document.getElementById("edit-id").value.trim();
    let roles = document.getElementById('edit-role');

    function rolesUpdated() {
        let option = roles;
        let optionArr = [];

        for (let i = 0; i < option.length; i++) {
            if (option.options[i].selected) {
                let elementHash = {};
                elementHash['id'] = option.options[i].value;
                elementHash['name'] = option.options[i].text;
                optionArr.push(elementHash);
            }
        }
        return optionArr;
    }

    roles.addEventListener('click', () => {
        rolesUpdated();
    })

    const item = {
        id: parseInt(itemId, 10),
        username: document.getElementById("edit-username").value.trim(),
        password: document.getElementById("edit-password").value.trim(),
        email: document.getElementById("edit-email").value.trim(),
        roles: rolesUpdated()
    };

    fetch(`${uri}/${itemId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
        .then(() => getUserItem())
        .catch(error => console.error("Unable to update item.", error));

    return false;
}

function deleteUserItem() {
    const itemId = document.getElementById("delete-id").value.trim();
    fetch(`${uri}/${itemId}`, {
        method: "DELETE"
    })
        .then(() => getUserItem())
        .catch(error => console.error("Unable to delete User.", error));
}