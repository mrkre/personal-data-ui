type SubmitError = {
  message: string;
  errors?: Record<string, string>[];
};

export default function FlashError({ error }: { error: SubmitError }) {
  if (!error) return <></>;

  return (
    <div className="text-danger mt-3 mb-0">
      {error.message}
      {error.errors && (
        <p className="mb-0">
          {error.errors.map((err, i) => (
            <span key={i}>{err.msg}</span>
          ))}
        </p>
      )}
    </div>
  );
}
