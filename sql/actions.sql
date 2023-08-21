INSERT INTO
  actions (
    "completePath",
    "minimumKYCLevel",
    "menuId",
    "actionTypeId",
    "method",
    "createdAt",
    "isParam"
  )
VALUES
  ('/auth/register', 1, 2, 2, 'POST', NOW(),false),
  ('/auth/login', 1, 2, 2, 'POST', NOW(),false),
  ('/auth/whoami', 1, 2, 3, 'GET', NOW(),false),
  ('/auth/forgetPassword', 1, 2, 2, 'POST', NOW(),false),
  ('/auth/changePassword', 1, 2, 1, 'PATCH', NOW(),false),
  ('/auth/google', 1, 2, 3, 'GET', NOW(),false),
  ('/auth/google/redirect', 1, 2, 3, 'GET', NOW(),false),
  ('/role', 1, 3, 2, 'POST', NOW(),false),
  ('/role', 1, 3, 3, 'GET', NOW(),false),
  ('^\/role\/\d+$', 1, 3, 1, 'PATCH', NOW(), true),
  ('^\/role\/\d+$', 1, 3, 4, 'DELETE', NOW(), true),
  ('^\/role\/\d+$', 1, 3, 3, 'GET', NOW(), true),
  ('/user-role', 1, 4, 2, 'POST', NOW(),false),
  ('/user-role', 1, 4, 3, 'GET', NOW(),false),
  ('^\/user-role\/\d+$', 1, 4, 3, 'GET', NOW(), true),
  ('^\/user-role\/\d+$', 1, 4, 4, 'DELETE', NOW(), true),
  ('/menu', 1, 5, 2, 'POST', NOW(),false),
  ('/menu', 1, 5, 3, 'GET', NOW(),false),
  ('^\/menu\/\d+$', 1, 5, 3, 'GET', NOW(), true)
