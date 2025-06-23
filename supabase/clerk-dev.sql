-- Insert roles
INSERT INTO roles (id, key) VALUES 
('role_2q1uWIqDYgB0NFeL6XgdUxKHz2E', 'org:accountant'),
('role_2ZtehrnKUFF0noAuOnRw3mRVlRx', 'org:admin'),
('role_2ZtehsxlNYeiL9ZZGn99NJr90gT', 'org:employee'),
('role_2q1ui7j0dLUS72yyS4OMlbDourF', 'org:manager'),
('role_2q1Htfme3QXm6byO6w04A7QTnYd', 'org:owner');

-- Insert permissions
INSERT INTO permissions (id, key) VALUES 
('perm_2q1tTSsyRo33HUFO0KjIM9ZDl3I', 'org:expenses:write'),
('perm_2q1t11y1jOJsX5eBJhmu5z2W7DL', 'org:expenses:read'),
('perm_2q7cRgBNV779Y4KY9GOjow0sw2h', 'org:policies:delete'),
('perm_2q7cIFdoApceN3ajq0fSLmklKUy', 'org:policies:read'),
('perm_2q7cMLlcVL5hsNTNrCQmutkvJ8T', 'org:policies:write');

-- Insert role-permission relationships
INSERT INTO roles_to_permissions (role_id, permission_id) VALUES 
-- Accountant permissions
('role_2q1uWIqDYgB0NFeL6XgdUxKHz2E', 'perm_2q1tTSsyRo33HUFO0KjIM9ZDl3I'),
('role_2q1uWIqDYgB0NFeL6XgdUxKHz2E', 'perm_2q1t11y1jOJsX5eBJhmu5z2W7DL'),

-- Admin permissions
('role_2ZtehrnKUFF0noAuOnRw3mRVlRx', 'perm_2q1tTSsyRo33HUFO0KjIM9ZDl3I'),
('role_2ZtehrnKUFF0noAuOnRw3mRVlRx', 'perm_2q1t11y1jOJsX5eBJhmu5z2W7DL'),
('role_2ZtehrnKUFF0noAuOnRw3mRVlRx', 'perm_2q7cRgBNV779Y4KY9GOjow0sw2h'),
('role_2ZtehrnKUFF0noAuOnRw3mRVlRx', 'perm_2q7cIFdoApceN3ajq0fSLmklKUy'),
('role_2ZtehrnKUFF0noAuOnRw3mRVlRx', 'perm_2q7cMLlcVL5hsNTNrCQmutkvJ8T'),

-- Employee permissions
('role_2ZtehsxlNYeiL9ZZGn99NJr90gT', 'perm_2q1tTSsyRo33HUFO0KjIM9ZDl3I'),
('role_2ZtehsxlNYeiL9ZZGn99NJr90gT', 'perm_2q1t11y1jOJsX5eBJhmu5z2W7DL'),

-- Manager permissions
('role_2q1ui7j0dLUS72yyS4OMlbDourF', 'perm_2q7cIFdoApceN3ajq0fSLmklKUy'),
('role_2q1ui7j0dLUS72yyS4OMlbDourF', 'perm_2q1tTSsyRo33HUFO0KjIM9ZDl3I'),
('role_2q1ui7j0dLUS72yyS4OMlbDourF', 'perm_2q1t11y1jOJsX5eBJhmu5z2W7DL'),
('role_2q1ui7j0dLUS72yyS4OMlbDourF', 'perm_2q7cMLlcVL5hsNTNrCQmutkvJ8T'),
('role_2q1ui7j0dLUS72yyS4OMlbDourF', 'perm_2q7cRgBNV779Y4KY9GOjow0sw2h'),

-- Owner permissions
('role_2q1Htfme3QXm6byO6w04A7QTnYd', 'perm_2q1tTSsyRo33HUFO0KjIM9ZDl3I'),
('role_2q1Htfme3QXm6byO6w04A7QTnYd', 'perm_2q1t11y1jOJsX5eBJhmu5z2W7DL'),
('role_2q1Htfme3QXm6byO6w04A7QTnYd', 'perm_2q7cRgBNV779Y4KY9GOjow0sw2h'),
('role_2q1Htfme3QXm6byO6w04A7QTnYd', 'perm_2q7cIFdoApceN3ajq0fSLmklKUy'),
('role_2q1Htfme3QXm6byO6w04A7QTnYd', 'perm_2q7cMLlcVL5hsNTNrCQmutkvJ8T');