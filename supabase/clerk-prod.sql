-- Insert roles
INSERT INTO roles (id, key) VALUES 
('role_2xXiIIoapZVbVVoCrTwENBLZjkc', 'org:accountant'),
('role_2xXiaeE4g0cpmCyVUiGUSfHOED5', 'org:admin'),
('role_2vxSaeLjt7DeCP4VyTLCO8sQwOQ', 'org:employee'),
('role_2xXiAhtXxw8uVIwAUKZKFZiLAWJ', 'org:manager'),
('role_2vxSagTNtJFCkW9g5JvQEws8gHv', 'org:owner');

-- Insert permissions
INSERT INTO permissions (id, key) VALUES 
('perm_2xXhYACbyZajo9nPzxPfDmEupWi', 'org:expenses:write'),
('perm_2xXhjiNoKGo3FRbXdYJT9FwCJM2', 'org:expenses:read'),
('perm_2xXhhWAIBJ121bOgw8NqPiu2z1x', 'org:policies:delete'),
('perm_2xXhnZRtzV7jJl3jveAAQotYwL1', 'org:policies:read'),
('perm_2xXhcz07Xhlk7BPlkGUn1dwGHhM', 'org:policies:write');

-- Insert role-permission relationships
INSERT INTO roles_to_permissions (role_id, permission_id) VALUES 
('role_2xXiIIoapZVbVVoCrTwENBLZjkc', 'perm_2xXhYACbyZajo9nPzxPfDmEupWi'),
('role_2xXiIIoapZVbVVoCrTwENBLZjkc', 'perm_2xXhjiNoKGo3FRbXdYJT9FwCJM2'),

-- Admin permissions
('role_2xXiaeE4g0cpmCyVUiGUSfHOED5', 'perm_2xXhYACbyZajo9nPzxPfDmEupWi'),
('role_2xXiaeE4g0cpmCyVUiGUSfHOED5', 'perm_2xXhjiNoKGo3FRbXdYJT9FwCJM2'),
('role_2xXiaeE4g0cpmCyVUiGUSfHOED5', 'perm_2xXhhWAIBJ121bOgw8NqPiu2z1x'),
('role_2xXiaeE4g0cpmCyVUiGUSfHOED5', 'perm_2xXhnZRtzV7jJl3jveAAQotYwL1'),
('role_2xXiaeE4g0cpmCyVUiGUSfHOED5', 'perm_2xXhcz07Xhlk7BPlkGUn1dwGHhM'),

-- Employee permissions
('role_2vxSaeLjt7DeCP4VyTLCO8sQwOQ', 'perm_2xXhYACbyZajo9nPzxPfDmEupWi'),
('role_2vxSaeLjt7DeCP4VyTLCO8sQwOQ', 'perm_2xXhjiNoKGo3FRbXdYJT9FwCJM2'),

-- Manager permissions
('role_2xXiAhtXxw8uVIwAUKZKFZiLAWJ', 'perm_2xXhnZRtzV7jJl3jveAAQotYwL1'),
('role_2xXiAhtXxw8uVIwAUKZKFZiLAWJ', 'perm_2xXhYACbyZajo9nPzxPfDmEupWi'),
('role_2xXiAhtXxw8uVIwAUKZKFZiLAWJ', 'perm_2xXhjiNoKGo3FRbXdYJT9FwCJM2'),
('role_2xXiAhtXxw8uVIwAUKZKFZiLAWJ', 'perm_2xXhcz07Xhlk7BPlkGUn1dwGHhM'),
('role_2xXiAhtXxw8uVIwAUKZKFZiLAWJ', 'perm_2xXhhWAIBJ121bOgw8NqPiu2z1x'),

-- Owner permissions
('role_2vxSagTNtJFCkW9g5JvQEws8gHv', 'perm_2xXhYACbyZajo9nPzxPfDmEupWi'),
('role_2vxSagTNtJFCkW9g5JvQEws8gHv', 'perm_2xXhjiNoKGo3FRbXdYJT9FwCJM2'),
('role_2vxSagTNtJFCkW9g5JvQEws8gHv', 'perm_2xXhhWAIBJ121bOgw8NqPiu2z1x'),
('role_2vxSagTNtJFCkW9g5JvQEws8gHv', 'perm_2xXhnZRtzV7jJl3jveAAQotYwL1'),
('role_2vxSagTNtJFCkW9g5JvQEws8gHv', 'perm_2xXhcz07Xhlk7BPlkGUn1dwGHhM');