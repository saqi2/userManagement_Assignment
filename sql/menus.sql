INSERT INTO
  menus (
    "title",
    "generalPath",
    "showPriority",
    "parentId",
    "createdAt"
  )
VALUES
  ('user management', null, 1, null, NOW()),
  ('authentication', '/auth', 1, 1, NOW()),
  ('role', '/role', 2, 1, NOW()),
  ('user role', '/user-role', 1, 3, NOW()),
  ('menu', '/menu', 3, 1, NOW()),
  ('action', '/action', 4, 1, NOW())
