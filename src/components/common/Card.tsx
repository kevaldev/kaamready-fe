import React, { ReactNode } from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  footer,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
  onClick,
  hoverable = false,
}) => {
  const cardClasses = `
    bg-white dark:bg-dark-800 rounded-lg shadow-sm overflow-hidden
    ${hoverable ? "transition-shadow hover:shadow-md" : ""}
    ${onClick ? "cursor-pointer" : ""}
    ${className}
  `;

  return (
    <div className={cardClasses} onClick={onClick}>
      {(title || subtitle) && (
        <div
          className={`px-6 py-4 border-b border-gray-100 dark:border-gray-700 ${headerClassName}`}
        >
          {title && (
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className={`px-6 py-4 ${bodyClassName}`}>{children}</div>
      {footer && (
        <div
          className={`px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 ${footerClassName}`}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
