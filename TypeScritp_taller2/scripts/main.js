import { dataCourses } from './dataCourses.js';
import { dataAlumno } from './dataAlumno.js';
var coursesTbody = document.getElementById('courses');
var info_alumnoTbody = document.getElementById('info_alumn');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
renderCoursesInTable(dataCourses);
renderInfoAlumnInTable(dataAlumno);
applyFilterByCredit();
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderInfoAlumnInTable(info) {
    console.log('Desplegando informacion de los alumnos');
    info.forEach(function (informacion) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + informacion.informacion + "</td>\n                           <td>" + informacion.respuesta + "</td>";
        info_alumnoTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredit() {
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(courses) {
    var filtrado = courses.filter(function (c) { return dentro_filtro(c.credits); });
    return filtrado;
}
function dentro_filtro(numero) {
    return 1 < numero && numero <= 4;
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
