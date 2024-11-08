export const roles = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    STAFF: 'staff'
  };
  
  export const permissions = {
    VIEW_INVENTORY: 'view_inventory',
    MODIFY_INVENTORY: 'modify_inventory',
    DELETE_INVENTORY: 'delete_inventory'
  };
  
  export const rolePermissions = {
    [roles.ADMIN]: [permissions.VIEW_INVENTORY, permissions.MODIFY_INVENTORY, permissions.DELETE_INVENTORY],
    [roles.MANAGER]: [permissions.VIEW_INVENTORY, permissions.MODIFY_INVENTORY],
    [roles.STAFF]: [permissions.VIEW_INVENTORY]
  };
  