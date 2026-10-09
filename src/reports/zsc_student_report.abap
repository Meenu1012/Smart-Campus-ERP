
REPORT zsc_student_report.

TYPES: BEGIN OF ty_student,
         student_id   TYPE c LENGTH 10,
         student_name TYPE c LENGTH 40,
         department   TYPE c LENGTH 30,
         course_id    TYPE c LENGTH 10,
         semester     TYPE i,
         percentage   TYPE p LENGTH 5 DECIMALS 2,
       END OF ty_student.

DATA: lt_students TYPE STANDARD TABLE OF ty_student,
      ls_student  TYPE ty_student.

START-OF-SELECTION.

  ls_student-student_id = 'STU001'.
  ls_student-student_name = 'Ananya Rao'.
  ls_student-department = 'CSE'.
  ls_student-course_id = 'CSE01'.
  ls_student-semester = 5.
  ls_student-percentage = '85.50'.
  APPEND ls_student TO lt_students.

  CLEAR ls_student.
  ls_student-student_id = 'STU002'.
  ls_student-student_name = 'Maina'.
  ls_student-department = 'CSE'.
  ls_student-course_id = 'CSE1'.
  ls_student-semester = 5.
  ls_student-percentage = '85.75'.
  APPEND ls_student TO lt_students.

  WRITE: / 'SMART CAMPUS ERP'.
  WRITE: / 'STUDENT ACADEMIC REPORT'.
  ULINE.

  WRITE: / 'STUDENT ID',
           15 'STUDENT NAME',
           40 'DEPARTMENT',
           55 'COURSE',
           68 'SEMESTER',
           80 'PERCENTAGE'.
  ULINE.

  LOOP AT lt_students INTO ls_student.
    WRITE: / ls_student-student_id,
             15 ls_student-student_name,
             40 ls_student-department,
             55 ls_student-course_id,
             68 ls_student-semester,
             80 ls_student-percentage.
  ENDLOOP.