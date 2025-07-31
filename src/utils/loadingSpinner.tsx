
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = '#9457f6',
  className = ''
}) => {
  const sizeMap = {
    small: '1rem',
    medium: '2rem',
    large: '3rem'
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className={`loading-spinner ${className}`}
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
          borderColor: color
        }}
        aria-label="Loading"
        role="status"
      >
        <div
          className="spinner-inner"
          style={{ borderColor: `${color} transparent transparent transparent` }}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;