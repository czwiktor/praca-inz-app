import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';

export default function SimpleBackdrop() {
    return (
          <CircularProgress className="skeleton-circle" color="success" />
    );
}