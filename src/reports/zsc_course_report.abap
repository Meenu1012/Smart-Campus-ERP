
REPORT zsc_course_report.

TYPES: BEGIN OF ty_course,
         course_id    TYPE c LENGTH 10,
         course_name  TYPE c LENGTH 40,
         department   TYPE c LENGTH 30,
         duration     TYPE i,
         course_level TYPE c LENGTH 20,
       END OF ty_course.

DATA: lt_courses TYPE STANDARD TABLE OF ty_course,
      ls_course  TYPE ty_course.

START-OF-SELECTION.

  ls_course-course_id = 'CSE01'.
  ls_course-course_name = 'Computer Science'.
  ls_course-department = 'CSE'.
  ls_course-duration = 4.
  ls_course-course_level = 'Undergraduate'.
  APPEND ls_course TO lt_courses.

  CLEAR ls_course.
  ls_course-course_id = 'ECE01'.
  ls_course-course_name = 'Electronics'.
  ls_course-department = 'ECE'.
  ls_course-duration = 4.
  ls_course-course_level = 'Undergraduate'.
  APPEND ls_course TO lt_courses.

  WRITE: / 'SMART CAMPUS ERP'.
  WRITE: / 'COURSE INFORMATION REPORT'.
  ULINE.

  WRITE: / 'COURSE ID',
           15 'COURSE NAME',
           40 'DEPARTMENT',
           55 'DURATION (YEARS)',
           75 'LEVEL'.
  ULINE.

  LOOP AT lt_courses INTO ls_course.
    WRITE: / ls_course-course_id,
             15 ls_course-course_name,
             40 ls_course-department,
             55 ls_course-duration,
             75 ls_course-course_level.
  ENDLOOP.