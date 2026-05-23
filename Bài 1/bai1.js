let students = JSON.parse(localStorage.getItem("students")) || [];

let editIndex = -1;

const openModalBtn = document.getElementById("openModalBtn");

const closeModalBtn = document.getElementById("closeModalBtn");

const studentModal = document.getElementById("studentModal");

const studentForm = document.getElementById("studentForm");

const studentTableBody =
    document.getElementById("studentTableBody");

const totalStudents =
    document.getElementById("totalStudents");

const avgScore =
    document.getElementById("avgScore");

function renderStudents(){

    studentTableBody.innerHTML = "";

    if(students.length === 0){

        studentTableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    Chưa có sinh viên nào
                </td>
            </tr>
        `;

        return;
    }

    students.forEach((student, index) => {

        studentTableBody.innerHTML += `
            <tr>

                <td>${student.id}</td>

                <td>${student.name}</td>

                <td>${formatDate(student.birth)}</td>

                <td>${student.className}</td>

                <td>${student.score}</td>

                <td>${student.email}</td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editStudent(${index})">

                        Sửa

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteStudent(${index})">

                        Xóa

                    </button>

                </td>

            </tr>
        `;
    });

}

function formatDate(dateString){

    const date = new Date(dateString);

    const day =
        String(date.getDate()).padStart(2, "0");

    const month =
        String(date.getMonth() + 1).padStart(2, "0");

    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

renderStudents();

openModalBtn.onclick = function(){

    studentModal.style.display = "flex";

}

closeModalBtn.onclick = function(){

    studentModal.style.display = "none";

}

studentForm.addEventListener("submit", function(e){

    e.preventDefault();

    const student = {

        id: document.getElementById("studentId").value,

        name: document.getElementById("fullName").value,

        birth: document.getElementById("birthDate").value,

        className:
            document.getElementById("className").value,

        score:
            document.getElementById("averageScore").value,

        email:
            document.getElementById("email").value
    };

    students.push(student);

    renderStudents();

    studentForm.reset();

    studentModal.style.display = "none";

});
