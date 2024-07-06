import React, { useState } from 'react';
import { Checkbox, List, ListItemText, Collapse, ListItemButton, ListItemIcon} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Department } from '../types/Department';

const departmentData: Department[] = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"]
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"]
  }
];

const DepartmentList = () => {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const handleToggle = (department: string) => {
    setOpen(prevOpen => ({
      ...prevOpen,
      [department]: !prevOpen[department]
    }));
  };

  const handleSelect = (department: string, subDepartment?: string) => {
    if (subDepartment) {
      setSelected(prevSelected => ({
        ...prevSelected,
        [subDepartment]: !prevSelected[subDepartment]
      }));

      const allSelected = departmentData
        .find(d => d.department === department)
        ?.sub_departments.every(sub => selected[sub]);
      if (allSelected) {
        setSelected(prevSelected => ({
          ...prevSelected,
          [department]: true
        }));
      } else {
        setSelected(prevSelected => ({
          ...prevSelected,
          [department]: false
        }));
      }
    } else {
      const subDepartments = departmentData.find(d => d.department === department)?.sub_departments || [];
      const isSelected = !selected[department];

      const newSelected = subDepartments.reduce((acc, sub) => {
        acc[sub] = isSelected;
        return acc;
      }, {} as Record<string, boolean>);

      setSelected(prevSelected => ({
        ...prevSelected,
        ...newSelected,
        [department]: isSelected
      }));
    }
  };

  return (
    <List>
      {departmentData.map((dept) => (
        <React.Fragment key={dept.department}>
          <ListItemButton onClick={() => handleToggle(dept.department)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selected[dept.department] || false}
                onChange={() => handleSelect(dept.department)}
              />
            </ListItemIcon>
            <ListItemText primary={dept.department} />
            {open[dept.department] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open[dept.department]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {dept.sub_departments.map((subDept) => (
                <ListItemButton
                  key={subDept}
                  onClick={() => handleSelect(dept.department, subDept)}
                  style={{ paddingLeft: 32 }}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selected[subDept] || false}
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDept} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentList;
