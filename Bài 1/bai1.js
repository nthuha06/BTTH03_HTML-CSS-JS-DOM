const openModalBtn =
  document.getElementById("openModalBtn");

const closeModalBtn =
  document.getElementById("closeModalBtn");

const studentModal =
  document.getElementById("studentModal");

const studentForm =
  document.getElementById("studentForm");

const studentTableBody =
  document.getElementById("studentTableBody");

const message =
  document.getElementById("message");

const totalStudents =
  document.getElementById("totalStudents");

const averageScore =
  document.getElementById("averageScore");

const studentIdInput =
  document.getElementById("studentId");

const fullNameInput =
  document.getElementById("fullName");

const birthDateInput =
  document.getElementById("birthDate");

const classNameInput =
  document.getElementById("className");

const averageInput =
  document.getElementById("average");

const emailInput =
  document.getElementById("email");

const passwordInput =
  document.getElementById("password");

const confirmPasswordInput =
  document.getElementById("confirmPassword");

const studentIdError =
  document.getElementById("studentIdError");

const fullNameError =
  document.getElementById("fullNameError");

const birthDateError =
  document.getElementById("birthDateError");

const classNameError =
  document.getElementById("classNameError");

const averageError =
  document.getElementById("averageError");

const emailError =
  document.getElementById("emailError");

const passwordError =
  document.getElementById("passwordError");

const confirmPasswordError =
  document.getElementById("confirmPasswordError");

let students =
  JSON.parse(localStorage.getItem("students"))
  || [];

let editId = null;

openModalBtn.addEventListener("click", () => {

  studentModal.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {

  closeModal();
});

function closeModal(){

  studentModal.classList.add("hidden");

  studentForm.reset();

  clearErrors();

  editId = null;
}

function clearErrors(){

  studentIdError.textContent = "";
  fullNameError.textContent = "";
  birthDateError.textContent = "";
  classNameError.textContent = "";
  averageError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";
}

function saveStudents(){

  localStorage.setItem(
    "students",
    JSON.stringify(students)
  );
}

function showMessage(text){

  message.textContent = text;

  setTimeout(() => {

    message.textContent = "";

  }, 2000);
}

function updateStatistics(){

  totalStudents.textContent =
    students.length;

  if(students.length === 0){

    averageScore.textContent = 0;

    return;
  }

  const total =
    students.reduce((sum, student) => {

      return sum + Number(student.average);

    }, 0);

  averageScore.textContent =
    (total / students.length).toFixed(2);
}

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

    updateStatistics();

    return;
  }

  students.forEach(student => {

    const row =
      document.createElement("tr");

    row.innerHTML = `
      <td>${student.studentId}</td>
      <td>${student.fullName}</td>
      <td>${student.birthDate}</td>
      <td>${student.className}</td>
      <td>${student.average}</td>
      <td>${student.email}</td>

      <td>

        <div class="actions">

          <button
            class="edit-btn"
            onclick="editStudent(${student.id})"
          >
            Sửa
          </button>

          <button
            class="delete-btn"
            onclick="deleteStudent(${student.id})"
          >
            Xóa
          </button>

        </div>

      </td>
    `;

    studentTableBody.appendChild(row);

  });

  updateStatistics();
}

function validateForm(){

  clearErrors();

  let isValid = true;

  const studentIdPattern =
    /^SV\d{3,}$/;

  if(studentIdInput.value.trim() === ""){

    studentIdError.textContent =
      "Vui lòng nhập mã sinh viên";

    isValid = false;

  }else if(
    !studentIdPattern.test(
      studentIdInput.value
    )
  ){

    studentIdError.textContent =
      "Mã SV phải dạng SV001";

    isValid = false;
  }

  if(fullNameInput.value.trim() === ""){

    fullNameError.textContent =
      "Vui lòng nhập họ tên";

    isValid = false;

  }else if(
    fullNameInput.value.trim().length < 5
  ){

    fullNameError.textContent =
      "Họ tên tối thiểu 5 ký tự";

    isValid = false;
  }

  if(birthDateInput.value === ""){

    birthDateError.textContent =
      "Vui lòng chọn ngày sinh";

    isValid = false;
  }

  if(classNameInput.value.trim() === ""){

    classNameError.textContent =
      "Vui lòng nhập lớp";

    isValid = false;
  }

  if(averageInput.value === ""){

    averageError.textContent =
      "Vui lòng nhập điểm";

    isValid = false;

  }else if(
    averageInput.value < 0 ||
    averageInput.value > 10
  ){

    averageError.textContent =
      "Điểm từ 0 đến 10";

    isValid = false;
  }

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(emailInput.value.trim() === ""){

    emailError.textContent =
      "Vui lòng nhập email";

    isValid = false;

  }else if(
    !emailPattern.test(
      emailInput.value
    )
  ){

    emailError.textContent =
      "Email không hợp lệ";

    isValid = false;
  }

  if(passwordInput.value.trim() === ""){

    passwordError.textContent =
      "Vui lòng nhập mật khẩu";

    isValid = false;

  }else if(
    passwordInput.value.length < 6
  ){

    passwordError.textContent =
      "Mật khẩu tối thiểu 6 ký tự";

    isValid = false;
  }

  if(confirmPasswordInput.value.trim() === ""){

    confirmPasswordError.textContent =
      "Vui lòng xác nhận mật khẩu";

    isValid = false;

  }else if(
    confirmPasswordInput.value !==
    passwordInput.value
  ){

    confirmPasswordError.textContent =
      "Mật khẩu không khớp";

    isValid = false;
  }

  return isValid;
}

studentForm.addEventListener("submit", (e) => {

  e.preventDefault();

  if(!validateForm()){
    return;
  }

  const studentData = {

    id: editId || Date.now(),

    studentId:
      studentIdInput.value,

    fullName:
      fullNameInput.value,

    birthDate:
      birthDateInput.value,

    className:
      classNameInput.value,

    average:
      averageInput.value,

    email:
      emailInput.value,

    password:
      passwordInput.value
  };

  if(editId){

    students = students.map(student =>

      student.id === editId
        ? {
            ...student,
            ...studentData
          }
        : student
    );

    showMessage(
      "Cập nhật thành công"
    );

  }else{

    students.push(studentData);

    showMessage(
      "Thêm sinh viên thành công"
    );
  }

  saveStudents();

  renderStudents();

  closeModal();
});

function editStudent(id){

  const student = students.find(
    student => student.id === id
  );

  studentIdInput.value =
    student.studentId;

  fullNameInput.value =
    student.fullName;

  birthDateInput.value =
    student.birthDate;

  classNameInput.value =
    student.className;

  averageInput.value =
    student.average;

  emailInput.value =
    student.email;

  passwordInput.value =
    student.password;

  confirmPasswordInput.value =
    student.password;

  editId = id;

  studentModal.classList.remove("hidden");
}

function deleteStudent(id){

  const confirmDelete = confirm(
    "Bạn có chắc muốn xóa?"
  );

  if(confirmDelete){

    students = students.filter(
      student => student.id !== id
    );

    saveStudents();

    renderStudents();

    showMessage(
      "Xóa thành công"
    );
  }
}

renderStudents();