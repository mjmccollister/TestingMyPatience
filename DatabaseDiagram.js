//// -- LEVEL 1
//// -- Tables and References

// Creating tables
Table users as U {
  user_id int [pk, increment] // auto-increment
  username string
  first_name string
  last_name string
  email string
  password string
  created_date datetime
  updated_date datetime
}


Table Companies {
  company_id int [pk, increment]
  company_name string
  company_descr string
  created_date datetime
  created_by string
  updated_date datetime
  updated_by string
}

Table Company_User_xref {
  company_user_xref_id int [pk, increment]
  company_id int
  user_id int
  created_date datetime
  created_by string
  updated_date datetime
  updated_by string
}


Ref: "users"."user_id" < "Company_User_xref"."user_id"

Ref: "Companies"."company_id" < "Company_User_xref"."company_id"

Ref: "users"."user_id" < "Companies"."created_by"

Ref: "users"."user_id" < "Companies"."updated_by"

Table Projects {
  project_id int [pk, increment]
  project_name string
  project_descr string
  created_date datetime
  created_by string
  updated_date datetime
  updated_by string
}

Table Project_Page_Object_xref {
  project_page_object_xref_id int
  project_id int
  page_object_id int
}

Table Company_Project_User_xref {
  company_project_user_xref int [pk, increment]
  company_id int
  user_id int
  project_id int
  created_by string
  updated_date datetime
  updated_by string
}


Table TestSuites {
  test_suite_id int
  test_suite_name string
  test_suite_descr string
}

Table Test_suites_test_cases_xref {
  test_suites_test_cases_xref_id int
  test_suite_id int
  test_case_id int
}

Table Projects_TestSuites_xref{
  projects_testsuites_xref_id int
  project_id int
  test_suite_id int
}

Table TestCases {
  test_case_id int
  test_case_name string
  test_case_descr string
  test_feature string
}

Table Test_Cases_Test_Steps_xref {
  test_case_test_step_xref_id int
  test_case_id int
  test_step_id int
}

Table TestSteps {
  test_step_id int
  test_step_name string
  test_step_descr string
  test_step_number int
  test_step_function string [note: "functions are actions to perform or validation to happen (e.g. click, navigate to, etc...)"]
  page_object_method_id int
}

Table PageObject {
  page_object_id int
  page_object_name string
  page_object_descr string
}

Table PageObjectMethods {
  page_object_method_id int
  page_object_id int
  page_object_method_action string [note: "action is find, click etc..."]
  page_object_method_locator string [note: "by text, href, xref, etc.."]
}


Ref: "Companies"."company_id" < "Company_Project_User_xref"."company_id"

Ref: "Projects"."project_id" < "Company_Project_User_xref"."project_id"

Ref: "users"."user_id" < "Company_Project_User_xref"."user_id"


Ref: "Projects"."project_id" < "Projects_TestSuites_xref"."project_id"

Ref: "TestSuites"."test_suite_id" < "Projects_TestSuites_xref"."test_suite_id"

Ref: "TestCases"."test_case_id" < "Test_Cases_Test_Steps_xref"."test_case_id"

Ref: "TestSteps"."test_step_id" < "Test_Cases_Test_Steps_xref"."test_step_id"

Ref: "TestSuites"."test_suite_id" < "Test_suites_test_cases_xref"."test_suite_id"

Ref: "TestCases"."test_case_id" < "Test_suites_test_cases_xref"."test_case_id"

Ref: "Projects"."project_id" < "Project_Page_Object_xref"."project_id"

Ref: "PageObject"."page_object_id" < "Project_Page_Object_xref"."page_object_id"

Ref: "PageObject"."page_object_id" < "PageObjectMethods"."page_object_id"

Ref: "PageObjectMethods"."page_object_method_id" - "TestSteps"."page_object_method_id"
