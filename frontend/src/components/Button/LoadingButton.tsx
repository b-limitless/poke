import { LoadingButton } from '@mui/lab';
import React from 'react';
import { styles, variantType } from './style';

interface CustomLoadingButtonProps {
  onClick: () => void;
  loading: boolean;
  loadingPosition?: 'start' | 'end';
  variant?: 'text' | 'outlined' | 'contained';
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  disabled?: boolean;
  type: variantType;
}

const CustomLoadingButton: React.FC<CustomLoadingButtonProps> = ({
  onClick,
  loading,
  loadingPosition = 'start',
  variant = 'contained',
  children,
  color = 'primary',
  disabled = false,
  type
}) => {
  return (
    <LoadingButton
      onClick={onClick}
      loading={loading}
      loadingPosition={loadingPosition}
      variant={variant}
      color={color}
      disabled={disabled || loading}
      sx={styles(type)}
    >
      {children}
    </LoadingButton>
  );
};

export default CustomLoadingButton;
