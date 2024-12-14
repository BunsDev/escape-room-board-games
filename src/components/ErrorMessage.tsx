interface ErrorMessageProps {
    message: string;
  }
  
  export const ErrorMessage = ({ message }: ErrorMessageProps) => (
    <div className="text-center p-8">
      <p className="text-red-400">{message}</p>
    </div>
  );