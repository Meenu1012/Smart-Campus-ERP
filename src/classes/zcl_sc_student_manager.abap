
CLASS zcl_sc_student_manager DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.

    TYPES: BEGIN OF ty_student,
             student_id   TYPE c LENGTH 10,
             student_name TYPE c LENGTH 40,
             department   TYPE c LENGTH 30,
             course_id    TYPE c LENGTH 10,
           END OF ty_student.

    TYPES tt_student TYPE STANDARD TABLE OF ty_student
      WITH DEFAULT KEY.

    METHODS add_student
      IMPORTING
        is_student TYPE ty_student.

    METHODS search_student
      IMPORTING
        iv_student_id TYPE c LENGTH 10
      RETURNING
        VALUE(rs_student) TYPE ty_student.

    METHODS display_student
      IMPORTING
        is_student TYPE ty_student.

    METHODS display_all_students.

  PRIVATE SECTION.
    DATA mt_students TYPE tt_student.

ENDCLASS.


CLASS zcl_sc_student_manager IMPLEMENTATION.

  METHOD add_student.
    APPEND is_student TO mt_students.
  ENDMETHOD.


  METHOD search_student.
    READ TABLE mt_students INTO rs_student
      WITH KEY student_id = iv_student_id.
  ENDMETHOD.


  METHOD display_student.
    WRITE: / 'STUDENT DETAILS'.
    WRITE: / 'ID:', is_student-student_id.
    WRITE: / 'Name:', is_student-student_name.
    WRITE: / 'Department:', is_student-department.
    WRITE: / 'Course:', is_student-course_id.
  ENDMETHOD.


  METHOD display_all_students.
    DATA ls_student TYPE ty_student.

    WRITE: / 'SMART CAMPUS ERP'.
    WRITE: / 'ALL STUDENT RECORDS'.
    ULINE.

    LOOP AT mt_students INTO ls_student.
      WRITE: / ls_student-student_id,
               ls_student-student_name,
               ls_student-department,
               ls_student-course_id.
    ENDLOOP.
  ENDMETHOD.

ENDCLASS.