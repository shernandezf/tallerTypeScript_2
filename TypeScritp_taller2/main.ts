import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';
import { info_alumno } from './info_alumno.js';
import { dataAlumno} from './dataAlumno.js';
let coursesTbody: HTMLElement = document.getElementById('courses')!;
let info_alumnoTbody: HTMLElement = document.getElementById('info_alumn')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();

renderCoursesInTable(dataCourses);
renderInfoAlumnInTable(dataAlumno);
applyFilterByCredit();
totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 
function renderInfoAlumnInTable(info: info_alumno[]): void {
  console.log('Desplegando informacion de los alumnos');
  info.forEach((informacion) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${informacion.informacion}</td>
                           <td>${informacion.respuesta}</td>`;
    info_alumnoTbody.appendChild(trElement);
  });
}
 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredit() { 
  
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCredits(dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseByCredits( courses: Course[]) {
   
  let filtrado :Course[]= courses.filter( c => dentro_filtro(c.credits));
  return filtrado;
}
function dentro_filtro(numero: number) {
  return  1<numero && numero<=4
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}