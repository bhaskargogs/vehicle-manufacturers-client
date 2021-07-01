import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';

export interface Headers {
  name: string;
  field: string;
  sortable: boolean;
  align: any;
}

interface HeaderProps {
  headers: Headers[];
  onSorting: any;
}

const Header: React.FC<HeaderProps> = ({ headers, onSorting }) => {
  const [sortingField, setSortingField] = useState('');
  const [sortingOrder, setSortingOrder] = useState('asc');

  const onSortingChange = (field: any) => {
    const order =
      field === sortingField && sortingOrder === 'asc' ? 'desc' : 'asc';

    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };
  return (
    <TableHead>
      <TableRow>
        {headers.map(({ name, field, sortable, align }) => (
          <TableCell
            style={{ cursor: 'pointer' }}
            key={name}
            onClick={() => (sortable ? onSortingChange(field) : null)}
            align={align}
          >
            {name}
            {sortingField && sortingField === field && (
              <IconButton aria-label='expand row' size='small'>
                {sortingOrder === 'asc' ? <ArrowDropUp /> : <ArrowDropDown />}
              </IconButton>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default Header;
