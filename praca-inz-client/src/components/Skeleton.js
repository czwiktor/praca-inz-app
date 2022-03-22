import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';

export default function SimpleBackdrop() {
    return (
      <div>
          <CircularProgress className="skeleton-circle" color="success" />
      </div>
    );
}