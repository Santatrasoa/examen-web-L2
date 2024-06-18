document.addEventListener("DOMContentLoaded", ()=>{
    const menu = document.querySelector(".menu");

    menu.addEventListener('click', ()=>{
        if (document.querySelector(".nav-bar").style.right == "0%")
            document.querySelector(".nav-bar").style.right = "-100%";
        else {
            document.querySelector(".nav-bar").style.right = "0%";
        }
    });

    async function getContentFile(){
        const response = await fetch("../json/file.json");
        const data = await response.json();
        return data;
    }

    getContentFile().then((data)=>{
        const existingData = localStorage.getItem("key");
        if (!existingData) {
            localStorage.setItem("key", JSON.stringify(data));
        }
    });

    document.getElementById('myForm').addEventListener('submit', (event)=> {
        event.preventDefault();

        const formData = {
            id : document.getElementById('title').value,
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            editeur: document.getElementById('editor').value,
            isbn: document.getElementById('isbn').value,
            date: document.getElementById('date').value,
            genre: document.getElementById('genre').value,
            resume: document.getElementById('resume').value,
            language: document.getElementById('language').value,
            pageNumber: document.getElementById('pagenumber').value,
            availability: document.querySelector('input[name="availability"]:checked').value,
            condition: document.querySelector('input[name="condition"]:checked').value,
            location: document.getElementById('location').value
        };
        let flags = confirm("Vous êtes sure de continuer");

        if (flags) {
            const existingData = localStorage.getItem("key");
            if (!existingData) {
                localStorage.setItem("key", JSON.stringify([formData]));
            } else {
                const data = JSON.parse((localStorage.getItem("key")));
                data.push(formData);
                localStorage.setItem("key", JSON.stringify(data));
            }
            alert("Merci pour votre collaboration");
        }
        addList();
    });

    const tbody = document.querySelector(".tbody");

    function addList() {
        tbody.innerHTML = "";
        JSON.parse(localStorage.getItem("key")).forEach(element => {
            const tr = document.createElement("tr");
            const td_1 = document.createElement("td");
            const td_2 = document.createElement("td");
            const td_3 = document.createElement("td");
            const td_4 = document.createElement("td");
            const button = document.createElement("button");
            const delete_div = document.createElement("button");

            td_1.innerHTML = element.title;
            td_2.innerHTML = element.author;
            td_3.innerHTML = element.editeur;
            button.innerHTML = "Detail";
            button.setAttribute("class", "btn-primary");
            delete_div.innerHTML = "Supprimer";
            delete_div.setAttribute("class", "btn-danger"),
            td_4.appendChild(button);
            td_4.appendChild(delete_div);

            tr.appendChild(td_1);
            tr.appendChild(td_2);
            tr.appendChild(td_3);
            tr.appendChild(td_4);
            tbody.appendChild(tr);

            delete_div.addEventListener('click', ()=>{
                console.log("mety");
                localStorage.setItem("key", JSON.stringify(JSON.parse(localStorage.getItem("key")).filter(l=> l.id != element.id )));
                tr.style.transition = "0.5s";
                tr.style.transform = "translateX(100%)";
                setTimeout(()=>{
                    tr.remove();
                }, 500);
            });

            const modal = document.querySelector(".modal");
            button.addEventListener('click', ()=>{
                modal.style.display = "flex";
                modal.querySelector(".modal-title").innerHTML = element.title;
                modal.querySelector(".modal-author").innerHTML = `<div class='flex'><span class='title-more'>Auteur</span> : <div class='ct-more'>${element.author}</div></div>`;
                modal.querySelector(".modal-editeur").innerHTML = `<div class='flex'><span class='title-more'>Editeur</span> : <div class='ct-more'>${element.editeur}</div></div>`;
                modal.querySelector(".modal-isbn").innerHTML = `<div class='flex'><span class='title-more'>Isbn</span> : <div class='ct-more'>${element.isbn}</div></div>`;
                modal.querySelector(".modal-date").innerHTML = `<div class='flex'><span class='title-more'>Date </span> : <div class='ct-more'>${element.date}</div></div>`;
                modal.querySelector(".modal-genre").innerHTML = `<div class='flex'><span class='title-more'>Genre</span> : <div class='ct-more'>${element.genre}</div></div>`;
                modal.querySelector(".modal-resume").innerHTML = `<div class='flex'><span class='title-more'>Resumé</span> : <div class='ct-more'>${element.resume}</div></div>`;
                modal.querySelector(".modal-language").innerHTML = `<div class='flex'><span class='title-more'>Langue</span> : <div class='ct-more'>${element.language}</div></div>`;
                modal.querySelector(".modal-pagenumber").innerHTML = `<div class='flex'><span class='title-more'>Nombre de page</span> : <div class='ct-more'>${element.pageNumber}</div></div>`;
                modal.querySelector(".modal-availability").innerHTML = `<div class='flex'><span class='title-more'>Disponibilités</span> : <div class='ct-more'>${element.availability}</div></div>`;
                modal.querySelector(".modal-condition").innerHTML = `<div class='flex'><span class='title-more'>État</span> : <div class='ct-more'>${element.condition}</div></div>`;
            });

            document.querySelector(".cls").addEventListener('click', ()=>{
                modal.style.display = "none";
            }); 
        });
    }


    function searchInput(tb, value) {
        tbody.innerHTML = "";
        value.forEach(element => {
            const tr = document.createElement("tr");
            const td_1 = document.createElement("td");
            const td_2 = document.createElement("td");
            const td_3 = document.createElement("td");
            const td_4 = document.createElement("td");
            const button = document.createElement("button");
            const delete_div = document.createElement("button");

            td_1.innerHTML = element.title;
            td_2.innerHTML = element.author;
            td_3.innerHTML = element.editeur;
            button.innerHTML = "Detail";
            button.setAttribute("class", "btn-primary");
            delete_div.innerHTML = "Supprimer";
            delete_div.setAttribute("class", "btn-danger"),
            td_4.appendChild(button);
            td_4.appendChild(delete_div);

            tr.appendChild(td_1);
            tr.appendChild(td_2);
            tr.appendChild(td_3);
            tr.appendChild(td_4);
            tb.appendChild(tr);

            delete_div.addEventListener('click', ()=>{
                localStorage.setItem("key", JSON.stringify(JSON.parse(localStorage.getItem("key")).filter(l=> l.id != element.id )));
                tr.style.transition = "0.5s";
                tr.style.transform = "translateX(100%)";
                setTimeout(()=>{
                    tr.remove();
                }, 500);
            });

            const modal = document.querySelector(".modal");
            button.addEventListener('click', ()=>{
                modal.style.display = "flex";
                modal.querySelector(".modal-title").innerHTML = element.title;
                modal.querySelector(".modal-author").innerHTML = `<div class='flex'><span class='title-more'>Auteur</span> : <div class='ct-more'>${element.author}</div></div>`;
                modal.querySelector(".modal-editeur").innerHTML = `<div class='flex'><span class='title-more'>Editeur</span> : <div class='ct-more'>${element.editeur}</div></div>`;
                modal.querySelector(".modal-isbn").innerHTML = `<div class='flex'><span class='title-more'>Isbn</span> : <div class='ct-more'>${element.isbn}</div></div>`;
                modal.querySelector(".modal-date").innerHTML = `<div class='flex'><span class='title-more'>Date </span> : <div class='ct-more'>${element.date}</div></div>`;
                modal.querySelector(".modal-genre").innerHTML = `<div class='flex'><span class='title-more'>Genre</span> : <div class='ct-more'>${element.genre}</div></div>`;
                modal.querySelector(".modal-resume").innerHTML = `<div class='flex'><span class='title-more'>Resumé</span> : <div class='ct-more'>${element.resume}</div></div>`;
                modal.querySelector(".modal-language").innerHTML = `<div class='flex'><span class='title-more'>Langue</span> : <div class='ct-more'>${element.language}</div></div>`;
                modal.querySelector(".modal-pagenumber").innerHTML = `<div class='flex'><span class='title-more'>Nombre de page</span> : <div class='ct-more'>${element.pageNumber}</div></div>`;
                modal.querySelector(".modal-availability").innerHTML = `<div class='flex'><span class='title-more'>Disponibilités</span> : <div class='ct-more'>${element.availability}</div></div>`;
                modal.querySelector(".modal-condition").innerHTML = `<div class='flex'><span class='title-more'>État</span> : <div class='ct-more'>${element.condition}</div></div>`;
            });

            document.querySelector(".cls").addEventListener('click', ()=>{
                modal.style.display = "none";
            }); 
        });
    }
    addList();

    function search(e) {
        const data = JSON.parse(localStorage.getItem("key"));
        const result = data.filter(l => l.title.toLowerCase().includes(e.toLowerCase()));
        return result;
    }

    document.querySelector("#sbmt").addEventListener('click', (e)=>{
        e.preventDefault();
        document.querySelector(".ct-input-search").style.display = "flex";
        const input = document.querySelector("#search_input").value;
        const result = search(input);
        const tbody = document.querySelector(".tbody-search");

        tbody.innerHTML = "";
        if (result.length == 0){
            tbody.innerHTML = `<tr><td colspan='4'>Aucun résultat</td></tr>`;
        }
        else
            searchInput(tbody, result);
    });
    document.querySelector(".cl").addEventListener('click', ()=>{
        console.log("mety");
        document.querySelector(".ct-input-search").style.display = "none";
    });

    document.getElementById('trier').addEventListener('change', function() {
        const sortBy = this.value;
        const tableBody = document.querySelector('.ct-table .tbody');
        const rows = Array.from(tableBody.querySelectorAll('tr'));
        console.log("mety");
        rows.sort((a, b) => {
            const cellA = a.querySelector(`td:nth-child(${getColumnIndex(sortBy)})`).textContent.trim();
            const cellB = b.querySelector(`td:nth-child(${getColumnIndex(sortBy)})`).textContent.trim();
            
            if (cellA < cellB) return -1;
            if (cellA > cellB) return 1;
            return 0;
        });
    
        rows.forEach(row => tableBody.appendChild(row));
    });
    
    function getColumnIndex(sortBy) {
        switch (sortBy) {
            case 'author':
                return 2;
            case 'title':
                return 1;
            case 'editor':
                return 3;
            case 'date':
                return 4;
            default:
                return 1;
        }
    }
})