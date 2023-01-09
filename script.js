var idx;
function add_note() {
    let title = document.getElementById("note-title");
    let description = document.getElementById("note-desc");
    if (title.value.trim().length === 0 || description.value.trim().length === 0) {
        Swal.fire(
            "Note can't be Empty!",
            '',
            'warning'
        )
        return;
    }
    $('#addnotemodal').modal('hide');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let object = {
        title: title.value.trim(),
        desc: description.value.trim()
    }
    notesObj.push(object);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    title.value = "";
    description.value = "";
    show_notes();
}

function show_notes() {
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="card text-bg-secondary" style="width: 15rem;">
        <div class="card-body text-center">
          <h4 class="card-title">${element.title}</h4>
          <hr>  
          <p class="card-text"> ${element.desc}</p>
          <div class="box">
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete</button>
          <button id="${index}" onclick="edit_note(this.id)" class="btn btn-primary">Edit</button>
          </div>
        </div>
      </div>
      `;
    });

    let container = document.getElementById("notes");
    if (notesObj.length != 0) {
        document.getElementById("no-notes").style.display = "none";
        document.getElementById("your-notes").style.display = "block";
        container.innerHTML = html;
    }
    else {
        container.innerHTML = '';
        document.getElementById("no-notes").style.display = "block";
        document.getElementById("your-notes").style.display = "none";
    }

}


function deleteNote(index) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            let notes = localStorage.getItem("notes");
            if (notes == null) {
                notesObj = [];
            }
            else {
                notesObj = JSON.parse(notes);
            }
            notesObj.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notesObj));
            show_notes()
            Swal.fire(
                'Your Note has been deleted!',
                '',
                'success'
            )
        }
    })
}

function edit_note(index) {
    $('#editnotemodal').modal('show');
    let notes = localStorage.getItem("notes");
    notesObj = JSON.parse(notes);
    document.getElementById("edit-title").value = notesObj[index].title;
    document.getElementById("edit-desc").value = notesObj[index].desc;
    idx = index;
}

function edit_handle() {
    let new_title = document.getElementById("edit-title");
    let new_desc = document.getElementById("edit-desc");
    if (new_title.value.trim().length === 0 || new_desc.value.trim().length === 0) {
        Swal.fire(
            "Note can't be Empty!",
            '',
            'warning'
        )
    } else {
        $('#editnotemodal').modal('hide');
        let notes = localStorage.getItem("notes");
        notesObj = JSON.parse(notes);
        notesObj[idx].title = new_title.value.trim();
        notesObj[idx].desc = new_desc.value.trim();
        document.getElementById("edit-title").value = '';
        document.getElementById("edit-desc").value = '';
        localStorage.setItem("notes", JSON.stringify(notesObj));
        show_notes()
    }
}