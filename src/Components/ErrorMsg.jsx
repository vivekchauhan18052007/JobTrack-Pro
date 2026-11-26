function ErrorMsg({ message }) {
  if (!message) return null;

  return (
    <>
      <div className="text-red-700 ">{message}</div>
    </>
  );
}
export default ErrorMsg;
