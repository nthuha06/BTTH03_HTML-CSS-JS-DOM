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