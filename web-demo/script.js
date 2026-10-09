
const keys = {
  students: "scerp_students",
  faculty: "scerp_faculty",
  courses: "scerp_courses",
  attendance: "scerp_attendance",
  exams: "scerp_exams"
};

const read = key => {
  try {
    return JSON.parse(localStorage.getItem(keys[key]) || "[]");
  } catch {
    return [];
  }
};

const save = (key, records) =>
  localStorage.setItem(keys[key], JSON.stringify(records));

let toastTimer;
function toast(message) {
  const box = document.getElementById("toast");
  box.textContent = message;
  box.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => box.classList.remove("show"), 2600);
}

function cell(value) {
  const td = document.createElement("td");
  td.textContent = value ?? "";
  return td;
}

function actionCell(key, record, render) {
  const td = document.createElement("td");
  const button = document.createElement("button");
  button.className = "delete";
  button.textContent = "Delete";
  button.addEventListener("click", () => {
    if (!confirm("Delete this record?")) return;
    save(key, read(key).filter(item => item.id !== record.id));
    render();
    toast("Record deleted");
  });
  td.append(button);
  return td;
}

function renderTable(id, key, columns, query = "", searchable = false) {
  const tbody = document.getElementById(id);
  tbody.replaceChildren();
  let records = read(key);

  if (query) {
    const q = query.toLowerCase();
    records = records.filter(record =>
      columns.some(column =>
        String(record[column[0]] ?? "").toLowerCase().includes(q)
      )
    );
  }

  if (!records.length) {
    const tr = document.createElement("tr");
    const td = cell(searchable && query ? "No matching records." : "No records yet.");
    td.colSpan = columns.length + 1;
    td.className = "empty";
    tr.append(td);
    tbody.append(tr);
    return;
  }

  records.forEach(record => {
    const tr = document.createElement("tr");
    columns.forEach(([field]) => tr.append(cell(record[field])));
    tr.append(actionCell(key, record, renderAll));
    tbody.append(tr);
  });
}

function fillSelect(id, key, labelField) {
  const select = document.getElementById(id);
  const oldValue = select.value;
  select.replaceChildren();
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = `Select ${key.slice(0, -1)}`;
  select.append(placeholder);

  read(key).forEach(record => {
    const option = document.createElement("option");
    option.value = record.id;
    option.textContent = `${record.id} — ${record[labelField] || record.name || ""}`;
    select.append(option);
  });

  if ([...select.options].some(option => option.value === oldValue)) {
    select.value = oldValue;
  }
}

function renderAll() {
  renderTable("student-table", "students",
    [["id"], ["name"], ["department"], ["email"]],
    document.getElementById("student-search").value, true);

  renderTable("faculty-table", "faculty",
    [["id"], ["name"], ["department"], ["email"]]);

  renderTable("course-table", "courses",
    [["id"], ["name"], ["department"]]);

  renderTable("attendance-table", "attendance",
    [["studentId"], ["courseId"], ["date"], ["status"]]);

  renderTable("exam-table", "exams",
    [["id"], ["courseId"], ["date"], ["marks"]]);

  document.getElementById("student-count").textContent = read("students").length;
  document.getElementById("faculty-count").textContent = read("faculty").length;
  document.getElementById("course-count").textContent = read("courses").length;
  document.getElementById("attendance-count").textContent = read("attendance").length;
  document.getElementById("student-total").textContent =
    `${read("students").length} student(s)`;

  const recent = document.getElementById("recent-students");
  recent.replaceChildren();
  read("students").slice(-5).reverse().forEach(student => {
    const tr = document.createElement("tr");
    ["id", "name", "department", "email"].forEach(field => {
      tr.append(cell(student[field]));
    });
    recent.append(tr);
  });
  if (!recent.children.length) {
    const tr = document.createElement("tr");
    const td = cell("Add a student to see recent records here.");
    td.colSpan = 4;
    td.className = "empty";
    tr.append(td);
    recent.append(tr);
  }

  fillSelect("attendance-student", "students", "name");
  fillSelect("attendance-course", "courses", "name");
  fillSelect("exam-course", "courses", "name");
}

function connectForm(formId, key, fields, uniqueId = true) {
  document.getElementById(formId).addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    const record = Object.fromEntries(new FormData(form).entries());

    if (uniqueId && read(key).some(item =>
      item.id.toLowerCase() === String(record.id).trim().toLowerCase()
    )) {
      toast("That ID already exists. Please use a unique ID.");
      return;
    }

    if (key === "attendance" &&
        read(key).some(item =>
          item.studentId === record.studentId &&
          item.courseId === record.courseId &&
          item.date === record.date
        )) {
      toast("Attendance for this student, course, and date already exists.");
      return;
    }

    if (key === "attendance" &&
        (!read("students").some(item => item.id === record.studentId) ||
         !read("courses").some(item => item.id === record.courseId))) {
      toast("Please select an existing student and course.");
      return;
    }

    if (key === "exams" &&
        !read("courses").some(item => item.id === record.courseId)) {
      toast("Please select an existing course.");
      return;
    }

    record.id = String(record.id ?? "").trim();
    if (key === "attendance") {
      record.id = `${record.studentId}-${record.courseId}-${record.date}`;
    }

    fields.forEach(field => {
      if (typeof record[field] === "string") record[field] = record[field].trim();
    });

    save(key, [...read(key), record]);
    form.reset();
    renderAll();
    toast("Record added successfully");
  });
}

connectForm("student-form", "students", ["id", "name", "department", "email"]);
connectForm("faculty-form", "faculty", ["id", "name", "department", "email"]);
connectForm("course-form", "courses", ["id", "name", "department"]);
connectForm("attendance-form", "attendance", ["studentId", "courseId", "date", "status"], false);
connectForm("exam-form", "exams", ["id", "courseId", "date", "marks"]);

document.getElementById("student-search").addEventListener("input", renderAll);

function showSection(section) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.toggle("hidden", page.id !== section);
  });
  document.querySelectorAll(".nav-link").forEach(button => {
    button.classList.toggle("active", button.dataset.section === section);
  });
  const titles = {
    dashboard: "Dashboard",
    students: "Student Management",
    faculty: "Faculty Management",
    courses: "Course Management",
    attendance: "Attendance Management",
    exams: "Examination Management"
  };
  document.getElementById("page-title").textContent = titles[section] || "Dashboard";
}

document.querySelectorAll("[data-section]").forEach(button => {
  button.addEventListener("click", () => showSection(button.dataset.section));
});
document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => showSection(button.dataset.go));
});

renderAll();
showSection("dashboard");