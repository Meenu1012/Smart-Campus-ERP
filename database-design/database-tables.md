# Smart Campus ERP - Database Design

## ZSC_STUDENT
- STUDENT_ID: Student identifier (primary key)
- STUDENT_NAME: Student name
- DEPARTMENT: Department
- COURSE_ID: Course identifier
- EMAIL: Email address

## ZSC_FACULTY
- FACULTY_ID: Faculty identifier (primary key)
- FACULTY_NAME: Faculty name
- DEPARTMENT: Department
- EMAIL: Email address

## ZSC_COURSE
- COURSE_ID: Course identifier (primary key)
- COURSE_NAME: Course name
- DEPARTMENT: Department
- FACULTY_ID: Faculty identifier

## ZSC_ATTEND
- ATTENDANCE_ID: Attendance identifier (primary key)
- STUDENT_ID: Student identifier
- COURSE_ID: Course identifier
- ATTENDANCE_DATE: Attendance date
- STATUS: Present or absent

## ZSC_EXAM
- EXAM_ID: Examination identifier (primary key)
- COURSE_ID: Course identifier
- EXAM_DATE: Examination date
- MAX_MARKS: Maximum marks

## Relationships
- A faculty member can teach multiple courses.
- A course can have multiple students.
- A student can have multiple attendance records.
- A course can have multiple examinations.

## Implementation Note
These are proposed table designs. Create and test actual SAP tables only in an authorized SAP development system.
